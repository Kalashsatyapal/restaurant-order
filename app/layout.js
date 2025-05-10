import "../styles/global.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "Restaurant App",
  description: "Restaurant Ordering System",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
