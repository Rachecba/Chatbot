import React, { Component } from 'react';
import CB from './components/cb.js'
import './App.css';


class App extends Component {

  render() {

    return (

      <div className="App">
        <div className="header">
          <h1>¡Hola, soy el ChatBot Charlie!</h1>
          <h3>Escríbeme para hablar conmigo</h3>
        </div>
        <div className="mainTheme">
          <CB />
        </div>

      </div>
    );
  }
}

export default App;