export async function httpRequest<T>(
  url: string,
  options: RequestInit
): Promise<T> {

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();

      const err = new Error(`HTTP ${response.status}: ${errorText || response.statusText}`);

      throw err;
    }
    const data = await response.json();
    return data as Promise<T>;
  } catch (error) {
    console.error("Fetch operational failed:", error.message);
  }

}
