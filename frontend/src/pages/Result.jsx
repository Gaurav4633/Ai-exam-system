import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function Result() {
  const location = useLocation();
  const { result } = location.state || {};

  if (!result) return <div className="text-center mt-5">No result data available.</div>;

  return (
    <div className="container mt-5 text-center">
      <div className="card shadow-lg">
        <div className="card-body">
          <h1 className="text-success mb-4">Quiz Completed!</h1>
          
          <div className="row justify-content-center">
            <div className="col-md-4">
              <div className="card bg-light mb-3 border-primary">
                <div className="card-body">
                  <h5>🎯 Score</h5>
                  <h2 className="display-4 text-primary fw-bold">{result.score}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-light mb-3 border-info">
                <div className="card-body">
                  <h5>📊 Accuracy</h5>
                  <h2 className="display-4 text-info fw-bold">{result.accuracy.toFixed(1)}%</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="alert alert-secondary mt-3">
            <h4>AI Feedback</h4>
            <p className="lead">{result.feedback}</p>
          </div>

          <div className="mt-4">
            <Link to="/" className="btn btn-primary me-2">Take Another Quiz</Link>
            <Link to="/dashboard" className="btn btn-outline-secondary">Go to Dashboard</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
