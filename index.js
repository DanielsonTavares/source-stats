const sts = require('./lib');

try {
  console.log('Gerador de estatísticas de códigos fontes');

  let fileList = [];
  // const fileListStats = [];

  fileList = sts.readFiles('c:/temp/');

  for (const fp of fileList) {
    sts.processaArquivo(fp).then(c => {
      console.log(c);
    });
  }
} catch (error) {
  console.log('Sorry: ', error);
}
