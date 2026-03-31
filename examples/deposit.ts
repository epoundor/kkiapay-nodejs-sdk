import { Kkiapay } from "../dist";

const kkiapay = new Kkiapay({
  publickey: "",
  privatekey: "",
  secretkey: "",
  // sandbox: true,
});

try {
  const result = await kkiapay.deposit.deposit({
    phoneNumber: "22967298275",
    amount: 1,
    reason: "test cash-in de 1 Fcfa",
    country: "BJ",
    provider: "mtn-benin",
    service: "pushup",
  });
  console.log(result);
} catch (error) {
  console.log(error);
}
