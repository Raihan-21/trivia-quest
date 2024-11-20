import { ubuntu } from "@/fonts/font";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className={ubuntu.className}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
