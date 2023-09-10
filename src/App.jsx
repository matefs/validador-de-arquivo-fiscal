import { useState } from 'react';
import './App.css';
import ExtractFieldsFromLinesComponent from './components/ExtractFieldsFromLinesComponent';
import UploadForm from './components/UploadForm';
import LineInstructionsForm from './components/LineInstructionsForm';

function App() {
  const [uploadedTextFile, setUploadedTextFile] = useState();
  const [showLineInstructionsFormBoolean, setShowLineInstructionsFormBoolean] = useState(false)

  const [lineInstructions, setLineInstructions] = useState([
    {
      startLine: 1,
      endLine: 1,
      fields: [
        { name: 'Company Name', startPos: 1, endPos: 27 },
        { name: 'Fiscal Year', startPos: 28, endPos: 31 },
      ],
    },
    {
      startLine: 2,
      endLine: 10,
      fields: [
        { name: 'Campo 1 ao 8', startPos: 1, endPos: 8 },
        { name: 'Another Field', startPos: 8, endPos: 28 },
      ],
    },
  ]);

  return (
    <div>
      <ExtractFieldsFromLinesComponent 
      lineInstructions={lineInstructions} 
      uploadedTextFile={uploadedTextFile}
      />
      <br />
      {}
      <UploadForm
        uploadedTextFile={uploadedTextFile}
        setUploadedTextFile={setUploadedTextFile} 
      />
      {showLineInstructionsFormBoolean && <LineInstructionsForm lineInstructions={lineInstructions}  setLineInstructions={setLineInstructions} />}
    </div>
  );
}

export default App;
