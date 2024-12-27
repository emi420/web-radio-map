import DTMFPlayer from "./DTMFPlayer";

function addBBetweenConsecutiveDuplicates(str) {
  return str.split('').map((char, index, arr) => {
      return char === arr[index - 1] ? `B${char}` : char;
  }).join('');
}

// Function to generate a DTMF-encoded coordinate transmission message
function encodeDTMF(latitude: number, longitude: number) {
  const delimiter = "A"; // Use "A" as the delimiter (DTMF-compatible)

  // Multiply by 10^6 to remove decimals
  const latInt = Math.round(Math.abs(latitude) * 1e6);
  const lonInt = Math.round(Math.abs(longitude) * 1e6);

  // Add hemisphere prefixes
  const latPrefix = latitude < 0 ? "1" : "0";
  const lonPrefix = longitude < 0 ? "1" : "0";

  // Create message body
  const messageBody = `${latPrefix}${latInt}${delimiter}${lonPrefix}${lonInt}`;
  const message = `*${addBBetweenConsecutiveDuplicates(messageBody)}#`;
  return message;
}

const DTMFCoordEncoder = ({latitude, longitude}) => {

  return (
    <>
      {(latitude != null && longitude != null) ? 
        <DTMFPlayer
          toneDuration={200}
          pauseDuration={50}
          message={encodeDTMF(latitude, longitude)}
        /> : ''}
    </>
  );
};

export default DTMFCoordEncoder;
