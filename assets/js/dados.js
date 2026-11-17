/* recTech — dados simulados do protótipo (PARTE 1 · base compartilhada)
 * Tudo aqui é fictício. Não há back-end: o estado fica no localStorage do navegador,
 * então ações como pausar job, criar usuário ou revogar chave "sobrevivem" ao trocar de tela.
 * Botão "Restaurar dados" no rodapé do menu volta tudo ao estado inicial.
 */
(function () {
  const INICIAL = {
    sessao: null, // { nome, email, perfil }

    tarifas: { nuvemHoraGPU: 4.8, localHoraGPU: 0.9, moeda: 'BRL' },

    limites: { gpuUso: 95, gpuTemp: 83, cpuUso: 90, ramUso: 90 },

    estacoes: [
      { id: 'RS-01', nome: 'RenderStation 01', local: 'Estúdio Campinas · Sala 2', tipo: 'local', status: 'online',
        cpu: 64, ram: 71, disco: 58, gpus: [
          { uso: 98, temp: 79 }, { uso: 97, temp: 81 }, { uso: 96, temp: 78 }, { uso: 92, temp: 76 }, { uso: 41, temp: 58 } ] },
      { id: 'RS-02', nome: 'RenderStation 02', local: 'Estúdio Campinas · Sala 3', tipo: 'local', status: 'online',
        cpu: 38, ram: 44, disco: 33, gpus: [
          { uso: 88, temp: 86 }, { uso: 85, temp: 84 }, { uso: 12, temp: 49 }, { uso: 10, temp: 47 }, { uso: 0, temp: 41 } ] },
      { id: 'RS-03', nome: 'RenderStation 03', local: 'Cliente: Estúdio Aurora · SP', tipo: 'local', status: 'manutencao',
        cpu: 0, ram: 6, disco: 71, gpus: [
          { uso: 0, temp: 35 }, { uso: 0, temp: 34 }, { uso: 0, temp: 35 }, { uso: 0, temp: 36 }, { uso: 0, temp: 34 } ] },
      { id: 'RC-SP1', nome: 'RenderCloud · nó SP1', local: 'Colocation São Paulo', tipo: 'nuvem', status: 'online',
        cpu: 72, ram: 68, disco: 40, gpus: [
          { uso: 99, temp: 74 }, { uso: 99, temp: 73 }, { uso: 98, temp: 75 }, { uso: 97, temp: 72 },
          { uso: 95, temp: 71 }, { uso: 60, temp: 63 }, { uso: 0, temp: 38 }, { uso: 0, temp: 37 } ] }
    ],

    nuvem: { gpusTotais: 64, gpusEmUso: 38 },

    projetos: [
      { id: 'PRJ-21', nome: 'Comercial de Natal', cliente: 'Mercado Bom Preço', software: 'Blender', criado: '2026-11-02',
        versoes: [
          { v: 'v1', data: '2026-11-03', arquivo: 'natal_cena_v1.blend', nota: 'Primeira montagem' },
          { v: 'v2', data: '2026-11-08', arquivo: 'natal_cena_v2.blend', nota: 'Iluminação refeita' },
          { v: 'v3', data: '2026-11-14', arquivo: 'natal_cena_v3.blend', nota: 'Versão aprovada pelo cliente' } ],
        saidas: [
          { arquivo: 'natal_v2_preview_1080p.mp4', tamanho: '412 MB', job: 'JOB-1031', data: '2026-11-09' } ] },
      { id: 'PRJ-19', nome: 'Abertura Jornal da Noite', cliente: 'TV Paulista', software: 'Cinema 4D', criado: '2026-10-20',
        versoes: [
          { v: 'v1', data: '2026-10-21', arquivo: 'abertura_jn_v1.c4d', nota: 'Layout' },
          { v: 'v2', data: '2026-11-01', arquivo: 'abertura_jn_v2.c4d', nota: 'Final' } ],
        saidas: [
          { arquivo: 'abertura_jn_4k_prores.mov', tamanho: '18,4 GB', job: 'JOB-1027', data: '2026-11-02' },
          { arquivo: 'abertura_jn_1080p.mp4', tamanho: '1,1 GB', job: 'JOB-1028', data: '2026-11-02' } ] },
      { id: 'PRJ-23', nome: 'Tour virtual Residencial Alto', cliente: 'Construtora Horizonte', software: 'Unreal Engine', criado: '2026-11-10',
        versoes: [ { v: 'v1', data: '2026-11-11', arquivo: 'residencial_alto.uproject', nota: 'Cenas 1 a 4' } ],
        saidas: [] },
      { id: 'PRJ-24', nome: 'Curta "Fio"', cliente: 'Produtora Lumen', software: 'Maya', criado: '2026-11-12',
        versoes: [ { v: 'v1', data: '2026-11-13', arquivo: 'fio_sq03.mb', nota: 'Sequência 3' } ],
        saidas: [] },
      { id: 'PRJ-25', nome: 'Vídeo institucional 2027', cliente: 'Banco Regional', software: 'Premiere Pro', criado: '2026-11-15',
        versoes: [ { v: 'v1', data: '2026-11-15', arquivo: 'institucional_2027.prproj', nota: 'Corte final' } ],
        saidas: [] }
    ],

    jobs: [
      { id: 'JOB-1042', projeto: 'PRJ-21', arquivo: 'natal_cena_v3.blend', software: 'Blender', destino: 'Híbrido', prioridade: 'Urgente',
        status: 'Renderizando', progresso: 62, frames: '1–1440', resolucao: '3840×2160', formato: 'EXR + MP4', estacao: 'RS-01 + RC-SP1',
        gpus: 9, dono: 'Lucas Abdallah', criado: '2026-11-17 08:12', eta: '38 min', horasGPU: 11.6 },
      { id: 'JOB-1043', projeto: 'PRJ-23', arquivo: 'residencial_alto.uproject', software: 'Unreal Engine', destino: 'Local', prioridade: 'Alta',
        status: 'Renderizando', progresso: 27, frames: '1–3600', resolucao: '1920×1080', formato: 'MP4 (H.264)', estacao: 'RS-02',
        gpus: 2, dono: 'Caio Ferraz', criado: '2026-11-17 09:05', eta: '2 h 10 min', horasGPU: 3.1 },
      { id: 'JOB-1044', projeto: 'PRJ-24', arquivo: 'fio_sq03.mb', software: 'Maya', destino: 'Nuvem', prioridade: 'Normal',
        status: 'Na fila', progresso: 0, frames: '1–720', resolucao: '2048×858', formato: 'EXR', estacao: '—',
        gpus: 0, dono: 'Ana Clara', criado: '2026-11-17 09:40', eta: 'aguardando GPU', horasGPU: 0 },
      { id: 'JOB-1045', projeto: 'PRJ-25', arquivo: 'institucional_2027.prproj', software: 'Premiere Pro', destino: 'Local', prioridade: 'Baixa',
        status: 'Na fila', progresso: 0, frames: '00:00–03:20', resolucao: '1920×1080', formato: 'MP4 (H.265)', estacao: '—',
        gpus: 0, dono: 'Pedro Amoroso', criado: '2026-11-17 10:02', eta: 'aguardando GPU', horasGPU: 0 },
      { id: 'JOB-1040', projeto: 'PRJ-19', arquivo: 'abertura_jn_v2.c4d', software: 'Cinema 4D', destino: 'Nuvem', prioridade: 'Alta',
        status: 'Pausado', progresso: 45, frames: '1–600', resolucao: '3840×2160', formato: 'ProRes 4444', estacao: 'RC-SP1',
        gpus: 0, dono: 'Pedro Paulo Gilberti', criado: '2026-11-16 17:30', eta: 'pausado', horasGPU: 6.2 },
      { id: 'JOB-1038', projeto: 'PRJ-21', arquivo: 'natal_cena_v2.blend', software: 'Blender', destino: 'Local', prioridade: 'Normal',
        status: 'Erro', progresso: 81, frames: '1–1440', resolucao: '1920×1080', formato: 'MP4 (H.264)', estacao: 'RS-02',
        gpus: 0, dono: 'Lucas Abdallah', criado: '2026-11-16 14:11', eta: '—', horasGPU: 4.4, erro: 'Textura ausente: /tex/neve_normal.png (frame 1167)' },
      { id: 'JOB-1031', projeto: 'PRJ-21', arquivo: 'natal_cena_v2.blend', software: 'Blender', destino: 'Nuvem', prioridade: 'Normal',
        status: 'Concluído', progresso: 100, frames: '1–1440', resolucao: '1920×1080', formato: 'MP4 (H.264)', estacao: 'RC-SP1',
        gpus: 0, dono: 'Lucas Abdallah', criado: '2026-11-09 10:20', eta: '—', horasGPU: 9.8 },
      { id: 'JOB-1027', projeto: 'PRJ-19', arquivo: 'abertura_jn_v2.c4d', software: 'Cinema 4D', destino: 'Híbrido', prioridade: 'Urgente',
        status: 'Concluído', progresso: 100, frames: '1–600', resolucao: '3840×2160', formato: 'ProRes 4444', estacao: 'RS-01 + RC-SP1',
        gpus: 0, dono: 'Pedro Paulo Gilberti', criado: '2026-11-01 19:00', eta: '—', horasGPU: 22.5 },
      { id: 'JOB-1028', projeto: 'PRJ-19', arquivo: 'abertura_jn_v2.c4d', software: 'Cinema 4D', destino: 'Local', prioridade: 'Normal',
        status: 'Concluído', progresso: 100, frames: '1–600', resolucao: '1920×1080', formato: 'MP4 (H.264)', estacao: 'RS-01',
        gpus: 0, dono: 'Pedro Paulo Gilberti', criado: '2026-11-02 08:00', eta: '—', horasGPU: 5.0 }
    ],

    alertas: [
      { id: 'AL-311', tipo: 'erro', titulo: 'Falha na renderização', motivo: 'Textura ausente: /tex/neve_normal.png (frame 1167)', job: 'JOB-1038', estacao: 'RS-02', data: '2026-11-16 18:47', lido: false },
      { id: 'AL-312', tipo: 'limite', titulo: 'Temperatura acima do limite', motivo: 'GPU 1 a 86 °C (limite 83 °C)', job: 'JOB-1043', estacao: 'RS-02', data: '2026-11-17 09:58', lido: false },
      { id: 'AL-313', tipo: 'limite', titulo: 'Uso de GPU acima do limite', motivo: 'GPU 1 a 98% por mais de 10 min (limite 95%)', job: 'JOB-1042', estacao: 'RS-01', data: '2026-11-17 10:15', lido: false },
      { id: 'AL-309', tipo: 'conclusao', titulo: 'Job concluído', motivo: 'natal_cena_v2.blend renderizado (1440 frames)', job: 'JOB-1031', estacao: 'RC-SP1', data: '2026-11-09 16:02', lido: true },
      { id: 'AL-305', tipo: 'conclusao', titulo: 'Job concluído', motivo: 'abertura_jn_v2.c4d renderizado (600 frames)', job: 'JOB-1027', estacao: 'RS-01 + RC-SP1', data: '2026-11-02 03:41', lido: true },
      { id: 'AL-301', tipo: 'sistema', titulo: 'RS-03 em manutenção', motivo: 'Troca preventiva de ventoinha (chamado #884)', job: null, estacao: 'RS-03', data: '2026-11-15 11:00', lido: true }
    ],

    usuarios: [
      { id: 'U1', nome: 'Pedro Paulo Gilberti', email: 'pedro.paulo@rectech.com.br', perfil: 'Administrador', ativo: true, ultimoAcesso: '2026-11-17 08:01' },
      { id: 'U2', nome: 'Lucas Abdallah', email: 'lucas@rectech.com.br', perfil: 'Editor de vídeo', ativo: true, ultimoAcesso: '2026-11-17 08:10' },
      { id: 'U3', nome: 'Ana Clara', email: 'ana.clara@rectech.com.br', perfil: 'Operador', ativo: true, ultimoAcesso: '2026-11-17 09:39' },
      { id: 'U4', nome: 'Caio Ferraz', email: 'caio@rectech.com.br', perfil: 'Programador', ativo: true, ultimoAcesso: '2026-11-17 09:02' },
      { id: 'U5', nome: 'Pedro Amoroso', email: 'pedro.amoroso@rectech.com.br', perfil: 'Gestor do estúdio', ativo: true, ultimoAcesso: '2026-11-16 18:20' },
      { id: 'U6', nome: 'Marina Souza', email: 'marina@estudioaurora.com', perfil: 'Editor de vídeo', ativo: false, ultimoAcesso: '2026-10-30 15:44' }
    ],

    chaves: [
      { id: 'KEY-07', nome: 'Pipeline Blender do estúdio', prefixo: 'rt_live_7f3a', permissoes: ['jobs:criar', 'jobs:ler'], criada: '2026-10-28', validade: '2027-04-28', ultimoUso: '2026-11-17 07:55', ativa: true },
      { id: 'KEY-05', nome: 'Painel interno de status', prefixo: 'rt_live_c19e', permissoes: ['jobs:ler'], criada: '2026-09-14', validade: '2026-12-14', ultimoUso: '2026-11-16 22:10', ativa: true },
      { id: 'KEY-02', nome: 'Teste antigo', prefixo: 'rt_live_0b2d', permissoes: ['jobs:criar', 'jobs:ler', 'jobs:cancelar'], criada: '2026-06-02', validade: '2026-09-02', ultimoUso: '2026-08-30 10:00', ativa: false }
    ],

    consumoMensal: [
      { mes: 'Jun', horas: 96 }, { mes: 'Jul', horas: 132 }, { mes: 'Ago', horas: 118 },
      { mes: 'Set', horas: 171 }, { mes: 'Out', horas: 204 }, { mes: 'Nov', horas: 142 }
    ],

    backups: [
      { id: 'BK-1117', data: '2026-11-17 03:00', tipo: 'Incremental', escopo: 'Projetos + fila + configurações', tamanho: '38 GB', local: 'Colocation SP (cópia 2)', status: 'ok' },
      { id: 'BK-1116', data: '2026-11-16 03:00', tipo: 'Incremental', escopo: 'Projetos + fila + configurações', tamanho: '41 GB', local: 'Colocation SP (cópia 2)', status: 'ok' },
      { id: 'BK-1115', data: '2026-11-15 03:00', tipo: 'Completo', escopo: 'Tudo (inclui saídas renderizadas)', tamanho: '2,7 TB', local: 'Fita LTO + nuvem fria', status: 'ok' },
      { id: 'BK-1114', data: '2026-11-14 03:00', tipo: 'Incremental', escopo: 'Projetos + fila + configurações', tamanho: '—', local: 'Colocation SP (cópia 2)', status: 'falhou' },
      { id: 'BK-1108', data: '2026-11-08 03:00', tipo: 'Completo', escopo: 'Tudo (inclui saídas renderizadas)', tamanho: '2,5 TB', local: 'Fita LTO + nuvem fria', status: 'ok' }
    ],

    historicoRecuperacao: []
  };

  const CHAVE = 'rectech-prototipo-v1';
  const clone = (o) => JSON.parse(JSON.stringify(o));

  function carregar() {
    try {
      const salvo = localStorage.getItem(CHAVE);
      if (salvo) return Object.assign(clone(INICIAL), JSON.parse(salvo));
    } catch (e) { /* navegador sem storage: segue com os dados iniciais */ }
    return clone(INICIAL);
  }

  const db = carregar();

  window.RT = window.RT || {};
  RT.db = db;
  RT.salvar = function () {
    try { localStorage.setItem(CHAVE, JSON.stringify(RT.db)); } catch (e) { /* ignora */ }
  };
  RT.restaurar = function () {
    try { localStorage.removeItem(CHAVE); } catch (e) { /* ignora */ }
    location.reload();
  };
  RT.projeto = (id) => RT.db.projetos.find((p) => p.id === id);
  RT.job = (id) => RT.db.jobs.find((j) => j.id === id);
  // Quando um job termina: gera a saída no projeto (história 06) e o alerta de conclusão (história 08)
  RT.concluirJob = function (j) {
    j.status = 'Concluído'; j.progresso = 100; j.eta = '—'; j.gpus = 0;
    const p = RT.projeto(j.projeto);
    const base = j.arquivo.replace(/\.[^.]+$/, '');
    const ext = /ProRes/.test(j.formato) ? 'mov' : /EXR/.test(j.formato) && !/MP4/.test(j.formato) ? 'exr.zip' : 'mp4';
    if (p && !p.saidas.some((s) => s.job === j.id)) {
      p.saidas.unshift({ arquivo: `${base}_${(j.resolucao || '').startsWith('3840') ? '4k' : '1080p'}.${ext}`, tamanho: (Math.random() * 3 + .4).toFixed(1).replace('.', ',') + ' GB', job: j.id, data: new Date().toISOString().slice(0, 10) });
    }
    const d = new Date(); const pad = (n) => String(n).padStart(2, '0');
    RT.db.alertas.unshift({ id: RT.proximoId('AL-', RT.db.alertas), tipo: 'conclusao', titulo: 'Job concluído', motivo: `${j.arquivo} renderizado (${j.frames})`,
      job: j.id, estacao: j.estacao, data: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`, lido: false });
  };

  RT.proximoId = function (prefixo, lista) {
    const nums = lista.map((x) => parseInt(String(x.id).replace(/\D/g, ''), 10) || 0);
    return prefixo + (Math.max(0, ...nums) + 1);
  };
})();
