import { describe, it, expect, vi, afterEach } from "vitest";
import { TransactionService } from "../services/transaction.service";
import { httpRequest } from "../utils/http";

import {
  type KkiapayConfig,
  type VerifyTransactionParams,
  type VerifyTransactionResponse,
  type RefundTransactionParams,
  type RefundTransactionResponse,
} from "../types";

vi.mock("../utils/http", () => ({
  httpRequest: vi.fn(),
}));

const mockedHttpRequest = httpRequest as unknown as ReturnType<typeof vi.fn>;

describe("TransactionService", () => {
  const config: KkiapayConfig = {
    publickey: "test_public",
    secretkey: "test_secret",
    privatekey: "test_private",
    sandbox: true,
  };
  const baseUrl = "https://api-sandbox.kkiapay.me";
  const service = new TransactionService(config, baseUrl);

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("verify", () => {
    it("should call httpRequest with only the api key and return the transaction status", async () => {
      const params: VerifyTransactionParams = {
        transactionId: "6516521598463777",
      };

      const expectedResponse: VerifyTransactionResponse = {
        performed_at: "2026-07-13T06:34:50.276Z",
        type: "DEBIT",
        status: "REVERTED",
        source: "MOBILE_MONEY",
        source_common_name: "mtn-benin",
        amount: 25350,
        fees: 254,
        reason: "payment of 25350 XOF to PATATIGYM ",
        failureCode: "",
        failureMessage: "",
        state: null,
        partnerId: "",
        feeSupportedBy: "merchant",
        income: 25096,
        transactionId: "6516521598463777",
        performedAt: "13/07/2026",
        client: {
          fullname: "Anonymous customer",
          phone: "2290167329510",
          email: "",
        },
      };

      mockedHttpRequest.mockResolvedValueOnce(expectedResponse);

      const result = await service.verify(params);

      expect(httpRequest).toHaveBeenCalledWith(
        `${baseUrl}/api/v1/transactions/status`,
        {
          method: "POST",
          body: JSON.stringify(params),
          headers: {
            "x-api-key": config.publickey,
            "Content-Type": "application/json",
          },
        }
      );
      expect(result).toEqual(expectedResponse);
    });

    it("should return TRANSACTION_NOT_FOUND when the transaction does not exist", async () => {
      const expectedResponse: VerifyTransactionResponse = {
        status: "TRANSACTION_NOT_FOUND",
      };

      mockedHttpRequest.mockResolvedValueOnce(expectedResponse);

      const result = await service.verify({ transactionId: "unknown" });

      expect(result).toEqual(expectedResponse);
    });

    it("should propagate errors from httpRequest", async () => {
      mockedHttpRequest.mockRejectedValueOnce(new Error("Network error"));

      await expect(
        service.verify({ transactionId: "6516521598463777" })
      ).rejects.toThrow("Network error");
    });
  });

  describe("refund", () => {
    it("should call httpRequest with api key and private key and return the refund result", async () => {
      const params: RefundTransactionParams = {
        transactionId: "291632409123557",
      };

      const expectedResponse: RefundTransactionResponse = {
        code: "FAILED",
        description: "NOT_REVERTED",
        transactionId: "291632409123557",
      };

      mockedHttpRequest.mockResolvedValueOnce(expectedResponse);

      const result = await service.refund(params);

      expect(httpRequest).toHaveBeenCalledWith(
        `${baseUrl}/api/v1/transactions/revert`,
        {
          method: "POST",
          body: JSON.stringify(params),
          headers: {
            "x-api-key": config.publickey,
            "x-private-key": config.privatekey,
            "Content-Type": "application/json",
          },
        }
      );
      expect(result).toEqual(expectedResponse);
    });

    it("should return an error code when the refund is not eligible", async () => {
      const expectedResponse: RefundTransactionResponse = {
        code: "TRANSACTION_NOT_ELIGIBLE",
        description: "this transaction is already reverted or not eligible",
      };

      mockedHttpRequest.mockResolvedValueOnce(expectedResponse);

      const result = await service.refund({ transactionId: "6094373429714011" });

      expect(result).toEqual(expectedResponse);
    });

    it("should propagate errors from httpRequest", async () => {
      mockedHttpRequest.mockRejectedValueOnce(new Error("Network error"));

      await expect(
        service.refund({ transactionId: "291632409123557" })
      ).rejects.toThrow("Network error");
    });
  });
});
