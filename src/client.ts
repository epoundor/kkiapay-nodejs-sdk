import { KKIA_BASE_URLS } from "./constants";
import { DirectLinkService } from "./services/direct-link.service";
import { DepositService } from "./services/deposit.service";
import { TransactionService } from "./services/transaction.service";
import type { KkiapayConfig } from "./types";
import { KycService } from "./services/kyc.service";

export class Kkiapay {
  private baseUrl: string;
  readonly directLink: DirectLinkService;
  readonly deposit: DepositService;
  readonly transaction: TransactionService;
  readonly kyc: KycService;

  constructor(config: KkiapayConfig) {
    this.baseUrl = config.sandbox
      ? KKIA_BASE_URLS.sandbox
      : KKIA_BASE_URLS.production;
    this.directLink = new DirectLinkService(config, this.baseUrl);
    this.deposit = new DepositService(config, this.baseUrl);
    this.transaction = new TransactionService(config, this.baseUrl);
    this.kyc = new KycService(config, this.baseUrl);
  }
}
