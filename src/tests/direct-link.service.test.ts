import { describe, it, expect, vi, afterEach } from "vitest";
import { DirectLinkService } from "../services/direct-link.service";
import { httpRequest } from "../utils/http";

import {
  type KkiapayConfig,
  type CreatePaymentLinkParams,
  type CreatePaymentLinkResponse,
  PaymentSource,
} from "../types";

vi.mock("../src/utils/http", () => ({
  httpRequest: vi.fn(),
}));

const mockedHttpRequest = httpRequest as unknown as ReturnType<typeof vi.fn>;

describe("DirectLinkService", () => {
  const config: KkiapayConfig = {
    publickey: "test_public",
    secretkey: "test_secret",
    privatekey: "test_private",
    sandbox: true,
  };
  const baseUrl = "https://api-sandbox.kkiapay.me";
  const service = new DirectLinkService(config, baseUrl);

  afterEach(() => {
    vi.clearAllMocks();
  });

  it.skip("should call httpRequest with correct parameters and return response", async () => {
    const params: CreatePaymentLinkParams = {
      amount: 10000,
      country: "229",
      description: "test",
      authorized_payment_source: [PaymentSource.CARD, PaymentSource.MOMO],
      callback_url: "https://google.com",
      target: "SDK-TEST",
    };

    const expectedResponse: CreatePaymentLinkResponse = {
      payment_link: "https://pay.kkiapay.me/abc123",
    };

    mockedHttpRequest.mockResolvedValueOnce(expectedResponse);

    const result = await service.createLink(params);

    expect(httpRequest).toHaveBeenCalledWith(
      `${baseUrl}/api/partner/payments/generate`,
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(params),
        headers: expect.objectContaining({
          "x-api-key": config.publickey,
          "x-secret-key": config.secretkey,
          "x-private-key": config.privatekey,
          "Content-Type": "application/json",
        }),
      })
    );
    expect(result).toEqual(expectedResponse);
  });
});
