// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: "", mobile: "", email: "" });
  const [editingContactId, setEditingContactId] = useState(null); // Track which contact is being edited
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const userId = JSON.parse(atob(token.split(".")[1])).userId;
        const response = await axios.get(`https://sampleloginapp-backend.vercel.app/api/contacts/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setContacts(response.data);
      } catch (error) {
        alert("Failed to load contacts.");
      }
    };
    fetchContacts();
  }, [token]);

  // Add a new contact
  const handleAddOrUpdateContact = async (e) => {
    e.preventDefault();
    try {
      const userId = JSON.parse(atob(token.split(".")[1])).userId;

      if (editingContactId) {
        // Update existing contact
        await axios.put(
          `https://sampleloginapp-backend.vercel.app/api/contacts/${editingContactId}`,
          { ...form, userId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setContacts(
          contacts.map((contact) =>
            contact._id === editingContactId ? { ...contact, ...form } : contact
          )
        );
        alert("Contact updated successfully!");
      } else {
        // Add new contact
        const response = await axios.post(
          "https://sampleloginapp-backend.vercel.app/api/contacts",
          { ...form, userId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setContacts([...contacts, response.data]);
        alert("Contact added successfully!");
      }

      setForm({ name: "", mobile: "", email: "" });
      setEditingContactId(null); // Clear editing state
    } catch (error) {
      alert("Failed to save contact.");
    }
  };

  // Edit contact
  const handleEdit = (contact) => {
    setForm({ name: contact.name, mobile: contact.mobile, email: contact.email });
    setEditingContactId(contact._id);
  };

  // Delete contact
  const handleDelete = async (contactId) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await axios.delete(`https://sampleloginapp-backend.vercel.app/api/contacts/${contactId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setContacts(contacts.filter((contact) => contact._id !== contactId));
        alert("Contact deleted successfully!");
      } catch (error) {
        alert("Failed to delete contact.");
      }
    }
  };

  return (
    <>
    <Navbar/>
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2 className="text-center mb-4">Dashboard</h2>
        <form onSubmit={handleAddOrUpdateContact} className="mb-3">
          <div className="form-group mb-2">
            <input
              name="name"
              className="form-control"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="form-group mb-2">
            <input
              name="mobile"
              className="form-control"
              placeholder="Mobile"
              value={form.mobile}
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            />
          </div>
          <div className="form-group mb-2">
            <input
              name="email"
              className="form-control"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {editingContactId ? "Update Contact" : "Add Contact"}
          </button>
        </form>
        <div>
          <h5>Your Contacts</h5>
          {contacts.map((contact) => (
            <div key={contact._id} className="d-flex justify-content-between align-items-center mb-2 p-2 border rounded">
              <div>
                <p>
                  <strong>{contact.name}</strong> - {contact.mobile} - {contact.email}
                </p>
              </div>
              <div>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(contact)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(contact._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
