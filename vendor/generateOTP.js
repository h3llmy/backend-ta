import crypto from "crypto";

export default () => {
  const randomNumber =
    parseInt(crypto.randomBytes(3).toString("hex"), 16) % 1000000;
  return randomNumber.toString().padStart(6, "0");
};
