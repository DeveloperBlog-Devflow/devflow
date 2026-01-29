'use client';

import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        hideProgressBar={false}
        pauseOnHover={false}
        theme="colored"
      />
    </>
  );
};

export default ToastProvider;
