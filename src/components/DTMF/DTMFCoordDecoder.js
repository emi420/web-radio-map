export default function decodeDTMF(message) {
    const startChar = "*";
    const endChar = "#";
    const delimiter = "A"; // Use "A" as the delimiter

    // Validate message format
    if (!message.startsWith(startChar) || !message.endsWith(endChar)) {
        console.log("Invalid message format.");
        return false;
    }

    // Extract the body
    let body = message.slice(1, -1); // Remove start and end characters

    // Remove extra characters
    body = body.replaceAll("B", "");

    // Split coordinates using the delimiter
    const parts = body.split(delimiter);
    if (parts.length !== 2) {
        console.log("Invalid message format.");
        return false;
    }

    const [latPart, lonPart] = parts;

    // Decode latitude
    const latPrefix = latPart[0];
    const latInt = parseInt(latPart.slice(1), 10);
    const latitude = latInt / 1e6 * (latPrefix === "1" ? -1 : 1);

    // Decode longitude
    const lonPrefix = lonPart[0];
    const lonInt = parseInt(lonPart.slice(1), 10);
    const longitude = lonInt / 1e6 * (lonPrefix === "1" ? -1 : 1);

    return { latitude, longitude };
}
