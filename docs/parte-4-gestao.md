# Parte 4 · Gestão e integrações

**Arquivos:** `telas/usuarios.html`, `telas/api.html`, `telas/custos.html`, `telas/backups.html`, `docs/parte-4-gestao.md`

As telas de administração, do programador e do gestor do estúdio.

## Usuários e acessos (`telas/usuarios.html`) · história 01

- Tabela da equipe com busca e filtro por perfil; criar, editar, desativar e reativar usuário (com confirmação).
- Ao escolher o perfil, o formulário mostra quais telas ele libera.
- **Matriz de permissões**: o que cada perfil pode fazer, gerada a partir da mesma regra que controla o menu.

*Critérios atendidos:* cria usuário com perfil definido; restringe ações conforme o perfil.

## API e chaves (`telas/api.html`) · histórias 09 e 10

- Lista de chaves com permissões, validade, último uso e situação (ativa, expirada, revogada).
- Nova chave: nome, permissões (`jobs:criar`, `jobs:ler`, `jobs:cancelar`, `projetos:ler`) e validade. A chave completa aparece **uma única vez**, depois só o começo dela.
- Revogar com confirmação.
- Referência da API: exemplos de enviar job e consultar andamento, endpoints e lista de erros (400, 401, 403, 404, 429).

*Critérios atendidos:* cria chave com permissões e validade; exibe a chave completa só na criação e permite revogar; aceita envio e consulta por integração autorizada e informa os erros de requisição.

## Consumo e custos (`telas/custos.html`) · história 11

- Indicadores: horas de GPU e custo do período, mês atual comparado ao anterior e projeção do mês.
- Gráfico de horas por mês, tarifas aplicadas (nuvem e local), orçamento mensal com aviso quando estoura.
- Tabela de custo por projeto (horas na nuvem, horas locais, participação) e exportação em CSV.

*Critérios atendidos:* exibe horas de GPU e tarifa aplicada; apresenta custo total por projeto e por período.

## Backups (`telas/backups.html`) · história 12

- Lista de backups (data, tipo, conteúdo, local, tamanho, situação) e motivo dos que falharam.
- **Recuperar**: escolhe o que restaurar, acompanha as etapas e recebe o resultado, que fica registrado no histórico.
- Backup manual sob demanda.

*Critérios atendidos:* consulta backups e datas; recupera os dados previstos e informa o resultado.
