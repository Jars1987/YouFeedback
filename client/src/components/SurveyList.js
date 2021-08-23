import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './../actions';

const SurveyList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchSurveys());
  }, []);

  const surveys = useSelector(state => state.surveys);

  const renderSurveys = () => {
    switch (surveys) {
      case null:
        return <div>You have not started any Campaign yet.</div>;
      case surveys:
        return surveys.reverse().map(survey => {
          return (
            <div className='card blue-grey darken-1' key={survey._id}>
              <div className='card-content'>
                <span className='card-title white-text'>{survey.title}</span>
                <p className='white-text'>{survey.body}</p>
                <p className='right white-text'>
                  Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                </p>
              </div>
              <div className='card-action'>
                <a>Yes: {survey.yes} </a>
                <a>No : {survey.no} </a>
              </div>
            </div>
          );
        });
    }
  };

  return <div>{renderSurveys()}</div>;
};

export default SurveyList;
