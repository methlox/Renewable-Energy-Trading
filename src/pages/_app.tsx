import { ClerkProvider } from "@clerk/nextjs";
import { type AppType } from "next/dist/shared/lib/utils";

import "npm/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
  <ClerkProvider {...pageProps} >
    <Component {...pageProps} />
  </ClerkProvider>) 
  ;
};

export default MyApp;
