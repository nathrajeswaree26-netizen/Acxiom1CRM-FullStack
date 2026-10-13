
import { useEffect, useState } from "react";
import { Download, RefreshCw } from "lucide-react";
import api from "../api";
import "../style/Reports.css";

export default function Reports() {
  const [customers, setCustomers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [report, setReport] = useState("leads");
  const [error, setError] = useState("");

  async function load() {
    try {
      const results = await Promise.all([
        api.get("/customers"),
        api.get("/leads"),
        api.get("/opportunities"),
      ]);
      setCustomers(Array.isArray(results[0].data) ? results[0].data : []);
      setLeads(Array.isArray(results[1].data) ? results[1].data : []);
      setOpportunities(Array.isArray(results[2].data) ? results[2].data : []);
      setError("");
    } catch {
      setError("Some report data could not be loaded. Check that all three APIs are available.");
    }
  }

  useEffect(() => { load(); }, []);

  const rows = report === "customers"
    ? customers.map(x => ({
        ID: x.id, Company: x.companyName, Contact: x.contactPerson,
        Email: x.email, Phone: x.phone,
      }))
    : report === "leads"
    ? leads.map(x => ({
        ID: x.id, Name: x.name, Email: x.email,
        Source: x.source, Status: x.status,
      }))
    : opportunities.map(x => ({
        ID: x.id, Opportunity: x.name, Customer: x.customerName,
        Amount: x.amount, Probability: x.probability, Stage: x.stage,
      }));

  function downloadCsv() {
    if (!rows.length) {
      setError("There are no rows to export.");
      return;
    }

    const columns = Object.keys(rows[0]);
    const escape = value => `"${String(value ?? "").replace(/"/g, '""')}"`;
    const csv = [
      columns.map(escape).join(","),
      ...rows.map(row => columns.map(column => escape(row[column])).join(",")),
    ].join("\r\n");

    const blob = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `acxiomcrm-${report}-report.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="reports-page">
      <div className="reports-heading">
        <div><h2>Reports & Analytics</h2><p>Review and export your CRM records.</p></div>
        <button className="reports-secondary" onClick={load}><RefreshCw size={16} /> Refresh data</button>
      </div>

      <div className="reports-cards">
        <div><span>Total customers</span><strong>{customers.length}</strong></div>
        <div><span>Total leads</span><strong>{leads.length}</strong></div>
        <div><span>Opportunities</span><strong>{opportunities.length}</strong></div>
        <div><span>Won deals</span><strong>{opportunities.filter(x => x.stage === "Won").length}</strong></div>
      </div>

      {error && <p className="reports-error">{error}</p>}

      <div className="reports-panel">
        <div className="reports-toolbar">
          <label>Report type
            <select value={report} onChange={e => setReport(e.target.value)}>
              <option value="leads">Lead report</option>
              <option value="customers">Customer report</option>
              <option value="opportunities">Opportunity report</option>
            </select>
          </label>
          <button className="reports-primary" onClick={downloadCsv}><Download size={16} /> Export CSV</button>
        </div>

        <div className="reports-table-wrap">
          <table className="reports-table">
            <thead><tr>{(rows.length ? Object.keys(rows[0]) : ["No data"]).map(k => <th key={k}>{k}</th>)}</tr></thead>
            <tbody>
              {rows.length === 0
                ? <tr><td className="reports-empty">No records available for this report.</td></tr>
                : rows.map((row, i) => <tr key={row.ID ?? i}>{Object.values(row).map((v, j) => <td key={j}>{v ?? "—"}</td>)}</tr>)
              }
            </tbody>
          </table>
        </div>
        <p className="reports-footnote">{rows.length} records · Export downloads the currently selected report.</p>
      </div>
    </section>
  );
}
