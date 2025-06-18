export default function InboxLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex flex-col font-[family-name:var(--font-geist-sans)]">
      <main className="flex-1 flex flex-col h-full">{children}</main>
    </div>
  );
}
