export const hashStringToIndex = (str, arrayLength) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash + char) % arrayLength;
  }
  return hash;
};

export const extractNumberFromUrl = (url: string) => {
  // This regex pattern looks for one or more digits (\d+) at the end of the string ($)
  const regexPattern = /(\d+)\/?$/;
  const match = url.match(regexPattern);

  // match is an array where the first element is the full match, and the second is the captured group
  // If a match is found, convert it to a number and return, otherwise return null
  return match ? Number(match[1]) : null;
};
