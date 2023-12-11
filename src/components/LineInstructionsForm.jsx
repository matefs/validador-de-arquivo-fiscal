import React, { useState } from "react";
import { Input, Form, Button, Card, Typography } from "antd";

function LineInstructionsForm({ lineInstructions, setLineInstructions }) {
  const [startLine, setStart] = useState();
  const [endLine, setEndLine] = useState();
  const [addNewLineEmptyWithFieldsForm] = Form.useForm();

  const [formNewFieldInsideLine] = Form.useForm();
  const [newFieldName, setNewFieldName] = useState("");

  const handleAddField = (lineIndex, newFieldName) => {
    let lineInstructionNameAlreadyExist = lineInstructions[
      lineIndex
    ].fields.some(
      (item) => item.name.toLowerCase() == newFieldName.toLowerCase()
    );

    if (lineInstructionNameAlreadyExist) {
      alert("Nome de campo ja existe");
      return;
    } else {
      const updatedInstructions = [...lineInstructions];
      updatedInstructions[lineIndex].fields.push({
        name: newFieldName,
        startPos: "",
        endPos: "",
      });
      setLineInstructions(updatedInstructions);
    }
  };

  const addLine = (newLine) => {
    newLine.startLine = parseInt(newLine.startLine);
    newLine.endLine = parseInt(newLine.endLine);

    // Verificar se já existe um startLine e endLine iguais aos que estão sendo adicionados
    const lineExists = lineInstructions.some((line) => {
      return (
        line.startLine === newLine.startLine ||
        line.endLine === newLine.endLine ||
        newLine.startLine === line.endLine
      );
    });

    /* Validacao se ja existe ou se inicial é maior que final */
    if (newLine.startLine > newLine.endLine) {
      alert("A linha inicial não pode ser maior que a linha final ");
      return;
    } else {
      if (lineExists) {
        alert("Essa linha já existe.");
        return;
      } else {
        setLineInstructions((prevInstructions) => [
          ...prevInstructions,
          { ...newLine },
        ]);
      }
    }
  };

  const handleSubmit = (values) => {
    if (values.startLine == 0 || values.endLine == 0) {
      alert("A linha inicial ou final não pode ser igual a 0");
    } else {
      const newLine = {
        startLine: values.startLine,
        endLine: values.endLine,
        fields: [],
      };

      addLine(newLine);
      setStart("");
      setEndLine("");
      addNewLineEmptyWithFieldsForm.resetFields();
    }
  };

  const handleFieldInitialFinalPosition = (event) => {
    event.preventDefault();

    let impedirSalvamento = false;

    let posicaoInicial = parseInt(event.target[0].value);
    let posicaoFinal = parseInt(event.target[1].value);
    let indiceLinha = parseInt(event.target[2].value);
    let indiceCampo = parseInt(event.target[3].value);

    const updatedInstructions = [...lineInstructions];
    let nomeCampoIndividual =
      updatedInstructions[indiceLinha].fields[indiceCampo].name;

    updatedInstructions[indiceLinha].fields.forEach((InteractedField) => {
      /* Valida se em outros campos dessa mesma linha já existe essa posição inicial e final  */
      if (InteractedField.name !== nomeCampoIndividual) {
        if (
          InteractedField.startPos === posicaoInicial ||
          InteractedField.endPos === posicaoFinal
        ) {
          alert(
            `Já existe um campo com essa posição inicial ou final no campo ${InteractedField.name}`
          );
          impedirSalvamento = true;
        }
      }
    });

    if (posicaoInicial > posicaoFinal) {
      alert("A posição inicial não pode ser maior do que a final");
      impedirSalvamento = true;
    }

    if (posicaoInicial == 0 || posicaoFinal == 0) {
      impedirSalvamento = true;
      alert("Posição inicial/final não pode ser 0");
    }

    if (impedirSalvamento) {
      alert("Erro: a instrução não foi salva");
    } else {
      updatedInstructions[indiceLinha].fields[indiceCampo].startPos =
        posicaoInicial;
      updatedInstructions[indiceLinha].fields[indiceCampo].endPos =
        posicaoFinal;
      setLineInstructions(updatedInstructions);
      alert("Instrução salva com sucesso!");
    }
  };

  return (
    <Card>
      {/* <pre style={{ position: 'fixed', top: '10px', right: '10px', textShadow: '1px 1px white', zIndex: 999, maxHeight: '80vh', overflow: 'auto' }}>
  {JSON.stringify(lineInstructions, null, 2)}
</pre>
 */}

      <div>
        <h1>Adicionar nova linha</h1>
        <Form
          form={addNewLineEmptyWithFieldsForm}
          onFinish={handleSubmit}
          initialValues={{ startLine: "", endLine: "" }}
        >
          <Form.Item
            label="Começo linha"
            name="startLine"
            rules={[{ required: true, message: "Campo obrigatório" }]}
            defaultValue={""}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Fim linha"
            name="endLine"
            rules={[{ required: true, message: "Campo obrigatório" }]}
            defaultValue={""}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Adicionar
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div>
        {lineInstructions.map((line, lineIndex) => (
          <Card
            style={{ backgroundColor: "rgba(0,0,0,.1)", marginTop: "2%" }}
            key={lineIndex}
          >
            <section style={{ display: "flex", gap: "10px" }}>
              <Typography>
                Linha de início: {line.startLine} | Linha final: {line.endLine}
              </Typography>
              <Button
                type="primary"
                style={{ marginTop: "-0.4%" }}
                danger
                onClick={() => {
                  const updatedInstructions = lineInstructions.filter(
                    (item) =>
                      item.startLine != line.startLine &&
                      item.endLine !== line.endLine
                  );
                  setLineInstructions(updatedInstructions);
                  console.log(updatedInstructions);
                }}
              >
                Remover linha{" "}
              </Button>
            </section>

            {line.fields.map((field, fieldIndex) => (
              <form
                style={{ marginTop: "1%" }}
                key={fieldIndex}
                onSubmit={(event) => handleFieldInitialFinalPosition(event)}
              >
                <Card>
                  <p>Nome do campo: {field.name}</p>
                  <label>
                    Posição inicial:
                    <Input type="number" defaultValue={field.startPos} />
                  </label>
                  <label>
                    Posição final:
                    <Input type="number" defaultValue={field.endPos} />
                  </label>
                  <Input value={lineIndex} style={{ display: "none" }} />
                  <Input value={fieldIndex} style={{ display: "none" }} />
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ margin: "1%" }}
                  >
                    Salvar instruções
                  </Button>
                </Card>
              </form>
            ))}

            <Form
              form={formNewFieldInsideLine}
              onFinish={(values) => {
                handleAddField(lineIndex, values.newFieldName);
                formNewFieldInsideLine.resetFields();
              }}
              initialValues={{ newFieldName: "" }}
              style={{ marginTop: "1%" }}
            >
              <Form.Item name="newFieldName" initialValue={""}>
                <Input type="text" placeholder="Nome do novo campo" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Adicionar novo campo
                </Button>
              </Form.Item>
            </Form>
          </Card>
        ))}
      </div>
    </Card>
  );
}

export default LineInstructionsForm;
