# Use uma imagem base para Node.js
FROM node:16

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos necessários
COPY package.json package-lock.json ./ 

# Instale as dependências
RUN npm install

# Copie todo o restante do código para o contêiner
COPY . .

# Construa o projeto para produção
RUN npm run build

# Instale um servidor simples para servir o aplicativo
RUN npm install -g serve

# Exponha a porta onde o servidor será executado
EXPOSE 5173

# Comando para rodar o servidor
CMD ["npx", "vite", "--host", "0.0.0.0", "--port", "5173"]
