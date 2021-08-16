import React, {useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {useDispatch } from 'react-redux';
import Landing from './Landing';
import Header from './Header'; 
import { fetchUser } from '../actions';


const App = (props) => {

  const Dashboard = () => <h2>Dashboardr</h2>
  const SurveyNew = () => <h2>SurveyNew</h2>

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className="container">
      <BrowserRouter >
        <Header />
      <Switch> 
        <Route exact path="/" component={() => <Landing />} />
        <Route path="/survey/new" component={SurveyNew} />
        <Route path="/surveys" exact component={Dashboard} />
       
      </Switch>

      </BrowserRouter>
    </div>
  );
};

export default App;