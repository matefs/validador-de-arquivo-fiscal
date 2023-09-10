import React, { useState, useEffect } from 'react';
import LineInstructionsForm from './LineInstructionsForm';
import { Typography, Card } from 'antd';
const { Title } = Typography;


function ExtractFieldsFromLinesComponent({ lineInstructions={}, uploadedTextFile=''}) {
 
  const [extractedData, setExtractedData] = useState([]);
  const [showLineInstructionsFormBoolean, setShowLineInstructionsFormBoolean] = useState(false)

  // Function to extract fields based on line instructions
    function extractFieldsFromLine(lineNumber, line) {
      const extractedFields = [];
      lineInstructions.forEach((instruction) => {
        if (
          lineNumber >= instruction.startLine &&
          lineNumber <= instruction.endLine
        ) {
          instruction.fields.forEach((field) => {
            const fieldValue = line.slice(field.startPos - 1, field.endPos);
            extractedFields.push({
              name: field.name,
              value: fieldValue,
            });
          });
        }
      });
      return extractedFields;
    }

  useEffect(() => {

    // Process the tax file data
    const lines = uploadedTextFile.split('\n');
    const extractedData = lines.map((line, index) => {
      return extractFieldsFromLine(index + 1, line);
    });

    setExtractedData(extractedData);
  }, [lineInstructions, uploadedTextFile]);

  // Create an object to hold grouped fields
  const groupedFields = {};
  extractedData.forEach((fields) => {
    fields.forEach((field) => {
      const instructionName = field.name;
      if (!groupedFields[instructionName]) {
        groupedFields[instructionName] = [];
      }
      groupedFields[instructionName].push(field.value);
    });
  });

  return (
    <div>
      <Card>
        <Title>
          Verifique a Validade dos Campos no Arquivo Consolidado por Instruções
        </Title>
        {uploadedTextFile !== '' ? (
          <table border={0} style={{minWidth: '80vw'}}>
            <thead>
              <tr>
                <th>Instrução</th>
                <th>Posicões</th>
                <th>Campo</th>
              </tr>
            </thead>
            <tbody>
              {lineInstructions.map((instruction, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td
                      colSpan={3}
                      style={{ backgroundColor: 'rgba(255,255,255,.1)' }}
                    >
                      <strong>
                        Linhas {instruction.startLine}-{instruction.endLine}
                      </strong>
                    </td>
                  </tr>

                  {instruction.fields.map((field, fieldIndex) => (
                    <tr key={fieldIndex}>
                      <td style={{ padding: '20px' }}>{field.name}</td>
                      <td>
                        {field.startPos} até {field.endPos}
                      </td>
                      <td
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.00)',
                          display: 'flex',
                          flexDirection: 'column',
                          marginTop: '2%',
                          borderCollapse: 'separate',
                          borderSpacing: 0,
                        }}
                      >
                        {groupedFields[field.name] ? (
                          <span>
                            {groupedFields[field.name].map((value, index) => (
                              <span
                                key={index}
                                style={{
                                  backgroundColor: `rgba(${Math.floor(
                                    Math.random() * 100
                                  )}, ${
                                    index * Math.floor(Math.random() * 100)
                                  }, 255,0.06)`, // Adjust color generation as needed
                                  margin: '.2em .5em', // Adding some spacing between items
                                  padding: '2px 5px',
                                  display: 'inline-block',
                                  borderRadius: '10px',
                                }}
                                title={`Numero sequencial: ${index}`}
                              >
                                {value}
                              </span>
                            ))}
                          </span>
                        ) : (
                          'N/A'
                        )}
 
                  </td>
 
                    </tr>
 
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        ) : (
          ''
        )}
      </Card>

    </div>
  );
}

export default ExtractFieldsFromLinesComponent;
