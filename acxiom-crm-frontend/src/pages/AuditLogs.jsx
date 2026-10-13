
import { useEffect, useState } from "react";
import { Search, RefreshCw } from "lucide-react";
import api from "../api";
import "../style/AuditLogs.css";

export default function AuditLogs() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [action, setAction] = useState("All");
  const [error, setError] = useState("");

  async function load() {
    try {
      const r = await api.get("/audit-logs");
      setItems(Array.isArray(r.data) ? r.data : []);
      setError("");
    } catch {
      setError("Unable to load audit logs. Check GET /api/audit-logs.");
    }
  }

  useEffect(() => { load(); }, []);

  const actions = [...new Set(items.map(x => x.action).filter(Boolean))];

  const filtered = items.filter(x => {
    const text = [x.username, x.action, x.entityType, x.entityId, x.details]
      .some(v => String(v ?? "").toLowerCase().includes(search.toLowerCase()));
    return text && (action === "All" || x.action === action);
  });

  return (
    <section className="audit-page">
      <div className="audit-heading">
        <div><h2>Audit Logs</h2><p>Review recorded changes across your CRM.</p></div>
        <button className="audit-secondary" onClick={load}><RefreshCw size={16} /> Refresh</button>
      </div>

      <div className="audit-summary">
        <div><span>Total events loaded</span><strong>{items.length}</strong></div>
        <div><span>Actions represented</span><strong>{actions.length}</strong></div>
      </div>

      {error && <p className="audit-error">{error}</p>}

      <div className="audit-toolbar">
        <label><Search size={17} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search user, action or record..." /></label>
        <select aria-label="Filter audit action" value={action} onChange={e => setAction(e.target.value)}>
          <option>All</option>{actions.map(a => <option key={a}>{a}</option>)}
        </select>
      </div>

      <div className="audit-table-wrap">
        <table className="audit-table">
          <thead><tr><th>Timestamp</th><th>User</th><th>Action</th><th>Entity</th><th>Record ID</th><th>Details</th></tr></thead>
          <tbody>
            {filtered.length === 0
              ? <tr><td colSpan="6" className="audit-empty">No audit events found.</td></tr>
              : filtered.map((x, i) => <tr key={x.id ?? i}>
                <td data-label="Timestamp">{x.timestamp ? new Date(x.timestamp).toLocaleString() : x.createdAt ? new Date(x.createdAt).toLocaleString() : "—"}</td>
                <td data-label="User">{x.username || "System"}</td>
                <td data-label="Action"><span className="audit-action">{x.action || "—"}</span></td>
                <td data-label="Entity">{x.entityType || "—"}</td>
                <td data-label="Record ID">{x.entityId ?? "—"}</td>
                <td data-label="Details">{x.details || "—"}</td>
              </tr>)
            }
          </tbody>
        </table>
      </div>
    </section>
  );
}
