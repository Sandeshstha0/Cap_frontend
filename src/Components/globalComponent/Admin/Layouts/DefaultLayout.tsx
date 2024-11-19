"use client";
import React, { useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import AdminProfile from "@/pages/admin/profile";


export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Page Wrapper */}
      <div className="flex flex-col h-screen overflow-hidden">
        {/* Header at the Top */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content Area with Sidebar */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          {/* Main Content */}
          <div className={`relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden transition ${sidebarOpen?'blur':''}`}>
            <main>
              <div className="mx-auto max-w-screen-2xl p-3 md:p-6 2xl:p-6">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
