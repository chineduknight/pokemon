// Convert a string into an array index based on its characters
export const hashStringToIndex = (str, arrayLength) => {
  let hash = 0;

  // Loop through each character in the string
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i); // Convert the current character to its ASCII value
    hash = (hash + char) % arrayLength; // Add the ASCII value to the hash and use modulo to ensure it's within array bounds
  }
  return hash; // Return the final hash value, which is the index in the array
};

export const extractNumberFromUrl = (url: string) => {
  // This regex pattern looks for one or more digits (\d+) at the end of the string ($)
  const regexPattern = /(\d+)\/?$/;
  const match = url.match(regexPattern);

  // match is an array where the first element is the full match, and the second is the captured group
  // If a match is found, convert it to a number and return, otherwise return null
  return match ? Number(match[1]) : null;
};
