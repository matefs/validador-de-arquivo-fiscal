import React, { useState, useEffect } from 'react';
import './ExampleComponent.css';

function ExampleComponent({ uploadedTextFile = '' }) {
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

  const [extractedData, setExtractedData] = useState([]);

  useEffect(() => {
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
      <div>
        <h2>Campos Reunidos por Instrução</h2>
        {uploadedTextFile !== '' ? (
          <table border={0}>
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
                                  borderRadius: '10px'
                                }}
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
      </div>
    </div>
  );
}

export default ExampleComponent;
