import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <main className="flex-grow-1 p-4" style={{backgroundColor: '#f8f9fa', minHeight: '100vh'}}>
          {children}
        </main>
      </div>
    </div>
  );
}
