// components/WhatsAppButton.tsx
'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export default function WhatsAppButton() {
  const pathname = usePathname();
  const whatsappUrl = 'https://wa.me/224614900424?text=Bonjour%20SoTI,%20je%20souhaite%20obtenir%20des%20informations%20ou%20un%20devis.';

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-[#20BA5A] transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
      aria-label="Discuter avec SoTI sur WhatsApp"
    >
      {/* Pulse effect rings */}
      <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping group-hover:animate-none scale-105 pointer-events-none" />
      
      {/* Official WhatsApp SVG Icon */}
      <svg
        className="w-7 h-7 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.528 2.017 14.077 1.01 11.957 1.01 6.516 1.01 2.09 5.379 2.087 10.81c-.001 1.687.447 3.327 1.3 4.773L2.344 20.3l4.303-1.146zm11.393-4.995c-.274-.137-1.62-.8-1.874-.891-.254-.092-.44-.137-.624.137-.185.274-.716.891-.876 1.074-.16.183-.32.206-.594.069-.274-.137-1.157-.426-2.204-1.36-0.815-.726-1.366-1.623-1.526-1.897-.16-.274-.017-.422.12-.559.123-.123.274-.32.411-.48.137-.16.183-.274.274-.457.092-.183.046-.343-.023-.48-.069-.137-.624-1.503-.855-2.057-.225-.54-.473-.466-.624-.474-.15-.008-.323-.009-.496-.009-.173 0-.455.065-.693.32-.238.256-.909.887-.909 2.162 0 1.275.928 2.507 1.056 2.678.127.171 1.826 2.788 4.423 3.91.618.267 1.1.426 1.475.545.621.197 1.186.169 1.632.102.497-.074 1.62-.663 1.849-1.3.229-.637.229-1.187.16-1.3-.069-.115-.254-.183-.528-.32z" />
      </svg>
    </a>
  );
}
