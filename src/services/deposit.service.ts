import type { DepositParams, DepositResponse, KkiapayConfig } from "../types";
import { httpRequest } from "../utils/http";

/**
 * Service for initiating mobile money deposits (cash-in) using the Kkiapay API.
 */
export class DepositService {
  /**
   * Constructs a new instance of the DepositService.
   *
   * @param config - The configuration object containing Kkiapay API keys.
   * @param baseUrl - The base URL for the Kkiapay API.
   */
  constructor(private config: KkiapayConfig, private baseUrl: string) {}

  /**
   * Initiates a mobile money deposit (push payment) via the Kkiapay API.
   *
   * @param params - The deposit parameters.
   * @returns A promise that resolves to the deposit response.
   */
  async deposit(params: DepositParams): Promise<DepositResponse> {
    return await httpRequest<DepositResponse>(
      `${this.baseUrl}/api/v1/payments/deposit`,
      {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          "x-api-key": this.config.publickey,
          "x-private-key": this.config.privatekey,
          "Content-Type": "application/json",
        },
      }
    );
  }
}
