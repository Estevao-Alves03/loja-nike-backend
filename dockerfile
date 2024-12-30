# Use a imagem base do Node.js
FROM node:18

# Define o diretório de trabalho
WORKDIR /app-backend

# Copie os arquivos necessários
COPY package.json pnpm-lock.yaml ./

# Instale as dependências
RUN npm install -g pnpm && pnpm install

# Copie o restante do projeto
COPY . .

# Compile o TypeScript
RUN pnpm build

# Exponha a porta
EXPOSE 3001

# Inicie o servidor
CMD ["node", "build/server.js"]
