import Header from "./Header";
import Footer from "./Footer";
import * as React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />
      {/* Consider <main> tags here */}
      {children}
      <Footer />
    </div>
  )
}

export default Layout