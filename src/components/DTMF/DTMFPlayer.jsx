import React, { useEffect } from "react";

const DTMFPlayer = ({ message, toneDuration = 300, pauseDuration = 100 }) => {
  const dtmfFrequencies = {
    1: [697, 1209],
    2: [697, 1336],
    3: [697, 1477],
    4: [770, 1209],
    5: [770, 1336],
    6: [770, 1477],
    7: [852, 1209],
    8: [852, 1336],
    9: [852, 1477],
    "*": [941, 1209],
    0: [941, 1336],
    "#": [941, 1477],
    A: [697, 1633],
    B: [770, 1633],
    C: [852, 1633],
    D: [941, 1633],
  };

  useEffect(() => {
    if (!message) return;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    function playTone(lowFreq, highFreq, duration) {
      const oscillatorLow = audioContext.createOscillator();
      const oscillatorHigh = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillatorLow.frequency.value = lowFreq;
      oscillatorHigh.frequency.value = highFreq;

      oscillatorLow.connect(gainNode);
      oscillatorHigh.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillatorLow.start();
      oscillatorHigh.start();

      setTimeout(() => {
        oscillatorLow.stop();
        oscillatorHigh.stop();
      }, duration);
    }

    let currentTime = 0;

    for (const char of message) {
      if (dtmfFrequencies[char]) {
        const [lowFreq, highFreq] = dtmfFrequencies[char];
        const duration = (char === "#" || char === "*") ? toneDuration * 4 : toneDuration;
        setTimeout(() => playTone(lowFreq, highFreq, duration), currentTime);
        currentTime += duration + pauseDuration;
      }
    }

    return () => {
      audioContext.close();
    };
  }, [message, toneDuration, pauseDuration]);

  return null; // No UI rendering
};

export default DTMFPlayer;
