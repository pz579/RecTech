# Parte 2 · Renderização

**Arquivos:** `telas/novo-job.html`, `telas/fila.html`, `telas/job.html`, `docs/parte-2-renderizacao.md`

O fluxo principal do produto: enviar um projeto, organizar a fila e acompanhar o job até o fim.

## Novo job (`telas/novo-job.html`) · histórias 02 e 04

Assistente em 4 passos:

1. **Projeto e arquivos**: escolhe o projeto e envia o pacote (arrastar ou clicar). O sistema confere o pacote e lista arquivos ausentes ou inválidos; enquanto houver problema o botão Continuar fica travado. Dois pacotes de exemplo (válido e com problema) facilitam a demonstração.
2. **Configuração**: frames, FPS, resolução, formato de saída e qualidade.
3. **Destino e prioridade**: Local (RenderStation), Nuvem (RenderCloud) ou Híbrido, com GPUs livres em cada um, estimativa de tempo e de custo de nuvem. Se não houver GPU livre, avisa que o job **fica na fila** no destino escolhido.
4. **Revisão** e envio para a fila.

*Critérios atendidos:* recebe e identifica o projeto; informa arquivos ausentes/inválidos antes de entrar na fila; permite escolher o destino e respeita a escolha.

## Fila de jobs (`telas/fila.html`) · histórias 03 e 05

- Abas: ativos e na fila, concluídos, erros e cancelados. Busca, filtro por destino e "só meus jobs".
- Coluna **#** mostra a ordem de execução. Operador e Administrador mudam a **prioridade** (a ordem se atualiza na hora) e usam as setas para reordenar dentro da mesma prioridade.
- Ações por job: pausar, retomar, cancelar (com confirmação), reenviar job com erro, baixar.
- O progresso aparece na **tira de frames** e anda sozinho para simular a renderização; ao chegar em 100% o job vira "Concluído", gera o arquivo no projeto e um alerta.

*Critérios atendidos:* lista jobs pendentes e prioridades; altera a prioridade e atualiza a ordem; exibe status e progresso; pausar, retomar e cancelar atualizam o estado.

## Detalhe do job (`telas/job.html`) · histórias 05 e 06

- Barra de progresso grande, mapa de frames prontos, tempo restante.
- Log da renderização (com download), ficha técnica (destino, estação, GPUs, horas de GPU, custo).
- Botões de controle conforme o status e o perfil.
- **Arquivos finalizados** vinculados ao job e ao projeto, com botão de download depois da conclusão.

*Critérios atendidos:* vincula os resultados ao projeto e ao job de origem; disponibiliza e permite baixar após a conclusão.
