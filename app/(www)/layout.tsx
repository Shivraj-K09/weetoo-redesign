import { FloatingChat } from "@/components/chat/floating-chat";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex flex-col font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="flex flex-col md:min-h-[calc(100vh-56px)]">
        {children}
      </main>
      <Footer />
      <FloatingChat />
    </div>
  );
}
