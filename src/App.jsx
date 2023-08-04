import { useState, useEffect } from 'react';
import './App.css';
import ExampleComponent from './components/ExampleComponent';
import UploadForm from './components/UploadForm';

function App() {
  const [uploadedTextFile, setUploadedTextFile] = useState();
  return (
    <div>
      <ExampleComponent uploadedTextFile={uploadedTextFile} />
      <UploadForm uploadedTextFile={uploadedTextFile} />
    </div>
  );
}

export default App;
