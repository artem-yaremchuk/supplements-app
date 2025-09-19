import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Loader from '../Loader';
import Header from '../layout/Header';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  return (
    <>
      <Header />
      <main className="relative min-h-[calc(100vh-64px)]">
        {' '}
        {/* якщо хедер ~64px */}
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
};

export default Layout;
