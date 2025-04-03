
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  activePage?: string;
}

const Layout = ({ children, activePage }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header activePage={activePage} />
      <main className="flex-1 container py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
