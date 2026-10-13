
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "../style/Layout.css";

const titles = {
  "/": "Dashboard",
  "/customers": "Customers",
  "/leads": "Leads",
  "/follow-ups": "Follow-ups",
  "/opportunities": "Opportunities",
  "/activities": "Activities",
  "/users": "Users & Roles",
  "/reports": "Reports",
  "/audit-logs": "Audit Logs",
};

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="crm-layout">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="crm-main">
        <Topbar
          title={titles[location.pathname] || "AcxiomCRM"}
          onMenuClick={() => setMenuOpen(true)}
        />
        <main className="crm-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
