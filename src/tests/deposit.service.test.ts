import { describe, it, expect, vi, afterEach } from "vitest";
import { DepositService } from "../services/deposit.service";
import { httpRequest } from "../utils/http";

import {
  type KkiapayConfig,
  type DepositParams,
  type DepositResponse,
} from "../types";

vi.mock("../utils/http", () => ({
  httpRequest: vi.fn(),
}));

const mockedHttpRequest = httpRequest as unknown as ReturnType<typeof vi.fn>;

describe("DepositService", () => {
  const config: KkiapayConfig = {
    publickey: "test_public",
    secretkey: "test_secret",
    privatekey: "test_private",
    sandbox: true,
  };
  const baseUrl = "https://api-sandbox.kkiapay.me";
  const service = new DepositService(config, baseUrl);

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should call httpRequest with correct parameters and return response", async () => {
    const params: DepositParams = {
      phoneNumber: "22967298275",
      amount: 1,
      reason: "test cash-in de 1 Fcfa",
      country: "BJ",
      provider: "mtn-benin",
      service: "pushup",
    };

    const expectedResponse: DepositResponse = {
      transactionId: "txn_abc123",
      status: "pending",
      amount: 1,
      phoneNumber: "22967298275",
      fees: 0,
    };

    mockedHttpRequest.mockResolvedValueOnce(expectedResponse);

    const result = await service.deposit(params);

    expect(httpRequest).toHaveBeenCalledWith(
      `${baseUrl}/api/v1/payments/deposit`,
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(params),
        headers: expect.objectContaining({
          "x-api-key": config.publickey,
          "x-private-key": config.privatekey,
          "Content-Type": "application/json",
        }),
      })
    );
    expect(result).toEqual(expectedResponse);
  });

  it("should propagate errors from httpRequest", async () => {
    mockedHttpRequest.mockRejectedValueOnce(new Error("Network error"));

    await expect(
      service.deposit({
        phoneNumber: "22967298275",
        amount: 1,
        country: "BJ",
        provider: "mtn-benin",
      })
    ).rejects.toThrow("Network error");
  });
});
