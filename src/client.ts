import { KKIA_BASE_URLS } from "./constants";
import { DirectLinkService } from "./services/direct-link.service";
import type { KkiapayConfig } from "./types";

export class Kkiapay {
  baseUrl: string;
  readonly directLink: DirectLinkService;

  constructor(config: KkiapayConfig) {
    this.baseUrl = config.sandbox
      ? KKIA_BASE_URLS.sandbox
      : KKIA_BASE_URLS.production;
    this.directLink = new DirectLinkService(config, this.baseUrl);
  }
}
