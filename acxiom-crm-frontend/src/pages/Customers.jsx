
import { useEffect, useMemo, useState } from "react";
import { Search, Plus, Pencil, Trash2, X, RefreshCw } from "lucide-react";
import api from "../api";
import "../style/Customers.css";

const emptyForm = {
  companyName: "",
  contactPerson: "",
  email: "",
  phone: "",
  address: "",
};

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function loadCustomers() {
    setLoading(true);
    setError("");
    try {
      const response = await api.get("/customers");
      setCustomers(Array.isArray(response.data) ? response.data : []);
    } catch {
      setError("Could not load customers. Check the Spring Boot backend.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCustomers();
  }, []);

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();
    return customers.filter((customer) =>
      [
        customer.companyName,
        customer.contactPerson,
        customer.email,
        customer.phone,
      ].some((value) => String(value || "").toLowerCase().includes(query))
    );
  }, [customers, search]);

  function openAdd() {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
    setModalOpen(true);
  }

  function openEdit(customer) {
    setForm({
      companyName: customer.companyName || "",
      contactPerson: customer.contactPerson || "",
      email: customer.email || "",
      phone: customer.phone || "",
      address: customer.address || "",
    });
    setEditingId(customer.id);
    setError("");
    setModalOpen(true);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (editingId !== null) {
        await api.put(`/customers/${editingId}`, form);
      } else {
        await api.post("/customers", form);
      }
      setModalOpen(false);
      await loadCustomers();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Save failed. Check the required fields and unique email/phone."
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteCustomer(customer) {
    if (!window.confirm(`Delete ${customer.companyName}?`)) return;
    setError("");
    try {
      await api.delete(`/customers/${customer.id}`);
      await loadCustomers();
    } catch {
      setError("Delete failed. The customer may be referenced by another record.");
    }
  }

  return (
    <section className="customers-page">
      <div className="customers-heading">
        <div>
          <h2>Customer Directory</h2>
          <p>Manage your company's customer records.</p>
        </div>
        <button className="crm-primary-btn" onClick={openAdd}>
          <Plus size={18} /> Add Customer
        </button>
      </div>

      <div className="customer-stats">
        <div><span>Total customers</span><strong>{customers.length}</strong></div>
        <div><span>Matching records</span><strong>{filtered.length}</strong></div>
      </div>

      <div className="customer-toolbar">
        <label className="customer-search">
          <Search size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search company, contact, email or phone..."
          />
        </label>
        <button className="crm-secondary-btn" onClick={loadCustomers}>
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {error && !modalOpen && <p className="crm-error">{error}</p>}

      <div className="customer-table-card">
        <div className="customer-table-wrap">
          <table className="customer-table">
            <thead>
              <tr>
                <th>Company</th><th>Contact person</th><th>Email</th>
                <th>Phone</th><th>Address</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" className="customer-empty">Loading customers...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan="6" className="customer-empty">No customers found.</td></tr>
              ) : filtered.map((customer) => (
                <tr key={customer.id}>
                  <td data-label="Company"><strong>{customer.companyName}</strong></td>
                  <td data-label="Contact">{customer.contactPerson}</td>
                  <td data-label="Email">{customer.email}</td>
                  <td data-label="Phone">{customer.phone}</td>
                  <td data-label="Address">{customer.address || "—"}</td>
                  <td data-label="Actions">
                    <div className="customer-actions">
                      <button title="Edit" aria-label="Edit customer" onClick={() => openEdit(customer)}>
                        <Pencil size={16} />
                      </button>
                      <button title="Delete" aria-label="Delete customer" className="delete-action" onClick={() => deleteCustomer(customer)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="customer-table-footer">
          Showing {filtered.length} of {customers.length} customers
        </div>
      </div>

      {modalOpen && (
        <div className="crm-modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setModalOpen(false);
        }}>
          <form className="crm-modal" onSubmit={handleSubmit}>
            <div className="crm-modal-heading">
              <div>
                <h3>{editingId !== null ? "Edit Customer" : "Add Customer"}</h3>
                <p>Enter the customer information below.</p>
              </div>
              <button type="button" className="modal-close" onClick={() => setModalOpen(false)} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            {error && <p className="crm-error">{error}</p>}

            <div className="customer-form-grid">
              <label>Company name *
                <input required maxLength="150" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} />
              </label>
              <label>Contact person *
                <input required maxLength="100" value={form.contactPerson} onChange={(e) => setForm({ ...form, contactPerson: e.target.value })} />
              </label>
              <label>Email *
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </label>
              <label>Phone *
                <input required type="tel" maxLength="20" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </label>
              <label className="customer-address-field">Address
                <textarea maxLength="500" rows="3" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
              </label>
            </div>

            <div className="crm-modal-actions">
              <button type="button" className="crm-secondary-btn" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="crm-primary-btn" type="submit" disabled={saving}>
                {saving ? "Saving..." : editingId !== null ? "Save changes" : "Add customer"}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
