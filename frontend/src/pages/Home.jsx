import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [subject, setSubject] = useState('Math');
  const [difficulty, setDifficulty] = useState('Medium');
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate(`/quiz?subject=${subject}&difficulty=${difficulty}`);
  };

  return (
    <div className="container mt-5">
      <div className="card text-center shadow">
        <div className="card-header bg-primary text-white">
          <h2>Welcome to AI Exam Practicing System</h2>
        </div>
        <div className="card-body">
          <h5 className="card-title">Select your preferences to start practicing</h5>
          <p className="card-text">Our AI will generate questions based on your choice.</p>
          
          <div className="row justify-content-center mt-4">
            <div className="col-md-4">
              <label className="form-label">Subject</label>
              <select className="form-select" value={subject} onChange={(e) => setSubject(e.target.value)}>
                <option value="Math">Math</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="General">General Knowledge</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Difficulty</label>
              <select className="form-select" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <button className="btn btn-success btn-lg mt-4" onClick={startQuiz}>
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
