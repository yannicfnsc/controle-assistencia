# Controle de Assistência Técnica

Aplicativo web responsivo (PWA) baseado no arquivo `ControleAssistencia.jsx`.

## Recursos preservados
- Painel geral
- Programação do dia
- Cadastro de novo chamado
- Busca, filtros e edição rápida de chamados
- Relatórios e gráficos
- Indicadores de SLA
- Dados iniciais importados da planilha
- Salvamento local no navegador (localStorage)

## Rodar no computador
1. Instale Node.js 20 ou superior.
2. Abra a pasta do projeto no terminal.
3. Execute `npm install`.
4. Execute `npm run dev`.
5. Abra o endereço mostrado pelo Vite.

## Gerar versão de produção
Execute `npm run build`. A versão final ficará na pasta `dist`.

## Instalar no Android
Depois de publicar o projeto em um endereço HTTPS, abra no Chrome e use **Adicionar à tela inicial / Instalar app**.

## Dados
Nesta primeira versão os dados ficam armazenados no próprio navegador do aparelho. Para sincronização entre celulares/computadores, a próxima evolução é conectar a um banco de dados (por exemplo Supabase/Firebase).
