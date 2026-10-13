import React from "react";
import "../style/Dashboard.css";

export default function Dashboard() {
  const stats = [
    { title: "Total Customers", value: "0", description: "Registered customers" },
    { title: "Total Leads", value: "0", description: "Potential customers" },
    { title: "Open Opportunities", value: "0", description: "Active sales opportunities" },
    { title: "Pending Follow-ups", value: "0", description: "Tasks to follow up" },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome to Acxiom CRM. Here's your business overview.</p>
        </div>
        <span className="dashboard-date">
          {new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>

      <div className="dashboard-stats">
        {stats.map((stat) => (
          <div className="dashboard-stat-card" key={stat.title}>
            <p className="stat-title">{stat.title}</p>
            <h2>{stat.value}</h2>
            <p className="stat-description">{stat.description}</p>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <section className="dashboard-panel">
          <h2>Welcome to Acxiom CRM</h2>
          <p>
            Manage customers, track leads, schedule follow-ups, monitor sales
            opportunities, and review team activities from one place.
          </p>
        </section>

        <section className="dashboard-panel">
          <h2>CRM Modules</h2>
          <ul className="dashboard-module-list">
            <li>Customer Management</li>
            <li>Lead Management</li>
            <li>Follow-up Management</li>
            <li>Sales Opportunities</li>
            <li>Activities and Reports</li>
            <li>User Management and Audit Logs</li>
          </ul>
        </section>
      </div>
    </div>
  );
}