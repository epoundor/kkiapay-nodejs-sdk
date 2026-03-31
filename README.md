# kkiapay-nodejs-sdk

SDK Node.js pour l'intégration de [Kkiapay](https://kkiapay.me) : création de liens de paiement, dépôts mobile money, et plus.

## Installation

```bash
pnpm install kkiapay-nodejs-sdk
# ou
npm install kkiapay-nodejs-sdk
```

**Prérequis :** Node.js v18+ (support natif de `fetch`).

## Initialisation

```ts
import { Kkiapay } from "kkiapay-nodejs-sdk";

const kkiapay = new Kkiapay({
  publickey: "VOTRE_PUBLIC_KEY",
  secretkey: "VOTRE_SECRET_KEY",
  privatekey: "VOTRE_PRIVATE_KEY",
  sandbox: true, // false pour la production
});
```

## Services disponibles

### Lien de paiement — `kkiapay.directLink`

Génère un lien de paiement à partager avec le client.

```ts
import { Kkiapay, PaymentSource } from "kkiapay-nodejs-sdk";

const { payment_link } = await kkiapay.directLink.createLink({
  amount: 10000,
  country: "229",
  description: "Commande #42",
  authorized_payment_source: [PaymentSource.CARD, PaymentSource.MOMO],
  callback_url: "https://example.com/webhook/success",
  failed_callback: "https://example.com/webhook/failed",
  target: "SDK-TEST",
});

console.log(payment_link); // https://pay.kkiapay.me/...
```

| Paramètre | Type | Requis | Description |
|---|---|---|---|
| `amount` | `number` | ✓ | Montant à payer |
| `description` | `string` | ✓ | Description de la transaction |
| `authorized_payment_source` | `PaymentSource[]` | ✓ | Moyens de paiement acceptés (`card`, `momo`) |
| `callback_url` | `string` | ✓ | Webhook appelé en cas de succès |
| `country` | `string` | ✓ | Code pays (ex: `229`, `225`) |
| `failed_callback` | `string` | — | Webhook appelé en cas d'échec |
| `phone` | `string` | — | Numéro pour envoi du lien par SMS |
| `notifyBySms` | `boolean` | — | Envoyer le lien par SMS |
| `target` | `string` | — | Identifiant interne |

---

### Dépôt mobile money — `kkiapay.deposit`

Initie un paiement push (cash-in) vers un numéro mobile money.

```ts
const result = await kkiapay.deposit.deposit({
  phoneNumber: "22967298275",
  amount: 1000,
  reason: "Remboursement commande #42",
  country: "BJ",
  provider: "mtn-benin",
  service: "pushup",
});

console.log(result.transactionId);
```

| Paramètre | Type | Requis | Description |
|---|---|---|---|
| `phoneNumber` | `string` | ✓ | Numéro mobile money (avec indicatif) |
| `amount` | `number` | ✓ | Montant en francs CFA |
| `country` | `string` | ✓ | Code pays ISO (ex: `BJ`, `CI`, `SN`) |
| `provider` | `MomoProvider` | ✓ | Opérateur mobile money (voir liste ci-dessous) |
| `reason` | `string` | — | Motif du dépôt |
| `service` | `string` | — | Type de service (ex: `pushup`) |

**Opérateurs supportés (`MomoProvider`) :**
`mtn-benin`, `mtn-ci`, `moov-benin`, `moov-ci`, `moov-tg`, `orange-ci`, `orange-sn`, `free-sn`, `tmoney-tg`, `celtiis-bj`, `airtel-ne`

## Environnements

| `sandbox` | URL |
|---|---|
| `true` | `https://api-sandbox.kkiapay.me` |
| `false` (défaut) | `https://api.kkiapay.me` |
