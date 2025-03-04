import Link from 'next/link';
import React from 'react';

const WhatsAppButton = () => {
  return (
    <Link
      href='https://wa.me/201553878925'
      target='_blank'
      rel='noopener noreferrer'
      className='fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-8 w-8'
        viewBox='0 0 24 24'
        fill='currentColor'
      >
        <path d='M12 2C6.48 2 2 6.48 2 12c0 1.92.54 3.71 1.47 5.24L2 22l4.76-1.47C8.29 21.46 10.08 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.29 13.16l-.72 1.58c-.09.2-.28.35-.5.39-.13.02-.26.03-.39.03-1.1 0-2.19-.34-3.15-.98-1.24-.84-2.18-1.97-2.84-3.26-.66-1.29-1-2.64-.98-3.96 0-.13.01-.26.03-.39.04-.22.19-.41.39-.5l1.58-.72c.41-.19.9-.06 1.16.3l1.14 1.58c.18.25.2.57.06.85l-.64 1.36c-.08.18-.06.38.05.54.27.42.62.8 1.05 1.12.43.32.92.58 1.45.76.18.06.37.03.54-.05l1.36-.64c.28-.14.6-.12.85.06l1.58 1.14c.35.26.49.74.3 1.16z' />
      </svg>
    </Link>
  );
};

export default WhatsAppButton;
