
import { useEffect, useState } from "react";
import { Plus, Search, RefreshCw } from "lucide-react";
import api from "../api";
import "../style/Leads.css";

const statuses = ["New", "Contacted", "Qualified", "Unqualified", "Converted", "Lost"];
const blank = { name: "", email: "", phone: "", source: "Website", status: "New" };

export default function Leads() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(blank);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    try {
      const response = await api.get("/leads");
      setItems(Array.isArray(response.data) ? response.data : []);
      setError("");
    } catch {
      setError("Unable to load leads. Check that GET /api/leads exists.");
    }
  }

  useEffect(() => { load(); }, []);

  const filtered = items.filter((item) => {
    const matchesText = [item.name, item.email, item.phone, item.source]
      .some((v) => String(v || "").toLowerCase().includes(search.toLowerCase()));
    return matchesText && (statusFilter === "All" || item.status === statusFilter);
  });

  async function save(event) {
    event.preventDefault();
    try {
      await api.post("/leads", form);
      setForm(blank);
      setOpen(false);
      await load();
    } catch {
      setError("Could not save lead. Confirm the backend endpoint and required fields.");
    }
  }

  async function changeStatus(item, status) {
    try {
      await api.put(`/leads/${item.id}`, { ...item, status });
      await load();
    } catch {
      setError("Could not update lead status.");
    }
  }

  async function remove(item) {
    if (!window.confirm(`Delete lead ${item.name}?`)) return;
    try {
      await api.delete(`/leads/${item.id}`);
      await load();
    } catch {
      setError("Could not delete lead.");
    }
  }

  return (
    <section className="leads-page">
      <div className="leads-heading">
        <div><h2>Lead Management</h2><p>Track prospects from first contact to conversion.</p></div>
        <button className="leads-primary" onClick={() => { setForm(blank); setOpen(!open); }}>
          <Plus size={17} /> Add Lead
        </button>
      </div>

      <div className="leads-summary">
        <div><span>Total leads</span><strong>{items.length}</strong></div>
        <div><span>Qualified</span><strong>{items.filter(x => x.status === "Qualified").length}</strong></div>
        <div><span>Converted</span><strong>{items.filter(x => x.status === "Converted").length}</strong></div>
      </div>

      {open && (
        <form className="leads-form" onSubmit={save}>
          <label>Lead name *<input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label>
          <label>Email *<input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></label>
          <label>Phone<input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></label>
          <label>Source<select value={form.source} onChange={e => setForm({ ...form, source: e.target.value })}><option>Website</option><option>Referral</option><option>Campaign</option><option>Cold Call</option><option>Other</option></select></label>
          <label>Status<select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>{statuses.map(s => <option key={s}>{s}</option>)}</select></label>
          <div className="leads-form-actions"><button type="button" className="leads-secondary" onClick={() => setOpen(false)}>Cancel</button><button className="leads-primary">Save Lead</button></div>
        </form>
      )}

      {error && <p className="leads-error">{error}</p>}

      <div className="leads-toolbar">
        <label><Search size={17} /><input placeholder="Search leads..." value={search} onChange={e => setSearch(e.target.value)} /></label>
        <select aria-label="Filter by status" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option>All</option>{statuses.map(s => <option key={s}>{s}</option>)}
        </select>
        <button className="leads-secondary" onClick={load}><RefreshCw size={15} /> Refresh</button>
      </div>

      <div className="leads-table-wrap"><table className="leads-table">
        <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Source</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>{filtered.length === 0 ? <tr><td colSpan="6" className="leads-empty">No leads found.</td></tr> : filtered.map(item => (
          <tr key={item.id}>
            <td data-label="Name"><strong>{item.name}</strong></td>
            <td data-label="Email">{item.email}</td><td data-label="Phone">{item.phone || "—"}</td><td data-label="Source">{item.source || "—"}</td>
            <td data-label="Status"><select className={`lead-status status-${String(item.status).toLowerCase()}`} value={item.status} onChange={e => changeStatus(item, e.target.value)}>{statuses.map(s => <option key={s}>{s}</option>)}</select></td>
            <td data-label="Action"><button className="lead-delete" onClick={() => remove(item)}>Delete</button></td>
          </tr>
        ))}</tbody>
      </table></div>
    </section>
  );
}
