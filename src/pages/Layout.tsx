
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-retro-desktop desktop-pattern">
      <div className="px-4 py-2 bg-win98-gradient text-white mb-4 flex items-center shadow-md">
        <h1 className="text-xl font-bold font-vt323 tracking-wide text-shadow-win98">Dial-Up Messenger</h1>
      </div>
      <div className="flex-1 container mx-auto px-4 md:px-6 max-w-5xl">
        <Outlet />
      </div>
      <div className="mt-4 bg-retro-lightgray py-1 px-2 border-t border-retro-darkgray shadow-inner text-xs text-center text-retro-darkgray">
        <p>© 2025 Dial-Up Messenger - Connecting you like it's 1998</p>
      </div>
    </div>
  );
};

export default Layout;
