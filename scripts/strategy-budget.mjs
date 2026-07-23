export const measureStrategy = (rawText) => {
  const text = rawText.replace(/\r\n?/g, '\n');
  return {
    chars: text.length,
    lines: text.split('\n').length,
  };
};
