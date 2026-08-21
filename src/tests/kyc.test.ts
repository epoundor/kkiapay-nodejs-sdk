import { describe, it, expect, vi, afterEach } from "vitest";
import { httpRequest } from "../utils/http";

import {
  type KkiapayConfig,
  type DepositParams,
  type VerifyPhoneNumberResponse,
} from "../types";
import { KycService } from "../services/kyc.service";

vi.mock("../utils/http", () => ({
  httpRequest: vi.fn(),
}));

const mockedHttpRequest = httpRequest as unknown as ReturnType<typeof vi.fn>;

describe("KycService", () => {
  const config: KkiapayConfig = {
    publickey: "test_public",
    secretkey: "test_secret",
    privatekey: "test_private",
    sandbox: true,
  };
  const baseUrl = "https://api-sandbox.kkiapay.me";
  const service = new KycService(config, baseUrl);

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should call httpRequest with correct parameters and return response", async () => {
    const phoneNumber = "22967298275";

    const expectedResponse: VerifyPhoneNumberResponse = {
      msisdn: phoneNumber,
      provider: "mtn-benin",
      status: "REGISTERED_BLOCKED",
      firstname: "Poita",
      lastname: "Codo"
    };

    mockedHttpRequest.mockResolvedValueOnce(expectedResponse);

    const result = await service.verifyPhoneNumber(phoneNumber);

    expect(httpRequest).toHaveBeenCalledWith(
      `${baseUrl}/api/v2/account/kyc?phone=${phoneNumber}`,
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          "x-api-key": config.publickey,
          "Content-Type": "application/json",
        }),
      })
    );
    expect(result).toEqual(expectedResponse);
  });

  it("should propagate errors from httpRequest", async () => {
    mockedHttpRequest.mockRejectedValueOnce(new Error("Network error"));

    await expect(
      service.verifyPhoneNumber("22912345678")
    ).rejects.toThrow("Network error");
  });
});
