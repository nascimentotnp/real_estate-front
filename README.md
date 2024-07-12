# gestao-master-front

# Coccina DiTrento

Este é o repositório do projeto Coccina DiTrento, uma aplicação de pedidos de pizza. A aplicação permite que os usuários façam login, registrem-se, façam pedidos de pizza, e visualizem suas compras.

## Estrutura do Projeto

O projeto está estruturado em componentes React e utiliza serviços para autenticação e gerenciamento de usuários.

## Pré-requisitos

- Node.js (v14 ou superior)
- npm (v6 ou superior)

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/nascimentotnp/real_estate-front.git
   cd coccina-ditrento
Instale as dependências:
bash
Copiar código
npm install
Executando a Aplicação
Inicie o servidor de desenvolvimento:

bash
Copiar código
npm start
Abra seu navegador e acesse http://localhost:3000.

Usuários de Teste
Você pode usar os seguintes usuários para fazer login na aplicação:

Usuário Comum
Username: usuario
Password: senha123
Email: usuario1@email.com
Role: user
Administrador
Username: admin
Password: senha456
Email: usuario2@email.com
Role: admin
Funcionalidades
Login e Registro: Os usuários podem se registrar e fazer login na aplicação.
Pedidos de Pizza: Os usuários podem selecionar pizzas, escolher tamanhos e bordas, e fazer pedidos.
Histórico de Compras: Os usuários podem visualizar suas compras realizadas.
Autenticação: A aplicação utiliza um serviço de autenticação (AuthService) para gerenciar login, logout e registro de usuários.
Componentes Principais
Formulary: Componente para fazer pedidos de pizza. Inclui cálculo de preço e validação de formulário.
BoardUser: Componente para exibir o histórico de compras do usuário.
BoardAdmin: Componente para funcionalidades administrativas (em desenvolvimento).
Login: Componente de login utilizando Formik e Yup para validação de formulário.
Register: Componente de registro utilizando Formik e Yup para validação de formulário.
Navegação
A navegação na aplicação é gerenciada pelo React Router. As principais rotas incluem:

/: Página inicial (Landing)
/login: Página de login
/registrar: Página de registro
/profile: Página de perfil do usuário
/compras: Página de histórico de compras do usuário
/admin: Página administrativa (acessível apenas para administradores)
/sobre: Página sobre a pizzaria
/plans: Página de planos e ofertas
/pizzas: Página de listagem de pizzas
/pizza/:id: Página de formulário de pedido de pizza
Notificações
A aplicação utiliza a biblioteca react-toastify para exibir notificações de sucesso e erro.

Histórico
Este projeto foi desenvolvido como parte de um sistema de pedidos de pizza para a pizzaria DiTrento. O nome DiTrento é originado da província de Trento, na Itália, de onde a família dos proprietários emigrou para o Brasil no século 19.

Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

markdown
Copiar código

### Detalhes Adicionais

1. **Login e Registro:** 
    - **Login:** O componente de login utiliza `Formik` e `Yup` para a validação de formulário e está integrado com o `AuthService` para autenticação.
    - **Registro:** O componente de registro também utiliza `Formik` e `Yup` para validação de formulário e permite criar novos usuários.

2. **Pedidos de Pizza:** 
    - **Formulário de Pedidos:** O formulário de pedidos permite selecionar o tamanho da pizza, adicionar borda recheada e escolher o sabor da borda. O preço é calculado dinamicamente com base nas seleções do usuário.

3. **Histórico de Compras:** 
    - **Visualização de Compras:** O componente `BoardUser` exibe apenas as compras realizadas pelo usuário logado, filtrando com base no `userId`.

4. **Autenticação e Permissões:**
    - **Níveis de Permissão:** O sistema implementa níveis de permissão para usuários, moderadores e administradores, controlando o acesso a diferentes partes da aplicação.

Este README deve fornecer uma visão geral clara do seu projeto e ajudar outros desenvolvedores a entender