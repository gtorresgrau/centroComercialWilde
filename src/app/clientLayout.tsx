"use client"; // Mark this component as a client component

import React, { Suspense } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import ButtonWsp from '../components/Socials/ButtonWsp';
import { usePathname } from 'next/navigation';
import Loading from '../components/Loading/Loading';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname() || "";
  const routesSinNav = ['/Login', '/admin'];
  const hideLayout = routesSinNav.includes(path);

  return (
    <>
      {!hideLayout && (
        <nav className='mb-20'>
          <Suspense fallback={<Loading />}>
            <Navbar />
          </Suspense>
        </nav>
      )}
      {children}
      {!hideLayout && (
        <footer>
          <Footer />
          <ButtonWsp />
        </footer>
      )}
    </>
  );
}
