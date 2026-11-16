import "./globals.css";
import SiteHeader from "../components/SiteHeader";
import { BookingsProvider } from "../context/BookingsContext";

export const metadata = {
  title: "Campus Rooms | Find your study space",
  description:
    "Discover and book collaborative study rooms across campus.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <BookingsProvider>
          <SiteHeader />
          <main className="min-h-[calc(100vh-76px)]">{children}</main>
        </BookingsProvider>
      </body>
    </html>
  );
}
