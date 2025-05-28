import { Kkiapay, PaymentSource } from "../dist";
const kkiapay = new Kkiapay({
  publickey: "",
  privatekey: "",
  secretkey: "",
  //   sandbox: true,
});

try {
  const { payment_link } = await kkiapay.directLink.createLink({
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
