import React from 'react'

import GameTable from './components/GameTable/GameTable'

import logo from './assets/images/logo.png'
import './App.scss'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="App-maincontent">
      	<GameTable />
      </div>
    </div>
  );
}

export default App;
