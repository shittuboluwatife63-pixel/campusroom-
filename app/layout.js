import "./globals.css";

export const metadata = {
  title: "Campus Rooms | Find your study space",
  description:
    "Discover and book collaborative study rooms across campus.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
