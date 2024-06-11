/**
 * stringToColor - Convert a string to a hex colour code
 * 
 * @param {string} string 
 * @returns final color code
 */
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  // Calculate hash value from the input string
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  // Generate the RGB values by extracting bytes from the hash
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff; // Extract the least significant byte
    color += `00${value.toString(16)}`.slice(-2); // Convert to hexadecimal and pad with leading zeros if necessary
  }
  /* eslint-enable no-bitwise */

  return color;
}

/**
 * Function to be exported
 * 
 * stringAvatar - Convert string to object containing styling and initials
 * 
 * @param {string} name - String to convert to hex
 * @returns 
 */
export function stringAvatar(name) {
  // Get the initials from the first two words and set them as children
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}
