# Parte 3 · Projetos e operação

**Arquivos:** `telas/projetos.html`, `telas/monitoramento.html`, `telas/alertas.html`, `docs/parte-3-operacao.md`

O lado de quem cuida das entregas e das máquinas.

## Projetos e entregas (`telas/projetos.html`) · história 06 + requisito "gerenciamento de vídeos"

- Lista de projetos com busca e indicação de jobs em andamento; criar projeto novo.
- Para cada projeto: versões de entrada (linha do tempo), saídas renderizadas com o job de origem e botão de download, histórico de renderizações e horas de GPU gastas.
- Botão "Renderizar nova versão" leva ao Novo job com o projeto já escolhido.

*Critério atendido:* vincula os resultados ao projeto e ao job de origem e permite baixá-los.

## Monitoramento (`telas/monitoramento.html`) · história 07

- Um cartão por estação (3 RenderStation + nó do RenderCloud) com CPU, RAM, disco e cada GPU (uso e temperatura).
- Atualiza a cada 2 segundos (dá para pausar) e filtra local ou nuvem.
- **Limites configuráveis** (uso de GPU, temperatura, CPU, RAM). O que passa do limite fica em vermelho e a estação ganha um selo "N acima do limite".

*Critérios atendidos:* exibe uso de GPU, CPU, memória e temperatura por estação; destaca recursos acima dos limites configurados.

## Alertas e falhas (`telas/alertas.html`) · história 08

- Lista de ocorrências por tipo (erro, limite excedido, conclusão, sistema), filtro de não lidos e "marcar todos como lidos".
- Ao abrir um alerta: data, motivo, job e estação relacionados, com atalho para o job ou para o monitoramento.
- Resumo dos últimos 7 dias e preferências de notificação.

*Critérios atendidos:* notifica conclusão, erro ou limite excedido; registra data, motivo e job ou estação relacionados.
