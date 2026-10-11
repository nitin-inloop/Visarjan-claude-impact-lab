import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function ClassicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 pb-12">{children}</main>
      <Footer />
    </>
  );
}
