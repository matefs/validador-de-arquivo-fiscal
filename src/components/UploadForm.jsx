import React from "react";
import { Card } from "antd";

export default function UploadForm({ uploadedTextFile, setUploadedTextFile }) {
  function carregarArquivoTexto(event) {
    const arquivo = event.target.files[0];
    const leitor = new FileReader();

    leitor.onload = function (evento) {
      const conteudo = evento.target.result;
      setUploadedTextFile(conteudo); // Atualiza o estado com o conteúdo do arquivo
      console.log(uploadedTextFile);
    };

    leitor.readAsText(arquivo);
  }

  return (
    <Card>
      <input
        type="file"
        id="inputArquivo"
        onChange={carregarArquivoTexto}
        style={{ padding: "3%" }}
      />
    </Card>
  );
}
