import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full text-center py-4 bg-gray-900 text-gray-400 text-sm border-t border-gray-800 mt-auto">
      <p>&copy; {currentYear} Facebook. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
