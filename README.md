# Desafio 3 -- E-commerce

## Descrição

Este é um aplicativo criado utilizando React e Tailwind CSS. Ele também usa JSON Server para simular uma API e Zod para validação de formulários.

## Tecnologias Utilizadas

- **React**
- **Tailwind CSS**
- **JSON Server**
- **Firebase Authenticator**
- **Zod**
- **AWS**

## OBSERVAÇÃO

- Toda as imagem e icons do site estão armazenados no bucket s3 da aws.

## Instalação

Para instalar as dependências, execute:

```bash
npm install
json-server --watch db2.json
npm run dev
```

## Estrutura de Pastas

A estrutura de pastas do projeto é a seguinte:

- `src/`
  - `components/`
    - `Header/`
      - `Header.tsx`
    - `Footer/`
      - `Footer.tsx`
    - `bgImageCards/`
      - `ImageCards.tsx`
    - `Certificate/`
      - `QualityCertificate.tsx`
    - `gridProduct/`
      - `... (outros arquivos relacionados ao gridProduct)`
    - `products/`
      - `... (outros arquivos relacionados aos products)`
    - `productRoute/`
      - `... (outros arquivos relacionados ao productRoute)`
    - `slide/`
      - `... (outros arquivos relacionados ao slide)`
    - `tooltipFilter/`
      - `... (outros arquivos relacionados ao tooltipFilter)`
    - `ButtonGroup/`
      - `... (arquivos para os botões do shop [1] [2] [next])`
    - `ButtonShowMore/`
      - `... (arquivos para o botão Show More)`
  - `context/`
    - `... (arquivos de gerenciamento de estado global)`
  - `firebase/`
    - `... (arquivos de autenticação Firebase)`
  - `layout/`
    - `... (arquivos de layout)`
  - `tests/`
    - `... (arquivos de testes)`
  - `zod/`
    - `... (arquivos de validação Zod)`
    - - `pages/`
    - `... (arquivos de todas as pages do site)`
- `app.tsx`
- `main.tsx`
- `index.css` (estilos globais)

## Funcionalidades

- **Autenticação de Usuário**  
  Utiliza o **Firebase Authenticator** para gerenciar o login e registro de usuários. Permite que os usuários se autentiquem de forma segura e acessem áreas restritas do aplicativo.

- **Validação de Formulários**  
  A validação dos dados dos formulários é realizada com **Zod**. Isso garante que os dados inseridos pelo usuário atendam aos critérios específicos antes de serem processados. Por exemplo, o campo de e-mail é validado para garantir que seja um endereço de e-mail válido, e outros campos têm restrições de comprimento mínimo.

- **Gerenciamento de Estado Global**  
  O estado global da aplicação é gerenciado usando a **Context API** do React. Isso permite que diferentes componentes acessem e modifiquem o estado de forma centralizada e consistente. Por exemplo, o estado do carrinho de compras pode ser acessado e atualizado a partir de qualquer componente que precise exibir ou alterar o conteúdo do carrinho.

- **Layout Responsivo**  
  O layout do aplicativo é estilizado com **Tailwind CSS**, garantindo que a interface seja responsiva e adaptável a diferentes tamanhos de tela. Por exemplo, os componentes se reorganizam e ajustam seu tamanho automaticamente para proporcionar uma experiência de usuário otimizada em dispositivos móveis, tablets e desktops.

- **Simulação de API com JSON Server**
  **JSON Server** é utilizado para simular uma API RESTful durante o desenvolvimento. Isso permite que os dados sejam mockados e as interações com a API sejam testadas sem a necessidade de um backend real. A configuração inclui o uso do comando `json-server --watch db2.json` para iniciar o servidor e fornecer dados mockados.

- **Componentes Reutilizáveis**  
  O projeto organiza os componentes de UI em pastas separadas dentro da pasta `components/`, cada um com seu próprio conjunto de arquivos e lógica. Isso promove a reutilização e a manutenção eficiente do código. Por exemplo, o componente `Header` é responsável por exibir o cabeçalho do aplicativo e pode ser reutilizado em diferentes páginas.

- **Testes Automatizados**
- **Ainda em produção de teste (não esta 100% testado)**
  Utiliza **vitest com Jest** para executar testes automatizados e garantir que o código esteja funcionando conforme esperado. Os testes são configurados para verificar o comportamento dos componentes e a lógica de negócios, ajudando a identificar e corrigir problemas rapidamente durante o desenvolvimento.

- **Estilo Global**  
  Os estilos globais são definidos em `index.css`, aplicando uma base consistente de estilos em todo o aplicativo. Isso inclui a configuração de fontes, cores e outras propriedades de estilo que são usadas em todos os componentes.

## Autor

### Lucas Amorim

Olá! Sou Lucas Amorim, o desenvolvedor por trás deste projeto. Tenho experiência em várias tecnologias de desenvolvimento web e sou apaixonado por criar aplicações web elegantes e funcionais. Aqui estão algumas informações sobre mim:

- **Perfil no GitHub**: [Lucas Amorim](https://github.com/amorimsl)  
  No meu perfil do GitHub, você pode encontrar mais projetos e contribuições que fiz. Sinta-se à vontade para explorar meus repositórios e seguir-me para acompanhar meus projetos mais recentes.
