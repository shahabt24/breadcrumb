import React from 'react';
import {Route, Switch} from 'react-router';
import NoMatch from "./pages/NoMatch";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import './style.css';

const App = () => {

   return (
      <Layout>
         <Switch>
            <Route path='/' exact={true} component={(props) => <Home {...props} key={window.location.pathname} />}/>
            <Route path='/:url' component={(props) => <Home {...props} key={window.location.pathname} />}/>
            <Route path="*" component={NoMatch} />
         </Switch>
      </Layout>
   );
};

export default App;
