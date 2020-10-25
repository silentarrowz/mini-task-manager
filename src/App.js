import React from 'react';
import Main from './Main';
import { AppProvider } from './context';
import './App.css';

function App() { 
  return (
    <AppProvider>
      <div className="App">
        <Main/>      
      </div>
    </AppProvider>
  );
}

export default App;
