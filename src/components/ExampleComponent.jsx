import React, { useState, useEffect } from 'react';

function ExampleComponent({ uploadedTextFile = '' }) {
  const [lineInstructions, setLineInstructions] = useState([
    {
      startLine: 1,
      endLine: 1,
      fields: [
        { name: 'Company Name', startPos: 7, endPos: 27 },
        { name: 'Fiscal Year', startPos: 28, endPos: 31 },
      ],
    },
    {
      startLine: 2,
      endLine: 3,
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
              value: fieldValue.trim(),
            });
          });
        }
      });
      return extractedFields;
    }

    // Process the tax file data
    const lines = uploadedTextFile.trim().split('\n');
    const extractedData = lines.map((line, index) => {
      return extractFieldsFromLine(index + 1, line);
    });

    setExtractedData(extractedData);


    // You can also update state or perform other actions based on the extractedData here
  }, [lineInstructions, uploadedTextFile]);

 

    // Organizar os campos reunidos conforme as instruções
    const groupedFields = {}; // Adicione esta linha
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
        {/* Exibir campos reunidos por instrução em uma tabela */}
        <div>
          <h2>Campos Reunidos por Instrução</h2>
          {uploadedTextFile !== '' ? (
            <table>
              <thead>
                <tr>
                  <th>Instrução</th>
                  <th>Campo</th>
                  <th>Valores</th>
                </tr>
              </thead>
              <tbody>
                {lineInstructions.map((instruction, index) => (
                  <tr key={index}>
                    <td>
                      <strong>Linhas {instruction.startLine}-{instruction.endLine}</strong>
                    </td>
                    <td>
                      {instruction.fields.map((field, fieldIndex) => (
                        <div key={fieldIndex}>{field.name}</div>
                      ))}
                    </td>
                    <td>
                      {instruction.fields.map((field, fieldIndex) => (
                        <div key={fieldIndex}>
                          {groupedFields[field.name]
                            ? groupedFields[field.name].join(', ')
                            : 'N/A'}
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            ''
          )}
        </div>
      </div>
    );
    
// ...

}

export default ExampleComponent;
