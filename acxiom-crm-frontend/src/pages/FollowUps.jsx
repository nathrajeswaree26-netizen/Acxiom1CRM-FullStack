
import { useEffect, useState } from "react";
import { Plus, Search, RefreshCw } from "lucide-react";
import api from "../api";
import "../style/FollowUps.css";

const blank = {
  title: "",
  contactName: "",
  dueDate: "",
  status: "Planned",
  notes: "",
};
const statuses = ["Planned", "Completed", "Missed", "Cancelled"];

export default function FollowUps() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  async function load() {
    try {
      const r = await api.get("/follow-ups");
      setItems(Array.isArray(r.data) ? r.data : []);
      setError("");
    } catch {
      setError("Unable to load follow-ups. Check GET /api/follow-ups.");
    }
  }

  useEffect(() => { load(); }, []);

  const filtered = items.filter(x =>
    [x.title, x.contactName, x.notes, x.status]
      .some(v => String(v || "").toLowerCase().includes(search.toLowerCase()))
  );

  function edit(item) {
    setEditing(item.id);
    setForm({
      title: item.title || "",
      contactName: item.contactName || "",
      dueDate: item.dueDate || "",
      status: item.status || "Planned",
      notes: item.notes || "",
    });
    setOpen(true);
  }

  async function save(e) {
    e.preventDefault();
    if (form.dueDate < new Date().toLocaleDateString("en-CA")) {
      setError("Please choose today or a future date.");
      return;
    }
    try {
      if (editing) await api.put(`/follow-ups/${editing}`, form);
      else await api.post("/follow-ups", form);
      setOpen(false);
      setEditing(null);
      setForm(blank);
      await load();
    } catch {
      setError("Could not save follow-up. Check the backend API.");
    }
  }

  async function remove(item) {
    if (!window.confirm(`Delete follow-up "${item.title}"?`)) return;
    try {
      await api.delete(`/follow-ups/${item.id}`);
      await load();
    } catch {
      setError("Could not delete follow-up.");
    }
  }

  return (
    <section className="follow-page">
      <div className="follow-heading">
        <div><h2>Follow-up Planner</h2><p>Schedule and track customer follow-ups.</p></div>
        <button className="follow-primary" onClick={() => {
          setEditing(null); setForm(blank); setOpen(!open);
        }}><Plus size={17} /> Schedule follow-up</button>
      </div>

      <div className="follow-stats">
        {statuses.map(s => <div key={s}><span>{s}</span><strong>{items.filter(x => x.status === s).length}</strong></div>)}
      </div>

      {open && <form className="follow-form" onSubmit={save}>
        <label>Title *<input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></label>
        <label>Contact name *<input required value={form.contactName} onChange={e => setForm({ ...form, contactName: e.target.value })} /></label>
        <label>Due date *<input required type="date" min={new Date().toLocaleDateString("en-CA")} value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} /></label>
        <label>Status<select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>{statuses.map(s => <option key={s}>{s}</option>)}</select></label>
        <label className="follow-notes">Notes<textarea rows="2" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} /></label>
        <div className="follow-form-actions">
          <button type="button" className="follow-secondary" onClick={() => setOpen(false)}>Cancel</button>
          <button className="follow-primary">Save</button>
        </div>
      </form>}

      {error && <p className="follow-error">{error}</p>}
      <div className="follow-toolbar">
        <label><Search size={17} /><input placeholder="Search follow-ups..." value={search} onChange={e => setSearch(e.target.value)} /></label>
        <button className="follow-secondary" onClick={load}><RefreshCw size={15} /> Refresh</button>
      </div>

      <div className="follow-table-wrap"><table className="follow-table">
        <thead><tr><th>Follow-up</th><th>Contact</th><th>Due date</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>{filtered.length === 0 ? <tr><td colSpan="5" className="follow-empty">No follow-ups found.</td></tr> : filtered.map(x =>
          <tr key={x.id}>
            <td data-label="Follow-up"><strong>{x.title}</strong><small>{x.notes}</small></td>
            <td data-label="Contact">{x.contactName}</td>
            <td data-label="Due date">{x.dueDate}</td>
            <td data-label="Status"><select value={x.status} onChange={async e => {
              try { await api.put(`/follow-ups/${x.id}`, { ...x, status: e.target.value }); await load(); }
              catch { setError("Could not update status."); }
            }}>{statuses.map(s => <option key={s}>{s}</option>)}</select></td>
            <td data-label="Actions"><button className="follow-edit" onClick={() => edit(x)}>Edit</button> <button className="follow-delete" onClick={() => remove(x)}>Delete</button></td>
          </tr>
        )}</tbody>
      </table></div>
    </section>
  );
}
