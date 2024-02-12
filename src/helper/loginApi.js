// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { SignJWT } from "jose";
// import axios from "axios";
// import CryptoJS from "crypto-js";
// import { getToken } from "./getToken";
// import { makeRandomString } from "./makeRandomString";

// const getAdditionalHeaders = async () => {
//   var org = makeRandomString(8);
//   const key = CryptoJS.enc.Utf8.parse("c349554b3bf8dec67fa1d3a6148baa14");
//   const iv = CryptoJS.enc.Utf8.parse("b7fc61413a018571");
//   // console.log(org);
//   var encryptdOrg = CryptoJS.AES.encrypt(org, key, { iv });

//   const secretKey = `https://knprkadmnbknd.koinpark.com/admin_support/sub_admin_login${org}`;
//   // console.log(secretKey);
//   // const encryptedSecretKey = window.btoa(secretKey);
//   const secret = new TextEncoder().encode(secretKey);
//   // console.log(secret);
//   const alg = "HS256";
//   const contentVtieerHead = await new SignJWT({})
//     .setProtectedHeader({ alg })
//     .setIssuedAt()
//     .setExpirationTime("6s")
//     .sign(secret);

//   // console.log(contentVtieerHead);
//   return {
//     "Content-Vtieer-Head": contentVtieerHead,
//     "Content-Vtieer-Org": encryptdOrg,
//   };
// };

// export const loginApi = createApi({
//   reducerPath: "loginApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "https://knprkadmnbknd.koinpark.com" }),
//   endpoints: (builder) => ({
//     logInUser: builder.mutation({
//       query: async (data) => {

//         const additionalHeaders = await getAdditionalHeaders();

//         const response = await axios({
//           method: "post",
//           url: `https://knprkadmnbknd.koinpark.com/admin_support/sub_admin_login`,
//           data: data,
//           headers: {
//             ...additionalHeaders,
//           },
//         });

//         return response;
//       },

//       invalidatesTags: ["Login"],
//     }),

//     getUser: builder.mutation({
//       query: (param) => {
//         try {
//           const token = getToken();
//           const additionalHeaders = getAdditionalHeaders();

//           return {
//             url: "admin/user_list",
//             method: "POST",
//             body: param,
//             headers: {
//               ...additionalHeaders,
//               Authorization: `Bearer ${token}`,
//             },
//           };
//         } catch (error) {
//           return { error };
//         }
//       },
//     }),
//   }),
// });

// export const { useLogInUserMutation, useGetUserMutation } = loginApi;



import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SignJWT } from "jose";
import axios from "axios";
import CryptoJS from "crypto-js";
import { getToken } from "./getToken";
import { makeRandomString } from "./makeRandomString";

const getAdditionalHeaders = async () => {
  var org = makeRandomString(8);
  const key = CryptoJS.enc.Utf8.parse("c349554b3bf8dec67fa1d3a6148baa14");
  const iv = CryptoJS.enc.Utf8.parse("b7fc61413a018571");
  var encryptdOrg = CryptoJS.AES.encrypt(org, key, { iv });

  const secretKey = `https://knprkadmnbknd.koinpark.com/admin_support/sub_admin_login${org}`;
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

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://knprkadmnbknd.koinpark.com",
    prepareHeaders: (headers, { getState }) => {
    // console.log(headers)
      if (headers.indexOf("http") !== 0) {
        headers.set("https://knprkadmnbknd.koinpark.com", "");
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // logInUser: builder.mutation({
    //   query: async (data) => {
    //     const additionalHeaders = await getAdditionalHeaders();

    //     const response = await axios({
    //       method: "post",
    //       url: "https://knprkadmnbknd.koinpark.com/admin_support/sub_admin_login", 
    //       data: data,
    //       headers: {
    //         ...additionalHeaders,
    //       },
    //     });

    //     return response;
    //   },
    //   invalidatesTags: ["Login"],
    // }),

    getUser: builder.mutation({
      query: (param) => {
        try {
          const token = getToken();
          const additionalHeaders = getAdditionalHeaders();

          return {
            url: "/admin/user_list", 
            method: "POST",
            body: param,
            headers: {
              ...additionalHeaders,
              Authorization: `Bearer ${token}`,
            },
          };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useLogInUserMutation, useGetUserMutation } = loginApi;