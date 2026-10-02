import { KkiapayError } from "../errors";

export async function httpRequest<T>(
  url: string,
  options: RequestInit
): Promise<T> {
  const response = await fetch(url, options);
  const text = await response.text();
  const body = parseBody(text);

  if (!response.ok) {
    throw new KkiapayError(
      response.status,
      body,
      `HTTP ${response.status}: ${text || response.statusText}`
    );
  }

  return body as T;
}

function parseBody(text: string): unknown {
  if (!text) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
