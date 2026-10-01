export class KkiapayError extends Error {
  constructor(
    readonly status: number,
    readonly body: unknown,
    message: string
  ) {
    super(message);
    this.name = "KkiapayError";
    Object.setPrototypeOf(this, KkiapayError.prototype);
  }
}
