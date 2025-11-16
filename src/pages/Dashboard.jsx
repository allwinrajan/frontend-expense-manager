// Dashboard page placeholder
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const Dashboard = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get(`${API_BASE}/expenses/summary`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setSummary(res.data))
      .catch(() => setSummary(null));
  }, []);

  if (!summary) return <div>Loading analytics...</div>;

  return (
    <div className="dashboard-grid">
      <div className="card">
        <h3>Total Budget</h3>
        <p>₹ {summary.total_budget.toFixed(2)}</p>
      </div>
      <div className="card">
        <h3>Total Spent</h3>
        <p>₹ {summary.total_expenses.toFixed(2)}</p>
      </div>
      <div className="card">
        <h3>Remaining</h3>
        <p>₹ {summary.remaining.toFixed(2)}</p>
      </div>
      <div className="card">
        <h3>Expenses Count</h3>
        <p>{summary.expense_count}</p>
      </div>

      <div className="card card-full">
        <h3>Latest Expenses</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {summary.latest_expenses.map(exp => (
              <tr key={exp.id}>
                <td>{exp.date}</td>
                <td>{exp.name}</td>
                <td>{exp.category}</td>
                <td>₹ {Number(exp.amount).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
