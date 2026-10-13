
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/customers";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: ""
  });
  const [message, setMessage] = useState("");

  async function loadCustomers() {
    try {
      const response = await axios.get(API_URL);
      setCustomers(response.data);
    } catch (error) {
      setMessage("Could not load customers. Check that the backend is running.");
    }
  }

  useEffect(() => {
    loadCustomers();
  }, []);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    try {
      await axios.post(API_URL, form);
      setForm({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        address: ""
      });
      setMessage("Customer added successfully!");
      await loadCustomers();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Could not add customer. Check required fields and unique email/phone."
      );
    }
  }

  async function deleteCustomer(id) {
    if (!window.confirm("Delete this customer?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setMessage("Customer deleted successfully.");
      await loadCustomers();
    } catch {
      setMessage("Could not delete customer.");
    }
  }

  return (
    <main style={{ maxWidth: 1000, margin: "30px auto", padding: 20 }}>
      <h1>AcxiomCRM — Customers</h1>
      <p>Manage your customer records.</p>

      {message && <p role="status">{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="companyName"
          placeholder="Company name"
          value={form.companyName}
          onChange={handleChange}
          required
        />
        <input
          name="contactPerson"
          placeholder="Contact person"
          value={form.contactPerson}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />
        <button type="submit">Add Customer</button>
      </form>

      <h2>Customer List ({customers.length})</h2>

      {customers.length === 0 ? (
        <p>No customers added yet.</p>
      ) : (
        <table cellPadding="10" border="1">
          <thead>
            <tr>
              <th>Company</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.companyName}</td>
                <td>{customer.contactPerson}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.address}</td>
                <td>
                  <button onClick={() => deleteCustomer(customer.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
