import React, { Component} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import './App.css';

import Home from './Components/Home.js'
import About from './Components/About.js'

class App extends Component {

  render() {
    return (
      <BrowserRouter>
      <Routes>
          <Route path="/about" element={<About />}>
          </Route>
          <Route path="/" element={<Home />}>
          </Route>
        </Routes>
        </BrowserRouter>
    );
  }

  
}

export default App;
