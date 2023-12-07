# Pet Lovers - Backend

## Descrição do Projeto

O **Pet Lovers** é uma plataforma inovadora desenvolvida para proporcionar aos amantes de animais uma experiência intuitiva e eficiente no cuidado de seus pets. Esta plataforma permite que os usuários registrem informações importantes sobre seus companheiros de quatro patas, tenham acesso a uma carteirinha virtual para o controle de medicações, exames, vacinas e até mesmo para o registro do último banho do bichinho. :dog2:

Além disso, a plataforma oferece uma galeria onde os usuários podem compartilhar fotos representativas de momentos especiais com seus pets, permitindo o download dessas imagens a qualquer momento. Para garantir um cuidado excepcional, o Pet Lovers conta com um sistema de alertas por e-mail, lembrando os usuários de doses de reforço, medicamentos e outros cuidados essenciais para seus animais de estimação.

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

### 📋 Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- Node.js
- npm

## Databases

Por padrão, o modelo está configurado para se conectar a um banco de dados MongoDB usando o Mongoose.

Além disso, é necessário criar um arquivo `.env` na raiz do projeto e configurar as variáveis de ambiente. Veja um exemplo abaixo.

- MONGO_URI
- JWT_SECRET
- JWT_LIFETIME
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET


### 🔧 Instalação

1. Clone o repositório:

- git clone https://github.com/GuilhermeEstevan/PetLovers---Backend.git

2. Instale as dependências:

- npm install

3. Inicie o servidor de desenvolvimento:

- npm run dev

O servidor estará disponível em http://localhost:3000.

## 🛠️ Construído com

- [Express](https://expressjs.com/) - Framework web para Node.js
- [TypeScript](https://www.typescriptlang.org/) - Superset do JavaScript
- [MongoDB](https://www.mongodb.com/) - Banco de dados NoSQL
- [Cloudinary](https://cloudinary.com/) - Plataforma de gerenciamento de imagens na nuvem

## 🚀 Hospedagem

Este servidor está hospedado na [Amazon EC2](https://aws.amazon.com/ec2/), parte dos serviços de nuvem da [AWS](https://aws.amazon.com/).


