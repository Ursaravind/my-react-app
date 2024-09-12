
import React, { useState } from 'react';
import SurveyComponent from './components/SurveyComponent';
import './App.css';

const App = () => {
  const [startSurvey, setStartSurvey] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        {!startSurvey ? (
          <div className="welcome-screen">
            <h1>Welcome to Our Customer Feedback </h1>
            <button onClick={() => setStartSurvey(true)}>Start Survey</button>
          </div>
        ) : (
          <SurveyComponent />
        )}
      </header>
    </div>
  );
};

export default App;
