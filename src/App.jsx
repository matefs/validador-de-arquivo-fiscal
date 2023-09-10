import { useState } from 'react';
import './App.css';
import ExtractFieldsFromLinesComponent from './components/ExtractFieldsFromLinesComponent';
import UploadForm from './components/UploadForm';

function App() {
  const [uploadedTextFile, setUploadedTextFile] = useState();
  return (
    <div>
      <ExtractFieldsFromLinesComponent uploadedTextFile={uploadedTextFile} />
      <br />
      {}
      <UploadForm
        uploadedTextFile={uploadedTextFile}
        setUploadedTextFile={setUploadedTextFile}
      />
    </div>
  );
}

export default App;
