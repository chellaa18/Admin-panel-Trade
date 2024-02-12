import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const UserDetail = React.lazy(() => import("./views/users/UserDetail"));
const LaunchPad = React.lazy(() => import("./views/launchPad/LaunchPad"));
const ViewEventDetails = React.lazy(() => import("./views/launchPad/eventDetails/ViewEventDetails"));
const UserView = React.lazy(()=> import("./views/users/UserView"))
const ImageUpload = React.lazy(()=> import("./views/imageUpload/ImageUpload"))
const CurrencyList = React.lazy(()=> import("./views/exchange/CurrencyList"))
const CurrencyAdd = React.lazy(()=> import("./views/exchange/CurrencyAdd"))
const PairLists = React.lazy(()=> import("./views/exchange/PairLists"))
const AddPair = React.lazy(()=> import("./views/exchange/AddPair"))

const routes = [
  { path: "/admin/dashboard", name: "Dashboard", element: Dashboard },

  { path: "/admin/userDetail", name: "UserDetail", element: UserDetail },

  { path: "/admin/launchPad", name: "LaunchPad", element: LaunchPad },

  { path: "/admin/viewevent", name: "ViewEventDetails", element: ViewEventDetails },

  { path: "/admin/userview/:id", name: "UserView", element: UserView },

  { path: "/admin/imageupload", name: "ImageUpload", element: ImageUpload },
  
  { path: "/admin/exchange/currency", name: "CurrencyList", element: CurrencyList },

  { path: "/admin/exchange/currencyAdd", name: "CurrencyAdd", element: CurrencyAdd },

  { path: "/admin/exchange/pairlist", name: "PairLists", element: PairLists },

  { path: "/admin/exchange/addpair", name: "AddPair", element: AddPair },
];


export default routes;
