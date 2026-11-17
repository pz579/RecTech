/* recTech — layout compartilhado (PARTE 1 · base)
 * Monta o menu lateral, a barra do topo e os componentes de interface (badge, toast, modal).
 * Cada tela só precisa de:
 *   <body data-tela="fila">  +  <main id="conteudo">…</main>
 *   <script src="../assets/js/dados.js"></script>
 *   <script src="../assets/js/layout.js"></script>
 * O menu já lista TODAS as telas do grupo, então ninguém precisa editar este arquivo
 * para adicionar a própria parte.
 */
(function () {
  const BASE = document.currentScript.src.replace(/assets\/js\/layout\.js.*$/, '');

  // Tema: escuro é o padrão (sala de edição com luz baixa); a escolha fica salva no navegador
  const CHAVE_TEMA = 'rectech-tema';
  const temaSalvo = () => { try { return localStorage.getItem(CHAVE_TEMA); } catch (e) { return null; } };
  const aplicarTema = (t) => { if (t === 'claro') document.documentElement.dataset.tema = 'claro'; else delete document.documentElement.dataset.tema; };
  aplicarTema(temaSalvo());

  const PERFIS = ['Administrador', 'Operador', 'Editor de vídeo', 'Programador', 'Gestor do estúdio'];
  const TODOS = PERFIS;

  // Quem pode ver cada tela (critério da história 01: "restringe ações conforme o perfil")
  const MENU = [
    { grupo: 'Visão geral', itens: [
      { id: 'dashboard', nome: 'Painel', arquivo: 'telas/dashboard.html', icone: 'painel', perfis: TODOS, parte: 1 } ] },
    { grupo: 'Renderização', itens: [
      { id: 'novo-job', nome: 'Novo job', arquivo: 'telas/novo-job.html', icone: 'enviar', perfis: ['Administrador', 'Operador', 'Editor de vídeo'], parte: 2 },
      { id: 'fila', nome: 'Fila de jobs', arquivo: 'telas/fila.html', icone: 'fila', perfis: ['Administrador', 'Operador', 'Editor de vídeo'], parte: 2 },
      { id: 'projetos', nome: 'Projetos e entregas', arquivo: 'telas/projetos.html', icone: 'pasta', perfis: ['Administrador', 'Operador', 'Editor de vídeo', 'Gestor do estúdio'], parte: 3 } ] },
    { grupo: 'Operação', itens: [
      { id: 'monitoramento', nome: 'Monitoramento', arquivo: 'telas/monitoramento.html', icone: 'monitor', perfis: ['Administrador', 'Operador'], parte: 3 },
      { id: 'alertas', nome: 'Alertas e falhas', arquivo: 'telas/alertas.html', icone: 'sino', perfis: ['Administrador', 'Operador'], parte: 3 } ] },
    { grupo: 'Gestão', itens: [
      { id: 'custos', nome: 'Consumo e custos', arquivo: 'telas/custos.html', icone: 'grafico', perfis: ['Administrador', 'Gestor do estúdio'], parte: 4 },
      { id: 'api', nome: 'API e chaves', arquivo: 'telas/api.html', icone: 'chave', perfis: ['Administrador', 'Programador'], parte: 4 },
      { id: 'usuarios', nome: 'Usuários e acessos', arquivo: 'telas/usuarios.html', icone: 'usuarios', perfis: ['Administrador'], parte: 4 },
      { id: 'backups', nome: 'Backups', arquivo: 'telas/backups.html', icone: 'backup', perfis: ['Administrador'], parte: 4 } ] }
  ];
  // Telas que não aparecem no menu mas existem
  const EXTRAS = [{ id: 'job', perfis: ['Administrador', 'Operador', 'Editor de vídeo'] }];

  const ICONES = {
    painel: '<path d="M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z"/>',
    enviar: '<path d="M12 16V4M6 10l6-6 6 6M4 20h16"/>',
    fila: '<path d="M4 6h16M4 12h16M4 18h10"/>',
    pasta: '<path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    monitor: '<path d="M3 4h18v12H3zM8 20h8M12 16v4M6 12l3-3 3 2 5-5"/>',
    sino: '<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0"/>',
    grafico: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    chave: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M15 8l2 2"/>',
    usuarios: '<circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0M17 4a4 4 0 0 1 0 8M22 21a7 7 0 0 0-4-6.3"/>',
    backup: '<path d="M4 7c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 7v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    sair: '<path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h11"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    fechar: '<path d="M6 6l12 12M18 6L6 18"/>',
    cima: '<path d="M6 15l6-6 6 6"/>',
    baixo: '<path d="M6 9l6 6 6-6"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    erro: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5v.01"/>',
    limite: '<path d="M12 3.5L2.5 20h19z"/><path d="M12 10v4.5M12 17.5v.01"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.5v.01"/>',
    play: '<path d="M8 5.5v13l10.5-6.5z"/>',
    sol: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4L6 18M18 6l1.4-1.4"/>',
    lua: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>'
  };
  const icone = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONES[n] || ''}</svg>`;

  // ---------- componentes reaproveitados por todas as partes ----------
  const CORES_STATUS = {
    'Renderizando': 'azul', 'Na fila': 'cinza', 'Pausado': 'amarelo', 'Concluído': 'verde', 'Erro': 'vermelho', 'Cancelado': 'cinza',
    'Urgente': 'vermelho', 'Alta': 'laranja', 'Normal': 'azul', 'Baixa': 'cinza',
    'online': 'verde', 'manutencao': 'amarelo', 'offline': 'vermelho',
    'ok': 'verde', 'falhou': 'vermelho', 'erro': 'vermelho', 'limite': 'laranja', 'conclusao': 'verde', 'sistema': 'cinza'
  };
  const ROTULOS = { manutencao: 'Manutenção', online: 'Online', offline: 'Offline', ok: 'OK', falhou: 'Falhou', erro: 'Erro', limite: 'Limite', conclusao: 'Conclusão', sistema: 'Sistema' };

  RT.ui = {
    icone,
    badge: (txt) => `<span class="badge badge-${CORES_STATUS[txt] || 'cinza'}">${ROTULOS[txt] || txt}</span>`,
    barra: (pct, cor, rotulo = 'Progresso') => {
      const v = Math.round(Math.max(0, Math.min(100, pct)));
      return `<div class="barra" role="progressbar" aria-label="${rotulo}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${v}"><span style="width:${v}%" class="${cor ? 'barra-' + cor : ''}"></span></div>`;
    },
    // Tira de frames (assinatura visual): progresso como película, uma célula por trecho de frames.
    // estado: 'Renderizando' | 'Pausado' | 'Erro' | 'Concluído' | outro (na fila)
    tira(pct, estado, celulas = 24, rotulo = 'Frames renderizados', grande = false) {
      const v = Math.round(Math.max(0, Math.min(100, pct)));
      const prontas = Math.floor(celulas * v / 100);
      const cls = { Pausado: 'tira-pausado', 'Concluído': 'tira-concluido' }[estado] || '';
      let html = '';
      for (let i = 0; i < celulas; i++) {
        let c = i < prontas ? 'ok' : '';
        if (i === prontas && v < 100 && estado === 'Renderizando') c = 'agora';
        if (i === prontas && v < 100 && estado === 'Erro') c = 'erro';
        html += `<i class="${c}"></i>`;
      }
      return `<div class="tira ${cls} ${grande ? 'tira-grande' : ''}" role="progressbar" aria-label="${rotulo}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${v}" aria-valuetext="${v}% · ${estado || ''}">${html}</div>`;
    },
    brl: (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
    num: (v, casas = 1) => v.toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas }),
    esc: (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])),
    link: (arquivo) => BASE + arquivo,
    agora: () => { const d = new Date(); const p = (n) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`; },

    toast(msg, tipo = 'ok') {
      let box = document.querySelector('.toasts');
      if (!box) { box = document.createElement('div'); box.className = 'toasts'; box.setAttribute('role', 'status'); document.body.appendChild(box); }
      const t = document.createElement('div');
      t.className = 'toast toast-' + tipo; t.textContent = msg;
      box.appendChild(t);
      setTimeout(() => t.classList.add('sai'), 3200);
      setTimeout(() => t.remove(), 3600);
    },

    // modal({ titulo, corpo (html), acoes: [{ texto, classe, onClick(fechar) }] })
    modal({ titulo, corpo, acoes = [] }) {
      const fundo = document.createElement('div');
      fundo.className = 'modal-fundo';
      fundo.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-label="${RT.ui.esc(titulo)}">
        <header><h3>${RT.ui.esc(titulo)}</h3><button class="btn-x" aria-label="Fechar">${icone('fechar')}</button></header>
        <div class="modal-corpo">${corpo}</div>
        <footer></footer></div>`;
      const origem = document.activeElement; // foco volta para quem abriu
      const fechar = () => { fundo.remove(); document.removeEventListener('keydown', teclas, true); if (origem && origem.isConnected) origem.focus(); };
      // Esc fecha; Tab fica preso dentro do modal
      function teclas(e) {
        if (!fundo.isConnected) return;
        if (e.key === 'Escape') { e.preventDefault(); fechar(); return; }
        if (e.key !== 'Tab') return;
        const foc = [...fundo.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea, a[href], [tabindex="0"]')];
        if (!foc.length) return;
        const pri = foc[0], ult = foc[foc.length - 1];
        if (e.shiftKey && document.activeElement === pri) { e.preventDefault(); ult.focus(); }
        else if (!e.shiftKey && document.activeElement === ult) { e.preventDefault(); pri.focus(); }
      }
      document.addEventListener('keydown', teclas, true);
      fundo.querySelector('.btn-x').onclick = fechar;
      fundo.addEventListener('click', (e) => { if (e.target === fundo) fechar(); });
      const rodape = fundo.querySelector('footer');
      if (!acoes.length) acoes = [{ texto: 'Fechar', classe: 'btn' }];
      acoes.forEach((a) => {
        const b = document.createElement('button');
        b.className = a.classe || 'btn'; b.textContent = a.texto;
        b.onclick = () => (a.onClick ? a.onClick(fechar, fundo) : fechar());
        rodape.appendChild(b);
      });
      document.body.appendChild(fundo);
      const primeiro = fundo.querySelector('input, select, textarea, footer button');
      if (primeiro) primeiro.focus();
      return { fundo, fechar };
    },

    confirmar(titulo, texto, rotulo, onSim, perigo = true) {
      RT.ui.modal({ titulo, corpo: `<p>${texto}</p>`, acoes: [
        { texto: 'Voltar', classe: 'btn' },
        { texto: rotulo, classe: perigo ? 'btn btn-perigo' : 'btn btn-primario', onClick: (f) => { f(); onSim(); } } ] });
    },

    // Simula um download gerando um .txt com a descrição do arquivo (não existe arquivo real no protótipo)
    baixar(nome, descricao) {
      const blob = new Blob([`Protótipo recTech — arquivo simulado\n\n${nome}\n${descricao || ''}\n`], { type: 'text/plain' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = nome + '.txt';
      document.body.appendChild(a); a.click(); a.remove();
      RT.ui.toast('Download iniciado: ' + nome);
    }
  };

  RT.PERFIS = PERFIS;
  RT.MENU = MENU;

  // ---------- montagem da página ----------
  function podeVer(tela, perfil) {
    const item = MENU.flatMap((g) => g.itens).concat(EXTRAS).find((i) => i.id === tela);
    return !item || item.perfis.includes(perfil);
  }
  RT.podeVer = podeVer;

  function montar() {
    const tela = document.body.dataset.tela;
    if (!tela || tela === 'login') return;

    const sessao = RT.db.sessao;
    if (!sessao) { location.href = BASE + 'index.html'; return; }

    const main = document.getElementById('conteudo');
    const titulo = document.body.dataset.titulo || document.title.replace(/ · recTech$/, '');
    const naoLidos = RT.db.alertas.filter((a) => !a.lido).length;

    const menuHtml = MENU.map((g) => {
      const itens = g.itens.filter((i) => i.perfis.includes(sessao.perfil));
      if (!itens.length) return '';
      return `<div class="menu-grupo"><span>${g.grupo}</span>${itens.map((i) => `
        <a href="${BASE + i.arquivo}" class="${i.id === tela || (tela === 'job' && i.id === 'fila') ? 'ativo' : ''}">
          ${icone(i.icone)}<em>${i.nome}</em>${i.id === 'alertas' && naoLidos ? `<b class="pill">${naoLidos}</b>` : ''}</a>`).join('')}</div>`;
    }).join('');

    const casca = document.createElement('div');
    casca.className = 'casca';
    main.tabIndex = -1;
    casca.innerHTML = `
      <a class="pular" href="#conteudo">Pular para o conteúdo</a>
      <aside class="lateral" id="lateral">
        <a class="marca" href="${BASE}telas/dashboard.html"><img src="${BASE}assets/img/logo.svg" alt=""><span>rec<b>Tech</b></span></a>
        <nav aria-label="Menu principal">${menuHtml}</nav>
        <div class="lateral-pe">
          <button class="link-discreto" id="btn-restaurar" title="Volta os dados simulados ao estado inicial">Restaurar dados do protótipo</button>
        </div>
      </aside>
      <div class="area">
        <header class="topo">
          <button class="btn-icone so-mobile" id="btn-menu" aria-label="Abrir menu">${icone('menu')}</button>
          <h1>${RT.ui.esc(titulo)}</h1>
          <div class="topo-dir">
            <button class="btn-icone" id="btn-tema" aria-label="Trocar tema"></button>
            ${podeVer('alertas', sessao.perfil) ? `<a class="sino ${naoLidos ? 'tem' : ''}" href="${BASE}telas/alertas.html" aria-label="${naoLidos} alertas não lidos">${icone('sino')}${naoLidos ? `<b>${naoLidos}</b>` : ''}</a>` : ''}
            <div class="eu"><span class="avatar">${sessao.nome.split(' ').map((p) => p[0]).slice(0, 2).join('')}</span>
              <div><strong>${RT.ui.esc(sessao.nome)}</strong><small>${RT.ui.esc(sessao.perfil)}</small></div></div>
            <button class="btn-icone" id="btn-sair" aria-label="Sair" title="Sair">${icone('sair')}</button>
          </div>
        </header>
      </div>`;

    document.body.prepend(casca);
    casca.querySelector('.area').appendChild(main);

    if (!podeVer(tela, sessao.perfil)) {
      main.innerHTML = `<div class="vazio"><h2>Acesso restrito</h2>
        <p>O perfil <b>${RT.ui.esc(sessao.perfil)}</b> não tem permissão para esta tela.</p>
        <a class="btn btn-primario" href="${BASE}telas/dashboard.html">Voltar ao painel</a></div>`;
      main.dataset.bloqueado = '1';
    }

    const btnTema = document.getElementById('btn-tema');
    const pintarBotaoTema = () => {
      const claro = document.documentElement.dataset.tema === 'claro';
      btnTema.innerHTML = icone(claro ? 'lua' : 'sol');
      btnTema.title = btnTema.ariaLabel = claro ? 'Usar tema escuro' : 'Usar tema claro';
    };
    btnTema.onclick = () => {
      const novo = document.documentElement.dataset.tema === 'claro' ? 'escuro' : 'claro';
      try { localStorage.setItem(CHAVE_TEMA, novo); } catch (e) {}
      aplicarTema(novo); pintarBotaoTema();
    };
    pintarBotaoTema();

    document.getElementById('btn-sair').onclick = () => { RT.db.sessao = null; RT.salvar(); location.href = BASE + 'index.html'; };
    document.getElementById('btn-restaurar').onclick = () =>
      RT.ui.confirmar('Restaurar dados', 'Todos os dados simulados voltam ao estado inicial (jobs, usuários, chaves…). Você continua logado.', 'Restaurar', () => {
        const s = RT.db.sessao; try { localStorage.removeItem('rectech-prototipo-v1'); } catch (e) {}
        RT.db = null; try { localStorage.setItem('rectech-prototipo-v1', JSON.stringify({ sessao: s })); } catch (e) {}
        location.reload();
      });
    const lateral = document.getElementById('lateral');
    document.getElementById('btn-menu').onclick = () => lateral.classList.toggle('aberto');
  }

  // A tela só deve rodar o próprio script se o usuário puder vê-la
  RT.liberada = () => !document.getElementById('conteudo')?.dataset.bloqueado;

  // Os scripts ficam no fim do <body>, então o <main> já existe aqui: monta na hora,
  // antes do script da própria tela rodar.
  if (document.getElementById('conteudo')) montar();
  else document.addEventListener('DOMContentLoaded', montar);
})();
