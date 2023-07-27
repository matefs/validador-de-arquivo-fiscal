import { useState, useEffect } from 'react';
import './App.css';
import ExampleComponent from './components/ExampleComponent';
import UploadForm from './components/UploadForm';

function App() {
  return (
    <div>
      <ExampleComponent />
      <UploadForm />
    </div>
  );
}

export default App;
