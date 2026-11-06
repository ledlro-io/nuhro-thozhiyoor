// app/layout.js
import "./globals.css";
import Header from "./Header"; // import the Header component

export const metadata = {
  metadataBase: new URL("https://nuhro-thozhiyoor.vercel.app"),
  title: "Nuhro Thozhiyoor | Malabar Independent Syrian Church",
  description: "The See of Thozhiyoor — preserving the archives and heritage of the Malabar Independent Syrian Church.",

  openGraph: {
    siteName: "Nuhro Thozhiyoor",
    title: "Nuhro Thozhiyoor | Malabar Independent Syrian Church",
    description: "The See of Thozhiyoor — preserving the archives and heritage of the Malabar Independent Syrian Church.",
    url: "https://nuhro-thozhiyoor.vercel.app",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nuhro Thozhiyoor - Malabar Independent Syrian Church",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Nuhro Thozhiyoor | Malabar Independent Syrian Church",
    description: "The See of Thozhiyoor — preserving the archives and heritage of the Malabar Independent Syrian Church.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* HEADER */}
        <Header />

        {/* MAIN PAGE CONTENT */}
        <main>{children}</main>

        {/* FOOTER */}
        <footer>
          <p>
            <b>Nuhro Thozhiyoor</b><br />
            An independent heritage & research initiative.<br />
            Not an official website of MISC.
          </p>

          <div className="made-by">
            Designed & Developed by
            <a href="https://ledlro.io" target="_blank" rel="noopener">
              LEDLRO<span className="dot">.io</span>
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
