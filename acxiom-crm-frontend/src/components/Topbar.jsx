
import { Menu, Bell } from "lucide-react";
import "../style/Topbar.css";

export default function Topbar({ title, onMenuClick }) {
  return (
    <header className="crm-topbar">
      <div className="topbar-title">
        <button className="mobile-menu" onClick={onMenuClick} aria-label="Open menu">
          <Menu size={22} />
        </button>
        <div>
          <h1>{title}</h1>
          <p>Manage your customer relationships</p>
        </div>
      </div>

      <div className="topbar-right">
        <button className="notification-button" aria-label="Notifications">
          <Bell size={20} />
        </button>
        <div className="user-avatar">A</div>
        <div className="user-details">
          <strong>Administrator</strong>
          <span>CRM Workspace</span>
        </div>
      </div>
    </header>
  );
}
