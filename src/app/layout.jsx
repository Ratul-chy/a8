'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>CardVault - Trading Cards Store</title>
        <meta name="description" content="Your ultimate trading cards destination" />
      </head>
      <body className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-purple-50">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
        <ToastContainer position="bottom-right" autoClose={3000} />
      </body>
    </html>
  );
}