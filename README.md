# Consulta Emolumentos

## 📖 Sobre o Projeto

O **Consulta Emolumentos** é uma plataforma robusta e intuitiva desenvolvida para simplificar a consulta e comparação de valores de formalização imobiliária em todo o Brasil. A ferramenta permite que usuários, como corretores de imóveis, advogados e compradores, possam estimar os custos totais envolvidos na transferência de um imóvel, incluindo escritura, registro, ITBI e procurações.

Além de fornecer uma calculadora detalhada, a plataforma oferece uma análise comparativa dos custos entre o estado selecionado e o Distrito Federal, rankings de emolumentos por estado, e acesso direto às tabelas oficiais e portais governamentais.

---

## ✨ Funcionalidades Principais

* **Calculadora de Emolumentos:** Calcule com precisão os valores de escritura, registro, ITBI e procuração para um imóvel em qualquer estado.
* **Análise Comparativa:** Compare os custos totais da formalização imobiliária entre o estado de sua escolha e o Distrito Federal, identificando oportunidades de economia.
* **Rankings Detalhados:** Acesse rankings atualizados dos estados com os emolumentos mais caros e mais baratos para escritura e registro.
* **Links Oficiais:** Tenha acesso rápido aos portais e tabelas oficiais de emolumentos de todos os estados brasileiros.
* **Consulta de Alíquotas de ITBI:** Pesquise e filtre as alíquotas do Imposto sobre Transmissão de Bens Imóveis (ITBI) por município e estado.
* **Interface Responsiva:** Totalmente adaptado para uso em desktops, tablets e smartphones.

---

## 🚀 Tecnologias Utilizadas

O projeto foi construído com as mais modernas tecnologias do ecossistema JavaScript, garantindo performance, escalabilidade e uma ótima experiência de desenvolvimento.

| Tecnologia      | Descrição                                                              |
| :-------------- | :--------------------------------------------------------------------- |
| **React** | Biblioteca principal para a construção da interface de usuário.        |
| **Vite** | Ferramenta de build extremamente rápida para o desenvolvimento frontend. |
| **TypeScript** | Superset do JavaScript que adiciona tipagem estática ao código.        |
| **Tailwind CSS**| Framework CSS utility-first para estilização rápida e customizável.    |
| **shadcn/ui** | Coleção de componentes de UI reusáveis e acessíveis.                   |
| **Supabase** | Backend como serviço (BaaS) que oferece banco de dados, autenticação e APIs. |
| **React Router**| Para gerenciamento de rotas e navegação na aplicação.                  |
| **TanStack Query**| Gerenciamento de estado assíncrono, cache e sincronização de dados.   |
| **Recharts** | Biblioteca de gráficos para visualização de dados nos rankings.        |

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase"/>
</p>

---

## Link Site:
* [www.consulta-emolumentos](https://consulta-emolumentos.lovable.app)

---

## 🏁 Começando

Siga os passos abaixo para configurar e executar o projeto em seu ambiente de desenvolvimento local.

### Pré-requisitos

* [Node.js](https://nodejs.org/) (versão 18 ou superior)
* [npm](https://www.npmjs.com/) (geralmente vem com o Node.js)

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/igorr0cha/consulta-emolumentos.git](https://github.com/igorr0cha/consulta-emolumentos.git)
    ```

2.  **Navegue até o diretório do projeto:**
    ```bash
    cd consulta-emolumentos
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

### Variáveis de Ambiente

Para que a aplicação se conecte ao Supabase, você precisará criar um arquivo `.env.local` na raiz do projeto e adicionar suas credenciais.

```
VITE_SUPABASE_URL="SUA_SUPABASE_URL"
VITE_SUPABASE_ANON_KEY="SUA_SUPABASE_ANON_KEY"
```

### Executando o Projeto

Com as dependências instaladas e as variáveis de ambiente configuradas, inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em http://localhost:8080.
