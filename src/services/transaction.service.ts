import type {
  KkiapayConfig,
  RefundTransactionParams,
  RefundTransactionResponse,
  VerifyTransactionParams,
  VerifyTransactionResponse,
} from "../types";
import { httpRequest } from "../utils/http";

/**
 * Service for verifying and refunding transactions using the Kkiapay API.
 */
export class TransactionService {
  /**
   * Constructs a new instance of the TransactionService.
   *
   * @param config - The configuration object containing Kkiapay API keys.
   * @param baseUrl - The base URL for the Kkiapay API.
   */
  constructor(private config: KkiapayConfig, private baseUrl: string) {}

  /**
   * Verifies the status of a transaction by its transaction ID.
   *
   * @param params - The verification parameters.
   * @returns A promise that resolves to the transaction status.
   */
  async verify(
    params: VerifyTransactionParams
  ): Promise<VerifyTransactionResponse> {
    return await httpRequest<VerifyTransactionResponse>(
      `${this.baseUrl}/api/v1/transactions/status`,
      {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          "x-api-key": this.config.publickey,
          "Content-Type": "application/json",
        },
      }
    );
  }

  /**
   * Refunds (reverts) a transaction by its transaction ID.
   *
   * @param params - The refund parameters.
   * @returns A promise that resolves to the refund result.
   */
  async refund(
    params: RefundTransactionParams
  ): Promise<RefundTransactionResponse> {
    return await httpRequest<RefundTransactionResponse>(
      `${this.baseUrl}/api/v1/transactions/revert`,
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
