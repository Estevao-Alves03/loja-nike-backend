# Use a imagem base do Node.js
FROM node:18-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app-backend

# Copie os arquivos do package.json e package-lock.json (se existir)
COPY package*.json ./

# Instale o pnpm globalmente
RUN npm install -g pnpm

# Instale as dependências do projeto
RUN pnpm install

# Copie o restante do código para dentro do contêiner
COPY . .

# Exponha a porta do backend
EXPOSE 3000

# Comando padrão para iniciar a aplicação
CMD ["pnpm", "start"]
