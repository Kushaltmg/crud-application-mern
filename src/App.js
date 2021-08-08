import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import FormsList from "./components/FormsList";
import EditForm from "./components/EditForm";
import CreateForm from "./components/CreateForm";
import CreateUser from "./components/CreateUser";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <br />
      <Route exact path="/" component={FormsList} />
      <Route path="/edit/:id" component={EditForm} />
      <Route path="/create" component={CreateForm} />
      <Route path="/user" component={CreateUser} />
    </BrowserRouter>
  );
}

export default App;
