import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Loader from '../ui/Loader';
import Header from '../layout/Header';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default Layout;
