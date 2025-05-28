import type {
  CreatePaymentLinkParams,
  CreatePaymentLinkResponse,
  KkiapayConfig,
} from "../types";
import { httpRequest } from "../utils/http";

/**
 * Service for creating direct payment links using the Kkiapay API.
 */
export class DirectLinkService {
  /**
   * Constructs a new instance of the DirectLinkService.
   *
   * @param config - The configuration object containing Kkiapay API keys.
   * @param baseUrl - The base URL for the Kkiapay API.
   */
  constructor(private config: KkiapayConfig, private baseUrl: string) {}

  /**
   * Creates a payment link using the Kkiapay API.
   *
   * @param params - The parameters required to create a payment link.
   * @returns A promise that resolves to the response containing the payment link details.
   */
  async createLink(
    params: CreatePaymentLinkParams
  ): Promise<CreatePaymentLinkResponse> {
    return await httpRequest<CreatePaymentLinkResponse>(
      `${this.baseUrl}/api/partner/payments/generate`,
      {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          "x-api-key": this.config.publickey,
          "x-secret-key": this.config.secretkey,
          "x-private-key": this.config.privatekey,
          "Content-Type": "application/json",
        },
      }
    );
  }
}
