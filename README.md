# Consulta Emolumentos

O projeto **Consulta Emolumentos** é uma plataforma completa para consulta e comparação de valores de formalização imobiliária entre todos os estados brasileiros. Com ele, é possível comparar custos, economizar tempo e tomar decisões informadas.

## Funcionalidades

* **Consulta de Emolumentos:** Calcule os valores de escritura, registro, ITBI e procuração para um determinado imóvel em qualquer estado do Brasil.
* **Comparação entre Estados:** Compare os custos de formalização de um imóvel entre o estado selecionado e o Distrito Federal.
* **Rankings de Custos:** Visualize rankings dos estados com os emolumentos mais caros e mais baratos para escritura e registro.
* **Links Úteis:** Acesse os portais oficiais de escritura e registro de todos os estados brasileiros.
* **Consulta de Alíquotas de ITBI:** Consulte as alíquotas do Imposto sobre Transmissão de Bens Imóveis (ITBI) por município.

## Tecnologias Utilizadas

* **Frontend:**
    * [React](https://reactjs.org/)
    * [Vite](https://vitejs.dev/)
    * [TypeScript](https://www.typescriptlang.org/)
    * [Tailwind CSS](https://tailwindcss.com/)
    * [shadcn/ui](https://ui.shadcn.com/)
    * [React Router](https://reactrouter.com/)
    * [TanStack Query](https://tanstack.com/query/v4)
    * [Recharts](https://recharts.org/)
* **Backend (BaaS):**
    * [Supabase](https://supabase.io/)

## Começando

Estas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

### Pré-requisitos

* [Node.js](https://nodejs.org/) (versão 18 ou superior)
* [npm](https://www.npmjs.com/)

### Instalação

1.  Clone o repositório:

    ```bash
    git clone [https://github.com/igorr0cha/consulta-emolumentos.git](https://github.com/igorr0cha/consulta-emolumentos.git)
    ```

2.  Navegue até o diretório do projeto:

    ```bash
    cd consulta-emolumentos
    ```

3.  Instale as dependências:

    ```bash
    npm install
    ```

## Variáveis de Ambiente

Para rodar o projeto, você precisará criar um arquivo `.env.local` na raiz do projeto e adicionar as seguintes variáveis de ambiente:
