import { Kkiapay } from "../dist";

const kkiapay = new Kkiapay({
  publickey: "",
  privatekey: "",
  secretkey: "",
  // sandbox: true,
});

try {
  const status = await kkiapay.transaction.verify({
    transactionId: "6516521598463777",
  });
  console.log(status);
} catch (error) {
  console.log(error);
}

try {
  const refund = await kkiapay.transaction.refund({
    transactionId: "6516521598463777",
  });
  console.log(refund);
} catch (error) {
  console.log(error);
}
