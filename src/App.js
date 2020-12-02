import React from 'react';
import {Route, Switch} from 'react-router';
import NoMatch from "./pages/NoMatch";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import './style.css';
import root from "./helpers/SampleRoute";

const App = () => {

   const [routes, setRoutes] = React.useState([{path: '/'}]);

   React.useEffect(() => {
      routeGenerator(root);
   }, []);

   const routeGenerator = (root, path) => {
      if (root.type === 'dir') {
         let routeNames = root?.children;
         Object.keys(routeNames)?.forEach((item) => {
            let newPath = `${path ? path : ''}/${item}`;
            let newRouteName = {path: newPath};
            setRoutes(routes => [...routes, newRouteName]);
            routeGenerator(root.children[item], newPath);
         });
      }
   };

   return (
      <Layout>
         <Switch>
            {routes.map((item) => {
               return <Route key={Math.random.toString()} path={item.path} component={() => <Home />}/>
            })}
            <Route path="*" component={NoMatch} />
         </Switch>
      </Layout>
   );
};

export default App;
