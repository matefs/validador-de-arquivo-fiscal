export function validateFiscalFile({}) {
  // Obter as linhas do arquivo
  const linhas = arquivoAFDT.split('\n');

  const primeiraLinha = linhas[0];
  const ultimaLinha = linhas[linhas.length - 1];

  // Todas linhas entre a primeira e a última linha
  const linhasIntermediarias = linhas.slice(1, -1);

  return <> </>;
}
