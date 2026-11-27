#  GeoPoint Front — Gerenciador de Pontos Geográficos

Aplicação web para cadastrar, consultar, editar e excluir pontos geográficos (locais com nome, descrição e coordenadas). Tudo conversa com uma API REST pronta, e cada ponto pode ser visto num mapa direto na tela de detalhes.

##  Aluno

- **[Eduardo Buzin Sebben / ra: 1139353]**


## 🛠️ Tecnologia escolhida

- **React 19**: construção da interface em componentes
- **Vite**: ambiente de desenvolvimento e build
- **React Router**: navegação entre as telas, sem recarregar a página
- **Fetch API**: comunicação com a API (sem biblioteca extra)
- **OpenStreetMap**: mapa incorporado na tela de detalhe
- **Oxlint**: verificação de qualidade do código

## 🌐 API utilizada

**GeoPoint API**

```
https://geopoint-6x4u.onrender.com/api/points
```

| Ação | Método | Rota |
|------|--------|------|
| Listar todos os pontos | `GET` | `/api/points` |
| Buscar um ponto | `GET` | `/api/points/:id` |
| Cadastrar | `POST` | `/api/points` |
| Editar | `PUT` | `/api/points/:id` |
| Excluir | `DELETE` | `/api/points/:id` |

Cada ponto tem os campos `name`, `description`, `latitude` e `longitude`.

> ⏳ A API está hospedada num plano gratuito do Render, então a **primeira requisição pode demorar alguns segundos** enquanto o servidor "acorda". Se a lista demorar a carregar, é só aguardar.

## ▶️ Como rodar o projeto

**Pré-requisitos:** [Node.js](https://nodejs.org/) (versão 18 ou superior) e npm.

```bash
# 1. Baixe o projeto e entre na pasta
cd trabalhoFront-main

# 2. Instale as dependências
npm install

# 3. Instale o React Router (usado na navegação)
npm install react-router-dom

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Depois, abra no navegador o endereço que o terminal mostrar (normalmente `http://localhost:5173`).

Outros comandos úteis:

| Comando | O que faz |
|---------|-----------|
| `npm run build` | Gera a versão de produção na pasta `dist/` |
| `npm run preview` | Visualiza localmente a versão de produção |
| `npm run lint` | Verifica o código com o Oxlint |

## ✨ O que a aplicação faz

- **Listagem:** mostra todos os pontos numa tabela, com nome, descrição e coordenadas, além do total de registros.
- **Filtro:** campo de pesquisa que filtra a lista na hora, buscando pelo nome ou pela descrição.
- **Cadastro:** formulário para criar um novo ponto, com validação (nome obrigatório de até 100 caracteres, descrição de até 255, latitude entre -90 e 90, longitude entre -180 e 180).
- **Detalhe:** exibe todas as informações do ponto e um mapa do OpenStreetMap com a localização.
- **Edição:** o mesmo formulário do cadastro, já preenchido, para atualizar um ponto existente.
- **Exclusão:** botão na listagem, com confirmação antes de apagar.
- **Feedback ao usuário:** indicador de carregamento, mensagens de erro claras e uma tela amigável para quando não há resultados ou a página não existe.

## 🖼️ Telas do sistema

### Listagem
![Tela de listagem](docs/prints/listagem.png)

### Filtro
![Tela de filtro](docs/prints/filtro.png)

### Cadastro
![Tela de cadastro](docs/prints/cadastro.png)

### Detalhe
![Tela de detalhe](docs/prints/detalhe.png)

### Edição
![Tela de edição](docs/prints/edicao.png)

## 🗂️ Estrutura do projeto

```
src/
├── components/   # Peças reutilizáveis (tabela, busca, formulário, avisos, navegação)
├── pages/        # Uma página para cada tela (listagem, cadastro, detalhe, edição, 404)
├── services/
│   └── api.js    # Todas as chamadas à GeoPoint API ficam centralizadas aqui
├── App.jsx       # Definição das rotas
└── main.jsx      # Ponto de entrada da aplicação
```

### Rotas

| Rota | Tela |
|------|------|
| `/pontos` | Listagem com filtro |
| `/pontos/novo` | Cadastro |
| `/pontos/:id` | Detalhe |
| `/pontos/:id/editar` | Edição |
