
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, Users, UserRoundSearch, CalendarClock,
  Handshake, Activity, ShieldCheck, ChartNoAxesCombined,
  ClipboardList, X
} from "lucide-react";
import "../style/Sidebar.css";

const links = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Customers", path: "/customers", icon: Users },
  { label: "Leads", path: "/leads", icon: UserRoundSearch },
  { label: "Follow-ups", path: "/follow-ups", icon: CalendarClock },
  { label: "Opportunities", path: "/opportunities", icon: Handshake },
  { label: "Activities", path: "/activities", icon: Activity },
  { label: "Users & Roles", path: "/users", icon: ShieldCheck },
  { label: "Reports", path: "/reports", icon: ChartNoAxesCombined },
  { label: "Audit Logs", path: "/audit-logs", icon: ClipboardList },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && <button className="sidebar-overlay" onClick={onClose} aria-label="Close menu" />}
      <aside className={`crm-sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-logo">A</div>
          <div className="brand-text">
            <strong>AcxiomCRM</strong>
            <small>Customer management</small>
          </div>
          <button className="sidebar-close" onClick={onClose} aria-label="Close sidebar">
            <X size={20} />
          </button>
        </div>

        <p className="sidebar-heading">WORKSPACE</p>
        <nav className="sidebar-nav">
          {links.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              onClick={onClose}
              className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
            >
              <Icon size={19} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span className="status-dot" />
          <span>CRM Workspace</span>
        </div>
      </aside>
    </>
  );
}
