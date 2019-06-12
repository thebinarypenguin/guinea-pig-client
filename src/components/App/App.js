import React        from 'react';
import Counter      from '../Counter/Counter';
import ServerStatus from '../ServerStatus/ServerStatus';

import './App.css';

function App() {
  return (
    <div className="App">

      <Counter />
      <ServerStatus />
    </div>
  );
}

export default App;
