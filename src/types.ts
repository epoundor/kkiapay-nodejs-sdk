export interface KkiapayConfig {
  privatekey: string;
  publickey: string;
  secretkey: string;
  sandbox?: boolean;
}

export interface CreatePaymentLinkParams {
  amount: number; // Montant à payer

  description: string;

  authorized_payment_source: PaymentSource[]; // Moyens de paiement (ex: [“card”, “momo”])

  callback_url: string; // Lien webhook en cas de succès de paiement

  failed_callback?: string; // Lien webhook en cas d’échec de paiement

  target?: string;

  phone?: string; // Numéro pour envoi de lien via SMS (sans code pays)

  country: string; // Code pays (Ex: 299, 225)

  notifyBySms?: boolean; // Indiquer si le lien doit être envoyé par SMS sur le numéro (phone) renseigner dans la payload
}

export enum PaymentSource {
  CARD = "card",
  MOMO = "momo",
}

export interface CreatePaymentLinkResponse {
  payment_link: string;
}

export interface DepositParams {
  phoneNumber: string;
  amount: number;
  reason?: string;
  country?: string;
  provider?: MomoProvider;
  service?: string;
}

export interface DepositResponse {
  transactionId: string;
  status: Lowercase<TransactionStatus>;
  amount: number;
  phoneNumber: string;
  fees: number;
  [key: string]: unknown;
}

export interface VerifyPhoneNumberResponse {
  msisdn: string;
  provider: MomoProvider;
  status: string;
  firstname: string;
  lastname: string;
}

export type MomoProvider =
  | "airtel-ne"
  | "celtiis-bj"
  | "free-sn"
  | "moov-benin"
  | "moov-ci"
  | "moov-tg"
  | "mtn-benin"
  | "mtn-ci"
  | "orange-ci"
  | "orange-sn"
  | "tmoney-tg";

export type WalletProvider =
  | "wave-ci"
  | "wave-sn"
  | "idmoney-benin"
  | "corismoney-bj";

export type CardProvider = "visa-local" | "visa-non-local";

export type Provider = MomoProvider | WalletProvider | CardProvider;

export enum TransactionStatus {
  PENDING = "PENDING",
  FAILED = "FAILED",
  SUCCESS = "SUCCESS",
  INIT = "INIT",
}

export interface VerifyTransactionParams {
  transactionId: string;
}

export interface VerifyTransactionFound {
  performed_at: string;
  type: string;
  status: string;
  source: string;
  source_common_name: string;
  amount: number;
  fees: number;
  reason: string;
  failureCode: string;
  failureMessage: string;
  state: string | null;
  partnerId: string;
  feeSupportedBy: string;
  income: number;
  transactionId: string;
  performedAt: string;
  client: {
    fullname: string;
    phone: string;
    email: string;
  };
  [key: string]: unknown;
}

export interface VerifyTransactionNotFound {
  status: "TRANSACTION_NOT_FOUND";
}

export type VerifyTransactionResponse =
  | VerifyTransactionFound
  | VerifyTransactionNotFound;

export interface RefundTransactionParams {
  transactionId: string;
}

export interface RefundTransactionResponse {
  code: string;
  description: string;
  transactionId?: string;
  [key: string]: unknown;
}
