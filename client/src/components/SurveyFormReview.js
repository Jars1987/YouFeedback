import React from 'react';
import { withRouter } from 'react-router-dom';
import { submitSurvey } from '../actions';
import { useSelector, useDispatch } from 'react-redux';

// And now we can use these
const SurveyFormReview = props => {
  const dispatch = useDispatch();
  const survey = useSelector(state => state.survey);

  const handleClick = () => props.setShowReview();
  const sendSurvey = () => dispatch(submitSurvey(survey, props.history));

  return (
    <div>
      <h5>Please confirm your entries</h5>
      <div>
        <label>Campaign Title</label>
        <div>{survey.title}</div>
      </div>
      <div>
        <label>Survey Subject</label>
        <div>{survey.subject}</div>
      </div>
      <div>
        <label>Survey Body</label>
        <div>{survey.body}</div>
      </div>
      <div>
        <label>Survey Email Recipients </label>
        <div>{survey.recipients}</div>
      </div>
      <button className='yellow darken-3 btn-flat left' onClick={handleClick}>
        Back
      </button>
      <button className='green btn-flat right white-text' onClick={sendSurvey}>
        Send Survey <i className='material-icons right'>email</i>
      </button>
    </div>
  );
};

export default withRouter(SurveyFormReview);
