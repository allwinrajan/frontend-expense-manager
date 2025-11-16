// Expenses page placeholder
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    id: null,
    date: '',
    name: '',
    category: '',
    amount: '',
    description: ''
  });

  const token = localStorage.getItem('token');

  const fetchExpenses = () => {
    axios
      .get(`${API_BASE}/expenses`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setExpenses(res.data));
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () =>
    setForm({ id: null, date: '', name: '', category: '', amount: '', description: '' });

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {
      date: form.date,
      name: form.name,
      category: form.category,
      amount: Number(form.amount),
      description: form.description
    };
    if (form.id) {
      axios
        .put(`${API_BASE}/expenses/${form.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
          resetForm();
          fetchExpenses();
        });
    } else {
      axios
        .post(`${API_BASE}/expenses`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
          resetForm();
          fetchExpenses();
        });
    }
  };

  const handleEdit = exp => {
    setForm({
      id: exp.id,
      date: exp.date,
      name: exp.name,
      category: exp.category,
      amount: exp.amount,
      description: exp.description || ''
    });
  };

  const handleDelete = id => {
    axios
      .delete(`${API_BASE}/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => fetchExpenses());
  };

  return (
    <div>
      <h2>Expenses</h2>
      <form className="inline-form" onSubmit={handleSubmit}>
        <input type="date" name="date" value={form.date} onChange={handleChange} />
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />
        <input
          name="amount"
          placeholder="Amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <button className="btn-primary" type="submit">
          {form.id ? 'Update' : 'Add'}
        </button>
        {form.id && (
          <button className="btn-secondary" type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Description</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {expenses.map(exp => (
            <tr key={exp.id}>
              <td>{exp.date}</td>
              <td>{exp.name}</td>
              <td>{exp.category}</td>
              <td>₹ {Number(exp.amount).toFixed(2)}</td>
              <td>{exp.description}</td>
              <td>
                <button onClick={() => handleEdit(exp)}>Edit</button>
                <button onClick={() => handleDelete(exp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Expenses;
