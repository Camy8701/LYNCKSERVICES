import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Navigation />
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default PageLayout;
