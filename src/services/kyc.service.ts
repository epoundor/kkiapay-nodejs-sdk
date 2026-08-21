import { KkiapayConfig, VerifyPhoneNumberResponse } from "../types";
import { httpRequest } from "../utils/http";

/**
 * Service for KYC on phone number using the Kkiapay API.
 */
export class KycService {
  /**
   * Constructs a new instance of the KycService.
   *
   * @param config - The configuration object containing Kkiapay API keys.
   * @param baseUrl - The base URL for the Kkiapay API.
   */
  constructor(private config: KkiapayConfig, private baseUrl: string) { }

  /**
   * Initiates a KYC verification on phone number via the Kkiapay API.
   *
   * @param phoneNumber - The phone number to verify.
   * @returns A promise that resolves to the KYC verification response.
   */
  async verifyPhoneNumber(phoneNumber: string) {
    return await httpRequest<VerifyPhoneNumberResponse>(
      `${this.baseUrl}/api/v2/account/kyc?phone=${phoneNumber}`,
      {
        method: "GET",
        headers: {
          "x-api-key": this.config.publickey,
          "Content-Type": "application/json",
        },
      }
    );
  }
}
