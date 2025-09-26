

import { Manrope } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // tu ajoutes les poids que tu veux
});
export const metadata = {
  title: "Comparateur assurance maladie",
  description: "Comparateur d'assurance maladie en suisse",
  icons: {
    icon: "../comp.png"
  },
  themeColor: "#ffffff"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-pQvZg1oXyV6zF8KdC3s1JHn1o2JNkVyNnhx3QbXoeP9IYxPmJ5iDCE3H3cFv0M7sJ6+zP8O5SgT1G8V7XZp1EA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>

      <body
        className={manrope.className}
      >
        {children}
      </body>
    </html>
  );
}
