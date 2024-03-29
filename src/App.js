import './App.css';
import 'instantsearch.css/themes/satellite.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar"

import Login from './components/Login';
import Kthemployees from './components/Kthemployees';
import Hr from './components/Hr';
import Ugusers from './components/Ugusers';
import Openalex from './components/Openalex';
import useToken from './useToken';

function App() {
  const { token, setToken } = useToken();
  if (!token) {
    return <Login setToken={setToken} />
  }
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kthemployees" element={<Kthemployees />} />
          <Route path="/hr" element={<Hr />} />
          <Route path="/ugusers" element={<Ugusers />} />
          <Route path="/openalex" element={<Openalex />} />
        </Routes>
      </div>
    );
}

function Home() {
  return (
    <>
      <Container>
        <main>
          <NavBar />
          <div className="header"><h4>Sökning i diverse olika index på KTH</h4></div>
          <p>
            Välj ett index och börja söka
          </p>
        </main>
      </Container>
    </>
  );
}

export default App;
