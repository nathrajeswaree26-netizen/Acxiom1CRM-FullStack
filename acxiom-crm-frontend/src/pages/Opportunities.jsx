
import React from "react";
import "../style/Opportunities.css";

export default function Opportunities() {
  const opportunities = [
    {
      id: 1,
      name: "Website Development",
      customer: "ABC Technologies",
      value: "₹50,000",
      stage: "Proposal",
      status: "Open",
    },
    {
      id: 2,
      name: "CRM Implementation",
      customer: "XYZ Solutions",
      value: "₹75,000",
      stage: "Negotiation",
      status: "Open",
    },
    {
      id: 3,
      name: "Software Upgrade",
      customer: "Global Systems",
      value: "₹30,000",
      stage: "Qualified",
      status: "Open",
    },
  ];

  return (
    <div className="opportunities-page">
      <div className="opportunities-header">
        <div>
          <h1>Sales Opportunities</h1>
          <p>Track potential deals and monitor your sales pipeline.</p>
        </div>

        <button
          className="opportunity-add-button"
          onClick={() =>
            alert("Connect this button to your Add Opportunity form.")
          }
        >
          + Add Opportunity
        </button>
      </div>

      <div className="opportunity-summary">
        <div className="opportunity-card">
          <p>Total Opportunities</p>
          <h2>{opportunities.length}</h2>
        </div>

        <div className="opportunity-card">
          <p>Open Opportunities</p>
          <h2>{opportunities.filter((item) => item.status === "Open").length}</h2>
        </div>

        <div className="opportunity-card">
          <p>Total Pipeline Value</p>
          <h2>₹1,55,000</h2>
        </div>
      </div>

      <div className="opportunity-table-container">
        <h2>Opportunity List</h2>

        <table className="opportunity-table">
          <thead>
            <tr>
              <th>Opportunity</th>
              <th>Customer</th>
              <th>Deal Value</th>
              <th>Stage</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {opportunities.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.customer}</td>
                <td>{item.value}</td>
                <td>{item.stage}</td>
                <td>
                  <span className="opportunity-status">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
