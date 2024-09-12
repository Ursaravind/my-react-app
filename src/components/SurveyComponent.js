import React, { useState, useEffect } from 'react';
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.css';
import { Model } from 'survey-core';

function SurveyComponent() {
  const [surveyData, setSurveyData] = useState(null);
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    // Generate or retrieve the session ID
    const storedSessionId = localStorage.getItem('session-id');
    if (!storedSessionId) {
      const newSessionId = new Date().getTime();
      localStorage.setItem('session-id', newSessionId);
      setSessionId(newSessionId);
    } else {
      setSessionId(storedSessionId);
    }
  }, []);

  const surveyJSON = {
    title: "Customer Feedback Survey",
    pages: [
      {
        name: "page1",
        elements: [
          {
            type: "rating",
            name: "satisfaction_products",
            title: "How satisfied are you with our products?",
            minRateDescription: "Not Satisfied",
            maxRateDescription: "Very Satisfied",
            rateValues: [1, 2, 3, 4, 5]
          }
        ]
      },
      {
        name: "page2",
        elements: [
          {
            type: "rating",
            name: "fair_prices",
            title: "How fair are the prices compared to similar retailers?",
            minRateDescription: "Very Unfair",
            maxRateDescription: "Very Fair",
            rateValues: [1, 2, 3, 4, 5]
          }
        ]
      },
      {
        name: "page3",
        elements: [
          {
            type: "rating",
            name: "value_for_money",
            title: "How satisfied are you with the value for money of your purchase?",
            minRateDescription: "Not Satisfied",
            maxRateDescription: "Very Satisfied",
            rateValues: [1, 2, 3, 4, 5]
          }
        ]
      },
      {
        name: "page4",
        elements: [
          {
            type: "rating",
            name: "recommendation",
            title: "On a scale of 1-10 how would you recommend us to your friends and family?",
            minRateDescription: "Not at All Likely",
            maxRateDescription: "Extremely Likely",
            rateValues: Array.from({ length: 10 }, (_, i) => i + 1)
          }
        ]
      },
      {
        name: "page5",
        elements: [
          {
            type: "comment",
            name: "improvement",
            title: "What could we do to improve our service?"
          }
        ]
      }
    ],
    showQuestionNumbers: "on",
    showProgressBar: "top",
    showPrevButton: true,  // Enable previous question button
    showNavigationButtons: true, // Enable navigation buttons
    allowCompleteSurveyAutomatically: false,
    completedHtml: "<h4>Thank you for your feedback!</h4>",
    clearInvisibleValues: "none"  // Allow skipping questions without clearing previous answers
  };

  const surveyModel = new Model(surveyJSON);

  // Event when the survey is completed
  surveyModel.onComplete.add((result) => {
    localStorage.setItem(`survey-${sessionId}`, JSON.stringify(result.data));
    localStorage.setItem('survey-status', 'COMPLETED');
    setSurveyData(result.data);
    setSurveyCompleted(true);

    // Show the thank you screen for 5 seconds, then redirect to the welcome screen
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  });

  // Confirmation before submitting the survey
  surveyModel.onComplete.add((result, options) => {
    const confirmed = window.confirm("Are you sure you want to submit the survey?");
    if (!confirmed) {
      options.allowComplete = false;
    }
  });

  return (
    <div className="survey-container">
      {surveyCompleted ? (
        <div>
          <h2>Thank you for your feedback!</h2>
          <p>You will be redirected to the welcome screen shortly...</p>
        </div>
      ) : (
        <Survey model={surveyModel} />
      )}
    </div>
  );
}

export default SurveyComponent;
