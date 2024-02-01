const handlePDFExport = (url) => {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.blob();
    })
    .then(blob => {
      // Cria um link temporário
      const link = document.createElement('a');
      // Cria uma URL temporária para o Blob
      const url = window.URL.createObjectURL(blob);
      // Define o link para a URL do Blob
      link.href = url;
      // Define o nome do arquivo desejado
      const fileName = "Contrato_Cliente_Proposta_" + new Date().toISOString() + ".pdf";
      // Define o atributo de download com o nome do arquivo
      link.setAttribute('download', fileName);
      // Adiciona o link ao DOM
      document.body.appendChild(link);
      // Clica no link para iniciar o download
      link.click();
      // Remove o link do DOM
      document.body.removeChild(link);
      // Revoga a URL do Blob para liberar recursos
      window.URL.revokeObjectURL(url);
    })
    .catch(error => console.error('Error downloading file:', error));
};
