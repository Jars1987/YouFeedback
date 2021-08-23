import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Landing from './Landing';
import Header from './Header';
import Dashboard from './Dashboard';
import SurveyNew from './SurveyNew';
import { fetchUser } from '../actions';

const App = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className='container'>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/' component={() => <Landing />} />
          <Route path='/surveys/new' component={() => <SurveyNew />} />
          <Route path='/surveys' exact component={() => <Dashboard />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
