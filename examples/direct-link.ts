import { Kkiapay, PaymentSource } from "../dist";
const kkiapay = new Kkiapay({
  publickey: "27ea89cc4ef97fe48fcdc1deb23b8f3e91a4ebf0",
  privatekey:
    "pk_0fbd95f9f9bf963d47a37e29599819dfc30d8c852ae6ee718d3598b85ba9f566",
  secretkey:
    "sk_f85d52b8aea3961c06262afc772d37c1eb6a7912f8ff56f1014efd67aebb8900",
  //   sandbox: true,
});

try {
  const {payment_link} = await kkiapay.directLink.createLink({
    amount: 10000,
    country: "229",
    description: "test",
    authorized_payment_source: [PaymentSource.CARD, PaymentSource.MOMO],
    callback_url: "https://google.com",
    target: "SDK-TEST",
  });
    console.log(payment_link);
    
} catch (error) {
  console.log(error);
}
