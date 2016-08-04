import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'app/components/App';
import DocumentList from 'app/containers/documents/DocumentList';
import AddDocument from 'app/containers/documents/AddDocument';
import SignUp from 'app/containers/auth/SignUp';
import LogIn from 'app/containers/auth/LogIn';
import NotFound from 'app/components/NotFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={DocumentList} />
    <Route path="/signup" component={SignUp} />
    <Route path="/login" component={LogIn} />
    <Route path="/documents/add" component={AddDocument} />
    <Route path="*" component={NotFound} />
  </Route>
);