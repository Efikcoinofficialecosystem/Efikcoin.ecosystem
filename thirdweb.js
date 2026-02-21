// pages/api/auth/[...thirdweb].js
import { ThirdwebAuth } from "@thirdweb-dev/auth/next";

export const { ThirdwebAuthHandler } = ThirdwebAuth({
  domain: "efikcoin.ecosystem", // YOUR DOMAIN
  privateKey: process.env.THIRDWEB_AUTH_PRIVATE_KEY,
});
