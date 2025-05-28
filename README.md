# kkiapay-nodejs-sdk

SDK Node.js non officiel pour l’intégration de Kkiapay (paiement, création de liens de paiement, dépôt, gestion des webhooks, etc).

## Installation

```bash
pnpm install kkiapay-nodejs-sdk
```

## Utilisation

- Node.js v18 ou supérieur (support natif de fetch).
- Pour Node.js <18, installez node-fetch et importez-le globalement si besoin.

```js
import { KkiapayClient, PaymentSource } from "kkiapay-nodejs-sdk";

const client = new KkiapayClient({
  publickey: "VOTRE_PUBLIC_KEY",
  secretkey: "VOTRE_SECRET_KEY",
  privatekey: "VOTRE_PRIVATE_KEY",
  sandbox: true, // ou false pour la production
});

// Exemple : création d’un lien de paiement
const link = await client.paymentLink.createLink({
  amount: 10000,
  country: "229",
  description: "test",
  authorized_payment_source: [PaymentSource.CARD, PaymentSource.MOMO],
  target: "SDK-TEST",
});

// Exemple : dépôt
const deposit = await client.deposit.deposit({
  amount: 10000,
  phone: "22990000000",
});

// Exemple : initiation d’un paiement direct
const payment = await client.payment.initiate({
  amount: 2000,
  phone: "22990000001",
  // autres champs requis
});

```
