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
