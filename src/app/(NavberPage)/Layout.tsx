// components/Layout.tsx

import React from "react";


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-background min-h-screen">

      <main>{children}</main>
    </div>
  );
};

export default Layout;
