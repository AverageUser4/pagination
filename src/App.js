import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Pagination from './components/Pagination.js';

export default function App() {
  return (
    <Router>

      <Switch>

      <Route path={['/:page', '/']}>
        <Pagination/>
      </Route>

      </Switch>

    </Router>
  )
}
