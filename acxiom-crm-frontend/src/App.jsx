import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Leads from "./pages/Leads";
import FollowUps from "./pages/FollowUps";
import Opportunities from "./pages/Opportunities";
import Activities from "./pages/Activities";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import AuditLogs from "./pages/AuditLogs";

import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/follow-ups" element={<FollowUps />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/users" element={<Users />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/audit-logs" element={<AuditLogs />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}