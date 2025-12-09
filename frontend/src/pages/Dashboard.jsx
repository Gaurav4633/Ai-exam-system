import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const [data, setData] = useState({ stats: [], ai_analysis: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/dashboard')
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching dashboard data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-5">Loading Dashboard...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Performance Dashboard</h2>

      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-info">
            <div className="card-header bg-info text-white">AI Overall Analysis</div>
            <div className="card-body">
              <p className="card-text fs-5">{data.ai_analysis}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card shadow mb-4">
            <div className="card-header">Accuracy History</div>
            <div className="card-body" style={{ height: '400px' }}>
              {data.stats.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.stats}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="accuracy" fill="#0d6efd" name="Accuracy (%)" />
                    <Bar dataKey="score" fill="#198754" name="Score" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center pt-5">No quiz history available yet.</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-header">Recent Activity</div>
            <ul className="list-group list-group-flush">
              {data.stats.slice(-5).reverse().map((stat, idx) => (
                <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>{stat.subject}</span>
                  <span className="badge bg-primary rounded-pill">{stat.score}/{stat.total}</span>
                </li>
              ))}
              {data.stats.length === 0 && <li className="list-group-item">No activity yet.</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
