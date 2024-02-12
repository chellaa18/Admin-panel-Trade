import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faCalendarDays,
  faUser,
  faClipboard
} from "@fortawesome/free-solid-svg-icons";


// const _nav = [
//   {
//     name: "Dashboard",
//     to: "/admin/dashboard",
//     icon: <FontAwesomeIcon icon={faCalendarDays} className="me-2 text-white text-center" />,
//   },
//   {
//     name: "User Details",
//     to: "/admin/userDetail",
//     icon: <FontAwesomeIcon icon={faUser} className="me-2 text-white text-center" />
//   },
//   {
//     name: "CurrencyList",
//     to: "/admin/exchange/currency",
//     icon: <FontAwesomeIcon icon={faClipboard} className="me-2 text-white text-center" />,
//   },
//   {
//     name: "PairList",
//     to: "/admin/exchange/pairlist",
//     icon: <FontAwesomeIcon icon={faClipboard} className="me-2 text-white text-center" />,
//   },
// ];

const _nav = [
  {
    name: "Admin",
    icon: <FontAwesomeIcon icon={faClipboard} className="me-2 text-white text-center" />,
    children: [
     {
    name: "Dashboard",
    to: "/admin/dashboard",
    icon: <FontAwesomeIcon icon={faCalendarDays} className="me-2 text-white text-center" />,
  },
      {
    name: "User Details",
    to: "/admin/userDetail",
    icon: <FontAwesomeIcon icon={faUser} className="me-2 text-white text-center" />
  },
    ]
  },
  {
    name: "Exchange",
    icon: <FontAwesomeIcon icon={faClipboard} className="me-2 text-white text-center" />,
    children: [
      {
        name: "CurrencyList",
        to: "/admin/exchange/currency",
        icon: <FontAwesomeIcon icon={faClipboard} className="me-2 text-white text-center" />,
      },
      {
        name: "PairList",
        to: "/admin/exchange/pairlist",
        icon: <FontAwesomeIcon icon={faClipboard} className="me-2 text-white text-center" />,
      }
    ]
  },
];

export default _nav;





