
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-700 to-blue-900 p-4">
      <div className="px-4 py-2 bg-retro-lightgray border-b border-retro-darkgray mb-4 flex items-center">
        <h1 className="text-retro-blue font-bold text-xl">Dial-Up Messenger</h1>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
