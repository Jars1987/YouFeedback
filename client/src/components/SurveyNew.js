import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SurveyForm from './SurveyForm';
import { reviewSurvey } from '../actions';
import SurveyReview from './SurveyFormReview';

const SurveyNew = () => {
  const dispatch = useDispatch();
  const [showReview, setShowReview] = useState(false);
  const showReviewForm = () => setShowReview(true);

  useEffect(() => {
    return () => {
      dispatch(reviewSurvey(null));
    };
  }, []);

  if (showReview)
    return <SurveyReview setShowReview={() => setShowReview(false)} />;

  return <SurveyForm showReviewForm={showReviewForm} />;
};

export default SurveyNew;
