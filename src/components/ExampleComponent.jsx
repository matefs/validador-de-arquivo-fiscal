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

  return (
    <div>
      {uploadedTextFile !== ''
        ? extractedData.map((data, index) => (
            <div key={index}>
              {data.map((field) => (
                <p key={field.name}>
                  {field.name}: {field.value}
                </p>
              ))}
            </div>
          ))
        : ''}
    </div>
  );
}

export default ExampleComponent;
