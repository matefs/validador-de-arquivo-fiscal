import { useState, useEffect } from 'react';
import './App.css';
import ExampleComponent from './components/ExampleComponent';
import UploadForm from './components/UploadForm';

function App() {
  const [uploadedTextFile, setUploadedTextFile] = useState();
  return (
    <div>
      <ExampleComponent uploadedTextFile={uploadedTextFile} />
      <br />
      {uploadedTextFile}
      <UploadForm
        uploadedTextFile={uploadedTextFile}
        setUploadedTextFile={setUploadedTextFile}
      />
    </div>
  );
}

export default App;
