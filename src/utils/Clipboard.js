export const copyToClipboard = (text) => {
  try {
    navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy to clipboard: ", err);
  }
};
