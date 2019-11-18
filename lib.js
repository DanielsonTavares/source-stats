const fs = require('fs');
const readLine = require('readline');

/**
 * Retorna um array contendo o nome de cada arquivo encontrado no 'path' informado
 * @param {String} path Diretório de onde serão listados os arquivos encontrados
 * @returns  A array of full path file names
 * @author dotDeveloper
 */
function readFiles (path) {
  if (path === undefined || path === '') {
    throw new Error('Path not found in readFiles function');
  }

  if (!path.endsWith('/')) {
    path += '/';
  }

  let lista = [];
  const result = [];

  lista = fs.readdirSync(path).filter(f => {
    return fs.statSync(path + f).isFile();
  });

  lista.forEach(e => {
    result.push(path + e);
  });

  return result;
}
/**
 * Read the file in path parameter and return a Json object
 * @param {String} path the path file
 */
async function processaArquivo (path) {
  const f = fs.createReadStream(path);
  const rl = readLine.createInterface(f, { crlfDelay: Infinity });
  let lineCount = 0;
  let avgSizeLine = 0;
  const lineSizeList = [];

  for await (const line of rl) {
    lineSizeList.push(line.length);
    lineCount++;
  }

  avgSizeLine =
    lineSizeList.reduce((a, b) => {
      return a + b;
    }, 0) / lineSizeList.length;

  return { path, lineCount, avgSizeLine };
}

function insereLinha (string, clearFile = false) {
  if (clearFile) {
    fs.unlinkSync('stats.log');
  }

  fs.appendFileSync('stats.log', string);
}

module.exports = { readFiles, processaArquivo, insereLinha };
