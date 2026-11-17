# Parte 1 · Base, login e painel

**Arquivos:** `index.html`, `telas/dashboard.html`, `assets/css/base.css`, `assets/js/dados.js`, `assets/js/layout.js`, `assets/img/logo.svg`, `README.md`, `docs/parte-1-base.md`

Esta parte é a fundação: as outras três dependem dela, então ela vai pro GitHub **primeiro**.

## O que entrega

- **Identidade visual** (`base.css`): azul-marinho, laranja e turquesa, as mesmas cores do Backlog e da SWOT do grupo. Cartões, tabelas, botões, badges de status, barras, modal e avisos que todas as telas reaproveitam. Todo texto passa no contraste mínimo de acessibilidade (4,5:1).
- **Tema escuro por padrão** (quem opera render farm trabalha em sala de edição com pouca luz) e tema claro no botão de sol/lua do topo; a escolha fica salva. As telas só usam variáveis de cor, nunca cor fixa, por isso funcionam nos dois temas.
- **Tira de frames** (`RT.ui.tira`): a assinatura visual do produto. O progresso de um job aparece como uma película, cada célula é um trecho de frames (turquesa = pronto, laranja pulsando = renderizando, âmbar = pausado, vermelho = erro, verde = concluído). Usada no Painel, na Fila e no Detalhe do job.
- **Menu e topo** (`layout.js`): menu lateral agrupado (Visão geral, Renderização, Operação, Gestão), nome e perfil do usuário, contador de alertas e botão de sair. No celular o menu vira gaveta.
- **Permissões por perfil** (`layout.js`): cada tela declara quais perfis podem vê-la. O menu esconde o que o perfil não pode usar e, se a pessoa abrir o link direto, aparece "Acesso restrito".
- **Dados simulados** (`dados.js`): estações, jobs, projetos, alertas, usuários, chaves, consumo e backups fictícios, salvos no navegador para as ações "durarem" entre as telas.

## Telas

### Login (`index.html`) · história 01
- Entrada com e-mail e senha; recusa e-mail não cadastrado, usuário desativado e senha inválida.
- **Modo demonstração**: escolhe um perfil e entra com as permissões dele (útil na apresentação).
- *Critério atendido:* "permite acesso com credenciais válidas".

### Painel (`telas/dashboard.html`)
- Indicadores: jobs renderizando, GPUs locais e da nuvem em uso, horas de GPU e custo do mês.
- Lista de jobs em andamento e na fila, alertas recentes e resumo das estações.
- Atalhos e links mudam conforme o perfil (Editor não vê custos, Programador vê as chaves de API etc.).
