import "./globals.css";
import Navbar from "@/components/Layout/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="bg">
      <body>
        <header>
          <Navbar />
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}