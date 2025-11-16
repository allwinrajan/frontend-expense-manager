// Budget page placeholder
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const Budget = () => {
  const [budgets, setBudgets] = useState([]);
  const [form, setForm] = useState({ id: null, title: '', total_limit: '' });

  const token = localStorage.getItem('token');

  const fetchBudgets = () => {
    axios
      .get(`${API_BASE}/budgets`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setBudgets(res.data));
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => setForm({ id: null, title: '', total_limit: '' });

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {
      title: form.title,
      total_limit: Number(form.total_limit)
    };
    if (form.id) {
      axios
        .put(`${API_BASE}/budgets/${form.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
          resetForm();
          fetchBudgets();
        });
    } else {
      axios
        .post(`${API_BASE}/budgets`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
          resetForm();
          fetchBudgets();
        });
    }
  };

  const handleEdit = budget => {
    setForm({ id: budget.id, title: budget.title, total_limit: budget.total_limit });
  };

  const handleDelete = id => {
    axios
      .delete(`${API_BASE}/budgets/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => fetchBudgets());
  };

  return (
    <div>
      <h2>Budget</h2>
      <form className="inline-form" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Budget title"
          value={form.title}
          onChange={handleChange}
        />
        <input
          name="total_limit"
          placeholder="Total limit"
          value={form.total_limit}
          onChange={handleChange}
          type="number"
        />
        <button className="btn-primary" type="submit">
          {form.id ? 'Update' : 'Create'}
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
            <th>Title</th>
            <th>Total Limit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map(b => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>₹ {Number(b.total_limit).toFixed(2)}</td>
              <td>
                <button onClick={() => handleEdit(b)}>Edit</button>
                <button onClick={() => handleDelete(b.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Budget;
