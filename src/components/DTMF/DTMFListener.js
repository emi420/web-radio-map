import { useState, useEffect, useRef } from 'react';
import Goertzel from 'goertzeljs';
import DTMFDecoder from './DTMFDecoder';

const DTMFListener = (props) => {

    const [audio, setAudio] = useState(null);
    const listen = useRef(false);

    useEffect(() => {
      if (props.listen !== listen.current) {
        listen.current = props.listen;
        toggleMicrophone();
      }
    });

    const getMicrophone = async () => {
        const audio = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false
        });

        const audioContext = window.AudioContext || window.webkitAudioContext
        const context = new audioContext()
        const volume = context.createGain()
        const audioInput = context.createMediaStreamSource(audio)
        audioInput.connect(volume)
        const bufferSize = 512
        const recorder = context.createScriptProcessor(bufferSize, 1, 1);

        props.onMicReady && props.onMicReady();

        var dtmf = new DTMFDecoder({
          sampleRate: context.sampleRate,
          repeatMin: 6,
          downsampleRate: 1,
          energyThreshold: 0.005,
          filter: function(e){
            return !Goertzel.Utilities.doublePeakFilter(e.energies['high'], e.energies['low'], 1.4);
          }
        })

        dtmf.on("decode", (value) => {
            if (value !== null) {
              props.onDigit(value);
            }
        });

        recorder.onaudioprocess = function(e){
            var buffer = e.inputBuffer.getChannelData(0)
            dtmf.processBuffer(buffer)
        }
        volume.connect (recorder)
        recorder.connect (context.destination) 

        setAudio(audio);
    }

    const stopMicrophone = () => {
        audio.getTracks().forEach(track => track.stop());
        setAudio(null);
    }

    const toggleMicrophone = () => {
        if (audio) {
            stopMicrophone();
        } else {
            getMicrophone();
        }
    }
    return ('');

}

export default DTMFListener;
