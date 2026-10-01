import { describe, it, expect, vi, afterEach } from "vitest";
import { httpRequest } from "../utils/http";
import { KkiapayError } from "../errors";

const mockFetch = (body: string, init: ResponseInit) =>
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(body, init)));

const catchError = (promise: Promise<unknown>) =>
  promise.then(
    () => expect.fail("expected httpRequest to throw"),
    (e: KkiapayError) => e
  );

describe("httpRequest", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns the parsed JSON body", async () => {
    mockFetch(JSON.stringify({ ok: true }), { status: 200 });

    await expect(httpRequest("https://x", {})).resolves.toEqual({ ok: true });
  });

  it("returns undefined for an empty body", async () => {
    mockFetch("", { status: 200 });

    await expect(httpRequest("https://x", {})).resolves.toBeUndefined();
  });

  it("throws a KkiapayError with status and parsed body on non-2xx", async () => {
    mockFetch(JSON.stringify({ message: "invalid key" }), { status: 401 });

    const error = await catchError(httpRequest("https://x", {}));

    expect(error).toBeInstanceOf(KkiapayError);
    expect(error.status).toBe(401);
    expect(error.body).toEqual({ message: "invalid key" });
    expect(error.message).toBe('HTTP 401: {"message":"invalid key"}');
  });

  it("keeps a non-JSON error body as text", async () => {
    mockFetch("Bad Gateway", { status: 502 });

    const error = await catchError(httpRequest("https://x", {}));

    expect(error.body).toBe("Bad Gateway");
  });

  it("propagates network errors", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("fetch failed")));

    await expect(httpRequest("https://x", {})).rejects.toThrow("fetch failed");
  });
});
