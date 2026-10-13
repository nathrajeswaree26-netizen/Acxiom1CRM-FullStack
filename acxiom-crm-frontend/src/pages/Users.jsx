
import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import api from "../api";
import "../style/Users.css";

const blank = { name: "", email: "", role: "SalesExecutive" };
const roles = ["Admin", "Manager", "SalesExecutive"];

export default function Users() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(blank);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  async function load() {
    try {
      const r = await api.get("/users");
      setItems(Array.isArray(r.data) ? r.data : []);
      setError("");
    } catch { setError("Unable to load users. Check GET /api/users."); }
  }
  useEffect(() => { load(); }, []);

  async function save(e) {
    e.preventDefault();
    try {
      await api.post("/users", form);
      setForm(blank);
      setOpen(false);
      await load();
    } catch { setError("Could not create user. Check the backend endpoint and validation."); }
  }

  async function remove(user) {
    if (!window.confirm(`Delete user ${user.name}?`)) return;
    try { await api.delete(`/users/${user.id}`); await load(); }
    catch { setError("Could not delete user."); }
  }

  const filtered = items.filter(x =>
    [x.name, x.email, x.role].some(v => String(v || "").toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <section className="users-page">
      <div className="users-heading">
        <div><h2>Users & Roles</h2><p>Manage CRM team members and their assigned roles.</p></div>
        <button className="users-primary" onClick={() => setOpen(!open)}><Plus size={17} /> Add user</button>
      </div>

      <div className="users-role-summary">
        {roles.map(role => <div key={role}><span>{role}</span><strong>{items.filter(x => x.role === role).length}</strong></div>)}
      </div>

      {open && <form className="users-form" onSubmit={save}>
        <label>Full name *<input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label>
        <label>Email *<input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></label>
        <label>Role<select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>{roles.map(r => <option key={r}>{r}</option>)}</select></label>
        <div className="users-form-actions"><button type="button" className="users-secondary" onClick={() => setOpen(false)}>Cancel</button><button className="users-primary">Create user</button></div>
      </form>}

      {error && <p className="users-error">{error}</p>}
      <label className="users-search"><Search size={17} /><input placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} /></label>

      <div className="users-table-wrap"><table className="users-table">
        <thead><tr><th>User</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
        <tbody>{filtered.length === 0 ? <tr><td colSpan="4" className="users-empty">No users found.</td></tr> : filtered.map(user =>
          <tr key={user.id}>
            <td data-label="User"><div className="users-person"><span>{(user.name || "?").slice(0, 1).toUpperCase()}</span><strong>{user.name}</strong></div></td>
            <td data-label="Email">{user.email}</td>
            <td data-label="Role"><span className={`user-role role-${String(user.role).toLowerCase()}`}>{user.role}</span></td>
            <td data-label="Actions"><button className="users-delete" onClick={() => remove(user)}>Delete</button></td>
          </tr>
        )}</tbody>
      </table></div>
    </section>
  );
}
