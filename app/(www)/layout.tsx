import { FloatingChat } from "@/components/chat/floating-chat";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-1 flex flex-col font-[family-name:var(--font-geist-sans)] h-full w-full">
      <Header />
      <main className="flex-1 flex flex-col h-full">{children}</main>
      <Footer />
      <FloatingChat />
    </div>
  );
}
