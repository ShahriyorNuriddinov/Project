import Header from "@/components/Header";
import Footer from "@/components/Footer/footer";
import { ToastContainer, toast } from 'react-toastify';
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <ToastContainer/>
    </>
  );
}
