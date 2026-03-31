import { KKIA_BASE_URLS } from "./constants";
import { DirectLinkService } from "./services/direct-link.service";
import { DepositService } from "./services/deposit.service";
import type { KkiapayConfig } from "./types";

export class Kkiapay {
  private baseUrl: string;
  readonly directLink: DirectLinkService;
  readonly deposit: DepositService;

  constructor(config: KkiapayConfig) {
    this.baseUrl = config.sandbox
      ? KKIA_BASE_URLS.sandbox
      : KKIA_BASE_URLS.production;
    this.directLink = new DirectLinkService(config, this.baseUrl);
    this.deposit = new DepositService(config, this.baseUrl);
  }
}
