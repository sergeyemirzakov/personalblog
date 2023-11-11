import React from 'react';
import Footer from '../Footer';
import Header from '../Header';
import Container from '../UI/Container';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      <Header />
      {children}
      <Footer />
    </Container>
  );
};

export default Layout;
