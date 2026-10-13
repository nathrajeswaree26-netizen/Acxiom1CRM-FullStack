
import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import api from "../api";
import "../style/Activities.css";

const blank = { title: "", type: "Call", contactName: "", activityDate: "", notes: "" };
const types = ["Call", "Email", "Meeting", "Task", "Other"];

export default function Activities() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(blank);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  async function load() {
    try {
      const r = await api.get("/activities");
      setItems(Array.isArray(r.data) ? r.data : []);
      setError("");
    } catch { setError("Could not load activities. Check GET /api/activities."); }
  }
  useEffect(() => { load(); }, []);

  async function save(e) {
    e.preventDefault();
    try {
      await api.post("/activities", form);
      setForm(blank);
      setOpen(false);
      await load();
    } catch { setError("Could not save activity. Check the backend API."); }
  }

  async function remove(item) {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    try { await api.delete(`/activities/${item.id}`); await load(); }
    catch { setError("Could not delete activity."); }
  }

  const filtered = items.filter(x =>
    [x.title, x.type, x.contactName, x.notes].some(v =>
      String(v || "").toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <section className="activities-page">
      <div className="activities-heading">
        <div><h2>Activities</h2><p>Keep a history of customer interactions.</p></div>
        <button className="activities-primary" onClick={() => setOpen(!open)}><Plus size={17} /> Log activity</button>
      </div>

      {open && <form className="activities-form" onSubmit={save}>
        <label>Activity title *<input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></label>
        <label>Type<select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>{types.map(t => <option key={t}>{t}</option>)}</select></label>
        <label>Contact name *<input required value={form.contactName} onChange={e => setForm({ ...form, contactName: e.target.value })} /></label>
        <label>Date *<input required type="date" value={form.activityDate} onChange={e => setForm({ ...form, activityDate: e.target.value })} /></label>
        <label className="activity-notes">Notes<textarea rows="3" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} /></label>
        <div className="activity-form-actions"><button type="button" className="activities-secondary" onClick={() => setOpen(false)}>Cancel</button><button className="activities-primary">Save activity</button></div>
      </form>}

      {error && <p className="activities-error">{error}</p>}

      <label className="activities-search"><Search size={17} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search activity history..." /></label>

      <div className="activities-list">
        {filtered.length === 0 ? <p className="activities-empty">No activities found.</p> : filtered.map(x =>
          <article className="activity-item" key={x.id}>
            <div className="activity-icon">{(x.type || "A").slice(0, 1)}</div>
            <div className="activity-body">
              <h3>{x.title}</h3>
              <p>{x.type} · {x.contactName}</p>
              <span>{x.notes || "No notes added."}</span>
            </div>
            <div className="activity-meta"><time>{x.activityDate}</time><button onClick={() => remove(x)}>Delete</button></div>
          </article>
        )}
      </div>
    </section>
  );
}
