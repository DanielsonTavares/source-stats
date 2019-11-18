const sts = require('./lib');

try {
  console.log('Gerador de estatísticas de códigos fontes');

  let fileList = [];
  // const fileListStats = [];

  fileList = sts.readFiles(
    'D:/Projetos/dotnet/repos/WebAppMVC/WebAppMVC/Models'
  );

  for (const fp of fileList) {
    sts.processaArquivo(fp).then(c => {
      // sts.insereLinha(`${c.path};${c.lineCount};${c.avgSizeLine}\n`);
      sts.insereLinha(
        `${sysdate()}: ${c.path} .......... ${c.lineCount} .......... ${
          c.avgSizeLine
        }\n`
      );
    });
  }
} catch (error) {
  console.log('Sorry: ', error);
}

function sysdate () {
  const now = new Date();
  const secs = now.getSeconds();

  return `${now.getDate()}/${now.getMonth()}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${secs}`;
}
