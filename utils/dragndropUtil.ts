// Function to generate a random hex color
export function randomColor() {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
}

// Function to lighten a color
export function lightenColor(hex: string, percent: number) {
  let num = parseInt(hex.slice(1), 16),
    r = (num >> 16) + Math.round((255 - (num >> 16)) * percent),
    g =
      ((num >> 8) & 0x00ff) +
      Math.round((255 - ((num >> 8) & 0x00ff)) * percent),
    b = (num & 0x0000ff) + Math.round((255 - (num & 0x0000ff)) * percent);

  return (
    "#" +
    ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()
  );
}

// Function to generate a random lightened color
export function randomLightenedColor(percent = 0.5) {
  const color = randomColor();
  return lightenColor(color, percent);
}
