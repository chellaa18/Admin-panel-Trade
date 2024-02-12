import { makeRandomString } from "./makeRandomString";
import { SignJWT } from "jose";
import axios from "axios";
import CryptoJS from "crypto-js";

export const getAdditionalHeaders = async (sKey) => {
    var org = makeRandomString(8);
    const key = CryptoJS.enc.Utf8.parse("c349554b3bf8dec67fa1d3a6148baa14");
    const iv = CryptoJS.enc.Utf8.parse("b7fc61413a018571");
    var encryptdOrg = CryptoJS.AES.encrypt(org, key, { iv });
    // console.log(encryptdOrg);
    // const secretKey = `https://knprkadmnbknd.koinpark.com/admin_support/sub_admin_login${org}`;
   const secretKey = `${sKey}${org}`
    const secret = new TextEncoder().encode(secretKey);
    const alg = "HS256";
    const contentVtieerHead = await new SignJWT({})
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime("6s")
      .sign(secret);
  
    return {
      "Content-Vtieer-Head": contentVtieerHead,
      "Content-Vtieer-Org": encryptdOrg,
    };
  };