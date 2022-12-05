# Como executar

## Pré-requisitos
- Node v16+
- Credenciais do Google Cloud Vision

## Instalar as dependências
```
npm install
```

## Configurar credenciais
Copie o arquivo ```.env.dist``` para ```.env``` e configure o caminho para o arquivo com as credenciais do Google Cloud Vision.

### Classificação de imagens:
```
node src/labels.js
```

## Observações
Testado com Node 16.x.x.
