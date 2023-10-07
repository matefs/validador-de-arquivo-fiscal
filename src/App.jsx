import { useState } from "react";
import "./App.css";
import ExtractFieldsFromLinesComponent from "./components/ExtractFieldsFromLinesComponent";
import UploadForm from "./components/UploadForm";
import LineInstructionsForm from "./components/LineInstructionsForm";
import { FloatButton,  Modal } from "antd";
import {  QuestionOutlined } from '@ant-design/icons';



function App() {
  const [uploadedTextFile, setUploadedTextFile] = useState();
  const [showLineInstructionsFormBoolean, setShowLineInstructionsFormBoolean] =
    useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [lineInstructions, setLineInstructions] = useState([
    {
      startLine: 1,
      endLine: 1,
      fields: [
        { name: "Nome da empresa", startPos: 1, endPos: 27 },
        { name: "Ano atual", startPos: 28, endPos: 31 },
      ],
    },
    {
      startLine: 2,
      endLine: 10,
      fields: [
        { name: "Campo 1 ao 8", startPos: 1, endPos: 8 },
        { name: "Outro campo", startPos: 8, endPos: 28 },
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


            <FloatButton.Group>
            
                  <FloatButton
        onClick={() => {
          setShowLineInstructionsFormBoolean(!showLineInstructionsFormBoolean);
          showModal();
        }}
      />

      <FloatButton
        onClick={() => {
        
        window.location.href = 'https://www.linkedin.com/pulse/validador-de-arquivos-cnab-240-400-e-fiscais-online-mateus-schverz';

       }}
        icon={<QuestionOutlined />}
      />
        </FloatButton.Group>



      <Modal
        title="Editar intruções do arquivo"
        width={"90%"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <LineInstructionsForm
          lineInstructions={lineInstructions}
          setLineInstructions={setLineInstructions}
        />
      </Modal>
    </div>
  );
}

export default App;
