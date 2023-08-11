import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Router/Router';
import Navbar from './Components/Navbar';

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
