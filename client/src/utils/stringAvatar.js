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
 * Calculates the relative luminance of an RGB color.
 *
 * @param {number} r - Red component (0-255)
 * @param {number} g - Green component (0-255)
 * @param {number} b - Blue component (0-255)
 * @returns {number} - The relative luminance (0.0-1.0)
 */
function getLuminance(r, g, b) {
  const normalize = (value) => {
    value /= 255;
    return value <= 0.03928
      ? value / 12.92
      : Math.pow((value + 0.055) / 1.055, 2.4);
  };

  const R = normalize(r);
  const G = normalize(g);
  const B = normalize(b);

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/**
 * Calculates the contrast ratio between two luminances.
 *
 * @param {number} lum1 - Luminance of the first color
 * @param {number} lum2 - Luminance of the second color
 * @returns {number} - The contrast ratio
 */
function getContrastRatio(lum1, lum2) {
  return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
}

/**
 * Parses a hex color string and returns an RGB object.
 *
 * @param {string} hex - The hex color string
 * @returns {object} - An object with r, g, b properties
 */
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

/**
 * Adjusts the color to increase contrast if necessary.
 *
 * @param {string} color - The generated color
 * @param {string} baseColor - The base color
 * @param {number} threshold - The minimum acceptable contrast ratio
 * @param {boolean} isDarkMode - The boolean indicating whether the mode is dark
 * @returns {string} - The adjusted color
 */
function adjustColorForContrast(color, baseColor, threshold, isDarkMode) {
  const colorRgb = hexToRgb(color);
  const baseColorRgb = hexToRgb(baseColor);

  const colorLuminance = getLuminance(colorRgb.r, colorRgb.g, colorRgb.b);
  const baseColorLuminance = getLuminance(
    baseColorRgb.r,
    baseColorRgb.g,
    baseColorRgb.b
  );

  let contrastRatio = getContrastRatio(colorLuminance, baseColorLuminance);

  if (contrastRatio >= threshold) {
    return color;
  }

  // Adjust the color to increase contrast
  const adjustBrightness = (value) => {
    if (isDarkMode) {
      return Math.min(255, value + 50); // Brighten for dark mode
    } else {
      return Math.max(0, value - 50); // Darken for light mode
    }
  };

  const adjustedColor = `#${adjustBrightness(colorRgb.r)
    .toString(16)
    .padStart(2, "0")}${adjustBrightness(colorRgb.g)
    .toString(16)
    .padStart(2, "0")}${adjustBrightness(colorRgb.b)
    .toString(16)
    .padStart(2, "0")}`;

  return adjustedColor;
}

/**
 * Function to be exported
 *
 * stringAvatar - Convert string to object containing styling and initials
 *
 * @param {string} name - String to convert to hex
 * @param {string} baseColor - Base color to compare for contrast
 * @param {boolean} isDarkMode - The boolean indicating whether the mode is dark
 * @returns
 */
export function stringAvatar(name, baseColor, isDarkMode) {
  const threshold = 4.5; // WCAG recommended contrast ratio for normal text
  let bgcolor = stringToColor(name);
  bgcolor = adjustColorForContrast(bgcolor, baseColor, threshold, isDarkMode);

  // Get the initials from the first two words and set them as children
  return {
    sx: {
      bgcolor,
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}
