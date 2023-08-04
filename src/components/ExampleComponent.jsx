import React, { useState } from 'react';

const ExampleComponent = ({ uploadedTextFile }) => {
  const [instrucoesDosRegistros, setInstrucoesDosRegistros] = useState([
    [
      { tipo: 'numérico', tamanho: 2, conteudo: 'Tipo do registro' },
      { tipo: 'texto', tamanho: 9, conteudo: 'Identificador do REP' },
      { tipo: 'texto', tamanho: 1, conteudo: 'Tipo do REP' },
      { tipo: 'texto', tamanho: 17, conteudo: 'Numero fabricacao' },
    ],
    [
      { tipo: 'numérico', tamanho: 2, conteudo: 'Tipo do registro' },
      { tipo: 'texto', tamanho: 17, conteudo: 'Numero fabricacao' },
    ],
  ]);

  // Função para adicionar uma lista vazia
  const adicionarListaVazia = () => {
    setInstrucoesDosRegistros((prevInstrucoes) => [...prevInstrucoes, []]);
  };

  // Função para adicionar uma nova instrução de registro para um item específico
  const adicionarRegistro = (indiceItem, novoRegistro) => {
    const novasInstrucoes = [...instrucoesDosRegistros];
    novasInstrucoes[indiceItem] = [
      ...novasInstrucoes[indiceItem],
      novoRegistro,
    ];
    setInstrucoesDosRegistros(novasInstrucoes);
  };

  // Função para excluir uma instrução de registro para um item específico
  const excluirRegistro = (indiceItem, indiceRegistro) => {
    const novasInstrucoes = [...instrucoesDosRegistros];
    novasInstrucoes[indiceItem].splice(indiceRegistro, 1);
    setInstrucoesDosRegistros(novasInstrucoes);
  };

  return (
    <div>
      {/* Aqui você pode exibir as instruções de registro em algum componente */}
      {instrucoesDosRegistros.map((item, indiceItem) => (
        <div key={indiceItem}>
          {item.map((registro, indiceRegistro) => (
            <div key={`${indiceItem}-${indiceRegistro}`}>
              <span>{`Tipo: ${registro.tipo}, Tamanho: ${registro.tamanho}, Conteúdo: ${registro.conteudo}`}</span>
              <button
                onClick={() => excluirRegistro(indiceItem, indiceRegistro)}
              >
                Excluir
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              adicionarRegistro(indiceItem, {
                tipo: 'texto',
                tamanho: 10,
                conteudo: 'Nova instrução de registro',
              })
            }
          >
            Adicionar Nova Instrução
          </button>
        </div>
      ))}
      <button onClick={() => adicionarListaVazia()}> adicionar linha </button>
    </div>
  );
};

export default ExampleComponent;
