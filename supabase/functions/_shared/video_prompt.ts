export const VIDEO_PROMPT_PROVIDER_LIMIT = 2500;
export const VIDEO_PROMPT_SAFE_LIMIT = 2450;

function normalizePromptWhitespace(prompt: string): string {
  return prompt
    .replace(/\r\n/g, '\n')
    .replace(/[\t ]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function cutAtBoundary(text: string, maxChars: number, fromEnd = false): string {
  if (text.length <= maxChars) return text;
  const slice = fromEnd ? text.slice(-maxChars) : text.slice(0, maxChars);
  const boundary = fromEnd
    ? Math.max(slice.indexOf('\n'), slice.indexOf('. '), slice.indexOf('; '))
    : Math.max(slice.lastIndexOf('\n'), slice.lastIndexOf('. '), slice.lastIndexOf('; '));
  if (boundary > 120 && boundary < slice.length - 40) {
    return fromEnd ? slice.slice(boundary + 1).trim() : slice.slice(0, boundary + 1).trim();
  }
  return slice.trim();
}

export function shapeVideoPromptForProvider(prompt: string, maxChars = VIDEO_PROMPT_SAFE_LIMIT): string {
  const normalized = normalizePromptWhitespace(String(prompt ?? ''));
  if (normalized.length <= maxChars) return normalized;

  const marker = '\n\nProvider note: prompt condensed to fit the video model request schema.\n\n';
  const headBudget = Math.max(900, Math.floor((maxChars - marker.length) * 0.62));
  const tailBudget = Math.max(400, maxChars - marker.length - headBudget);
  const head = cutAtBoundary(normalized, headBudget);
  const tail = cutAtBoundary(normalized, tailBudget, true);
  const shaped = `${head}${marker}${tail}`.trim();
  return shaped.length > maxChars ? shaped.slice(0, maxChars).trim() : shaped;
}