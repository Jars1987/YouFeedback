import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import SurveyField from './SurveyField';
import { surveyFormSchema } from '../schemas';
import { reviewSurvey } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const SurveyForm = props => {
  const [validateField, setValidateField] = useState(false);
  const dispatch = useDispatch();
  const survey = useSelector(state => state.survey);
  return (
    <>
      <h1>Create your Survey!</h1>
      <Formik
        initialValues={{
          title: survey ? survey.title : '',
          subject: survey ? survey.subject : '',
          body: survey ? survey.body : '',
          recipients: survey ? survey.recipients : ''
        }}
        validationSchema={surveyFormSchema}
        validateOnChange={validateField}
        onSubmit={values => {
          setValidateField(false);
          dispatch(reviewSurvey(values));
          props.showReviewForm();
        }}>
        <Form>
          <SurveyField
            label='Campaign Title'
            name='title'
            type='text'
            placeholder=''
          />
          <SurveyField
            label='Email Subject'
            name='subject'
            type='text'
            placeholder=''
          />
          <SurveyField
            label='Email Body'
            name='body'
            type='text'
            placeholder=''
          />
          <SurveyField
            label='Email Recipients'
            name='recipients'
            type='text'
            placeholder=''
          />
          <Link to='/surveys' className='red btn-flat left white-text'>
            Cancel
          </Link>
          <button className='teal btn-flat right white-text' type='submit'>
            Submit <i className='material-icons right'>done</i>
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default SurveyForm;
