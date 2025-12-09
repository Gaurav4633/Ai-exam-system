import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Quiz() {
  const [searchParams] = useSearchParams();
  const subject = searchParams.get('subject');
  const difficulty = searchParams.get('difficulty');
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds per quiz for now

  useEffect(() => {
    // Fetch questions
    axios.get(`http://localhost:5000/api/questions?subject=${subject}&difficulty=${difficulty}`)
      .then(res => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching questions:", err);
        setLoading(false);
      });
  }, [subject, difficulty]);

  useEffect(() => {
    if (loading) return;
    if (timeLeft <= 0) {
      submitQuiz();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, loading]);

  const handleNext = () => {
    // Check answer
    if (selectedOption === questions[currentQuestion].correct_answer) {
      setScore(prev => prev + 1);
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption('');
    } else {
      submitQuiz(selectedOption === questions[currentQuestion].correct_answer ? score + 1 : score);
    }
  };

  const submitQuiz = async (finalScore) => {
    const s = finalScore !== undefined ? finalScore : score;
    try {
      const res = await axios.post('http://localhost:5000/api/submit', {
        subject,
        score: s,
        total: questions.length
      });
      navigate('/result', { state: { result: res.data } });
    } catch (err) {
      console.error("Error submitting quiz:", err);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading Questions...</div>;

  if (questions.length === 0) return <div className="text-center mt-5">No questions found.</div>;

  const q = questions[currentQuestion];

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Topic: {subject} ({difficulty})</h4>
        <div className={`badge fs-5 ${timeLeft < 10 ? 'bg-danger' : 'bg-info'}`}>
          Time: {timeLeft}s
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          Question {currentQuestion + 1} of {questions.length}
        </div>
        <div className="card-body">
          <h5 className="card-title">{q.question_text}</h5>
          
          <div className="list-group mt-3">
            {q.options.map((opt, idx) => (
              <button 
                key={idx}
                type="button" 
                className={`list-group-item list-group-item-action ${selectedOption === opt ? 'active' : ''}`}
                onClick={() => setSelectedOption(opt)}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="mt-4 text-end">
            <button 
              className="btn btn-primary" 
              onClick={handleNext}
              disabled={!selectedOption}
            >
              {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
