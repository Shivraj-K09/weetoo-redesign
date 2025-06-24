import { FloatingChat } from "@/components/chat/floating-chat";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weetoo - We Trade",
  description:
    "Weetoo is a platform for the trading simulation of cryptocurrencies, stocks, and forex. Join us to learn, practice, and compete in a risk-free environment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-1 flex flex-col font-[family-name:var(--font-geist-sans)] h-full w-full">
      <Header />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
      <FloatingChat />
    </div>
  );
}
