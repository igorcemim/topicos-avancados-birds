// Carrega variável de ambiente com o caminho das credenciais
require('dotenv').config()

const path = require('path');
const fs = require('fs');
const vision = require('@google-cloud/vision');

async function app() {
  // Score mínimo para que o objeto possa ser identificado como pássaro
  const BIRD_MIN_SCORE = 0.85;
  // Nome do label que estamos procurando
  const BIRD_LABEL_DESCRIPTION = 'bird';
  // Pasta onde vamos procurar as imagens
  const BIRD_IMAGES_DIR = '../resources';

  const imagesList = [];

  const directoryPath = path.join(__dirname, BIRD_IMAGES_DIR);
  
  const filesInsideDirectory = fs.readdirSync(directoryPath);
  
  // Percorre o diretório colocando as imagens na lista para serem processadas
  filesInsideDirectory.forEach(function (file) {
    const fullPath = directoryPath + '/' + file;
    imagesList.push(fullPath);
  });

  // Criação de uma instância do client
  const client = new vision.ImageAnnotatorClient();

  // Caminho da imagem
  for (const imagePath of imagesList) {

    // Realiza o reconhecimento de labels na imagem
    const [result] = await client.labelDetection(imagePath);

    console.log('-------------------------')
    console.log('Caminho da imagem: ' + imagePath);

    var isBird = false;

    // Percorremos os labels identificados pela API procurando por "bird" e verificando o score atingido
    result.labelAnnotations.forEach(label => {
      if (BIRD_LABEL_DESCRIPTION == label.description.toLowerCase() && label.score >= BIRD_MIN_SCORE) {
        isBird = true;
        console.log('É um pássaro :D')
      }
    });

    if (!isBird) {
      console.log('Não é um pássaro :(')
    }
  }
}

app();
