/* ==========================================================
   Dumont — relógio, cronômetro, cartão de ponto e Meu Dia
   Sem dependências externas. Dados somente no localStorage.
   ========================================================== */
'use strict';

(() => {
  /* ---------- Utilidades ---------- */
  const LS_REG = 'dumont.registros';
  const LS_CFG = 'dumont.config';
  const MAX_OBS = 50;

  const $ = (sel, raiz = document) => raiz.querySelector(sel);
  const pad = (n, l = 2) => String(n).padStart(l, '0');

  function el(tag, attrs = {}, ...filhos) {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v === false || v == null) continue;
      if (k === 'class') e.className = v;
      else if (k === 'text') e.textContent = v;
      else if (v === true) e.setAttribute(k, '');
      else e.setAttribute(k, v);
    }
    for (const f of filhos) e.append(f);
    return e;
  }

  function lerJSON(chave, padrao) {
    try {
      const v = localStorage.getItem(chave);
      return v ? JSON.parse(v) : padrao;
    } catch { return padrao; }
  }
  function salvarJSON(chave, valor) {
    try { localStorage.setItem(chave, JSON.stringify(valor)); return true; }
    catch { toast('Não foi possível salvar os dados neste navegador.'); return false; }
  }

  /* ---------- Toast ---------- */
  let toastTimer = 0;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 4500);
  }

  /* ---------- Configurações ---------- */
  const PADRAO = { formato24: true, segundos: true, tema: 'claro', ordem: 'asc' };
  let config = { ...PADRAO, ...lerJSON(LS_CFG, {}) };
  const salvarConfig = () => salvarJSON(LS_CFG, config);

  function aplicarTema() {
    const escuro = config.tema === 'escuro';
    document.documentElement.setAttribute('data-theme', escuro ? 'dark' : 'light');
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', escuro ? '#1E293B' : '#FFFFFF');
  }

  function atualizarSwitches() {
    $('[data-action="formato"]').setAttribute('aria-checked', String(config.formato24));
    $('[data-action="segundos"]').setAttribute('aria-checked', String(config.segundos));
    $('[data-action="tema"]').setAttribute('aria-checked', String(config.tema === 'escuro'));
    $('#ordemDias').value = config.ordem;
  }

  /* ---------- Datas e horas ---------- */
  const isoData = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const isoHora = (d) => `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  const fmtData = (iso) => iso.split('-').reverse().join('-'); /* AAAA-MM-DD -> DD-MM-AAAA */

  function dataValida(s) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
    if (!m) return false;
    const a = +m[1], mes = +m[2], d = +m[3];
    if (a < 1900 || a > 2100) return false;
    const dt = new Date(a, mes - 1, d);
    return dt.getFullYear() === a && dt.getMonth() === mes - 1 && dt.getDate() === d;
  }

  function normalizarHora(h) {
    const m = /^([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/.exec(String(h));
    return m ? `${m[1]}:${m[2]}:${m[3] || '00'}` : null;
  }

  function fmtHoraRegistro(h) {
    const [H, M, S] = h.split(':').map(Number);
    if (config.formato24) return `${pad(H)}:${pad(M)}:${pad(S)}`;
    return `${pad(H % 12 || 12)}:${pad(M)}:${pad(S)} ${H >= 12 ? 'PM' : 'AM'}`;
  }

  const segundosDoDia = (h) => {
    const [H, M, S] = h.split(':').map(Number);
    return H * 3600 + M * 60 + S;
  };

  /* ---------- Relógio principal ---------- */
  let tickTimer = 0;
  let ultimaData = '';

  function tick() {
    const agora = new Date();
    let h = agora.getHours();
    const m = agora.getMinutes();
    const s = agora.getSeconds();
    let sufixo = '';
    if (!config.formato24) { sufixo = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12; }

    $('#clockTime').textContent = `${pad(h)}:${pad(m)}${config.segundos ? ':' + pad(s) : ''}`;
    $('#clockAmpm').textContent = sufixo;

    const dataTxt = agora.toLocaleDateString('pt-BR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
    if (dataTxt !== ultimaData) {
      ultimaData = dataTxt;
      $('#clockDate').textContent = dataTxt.charAt(0).toUpperCase() + dataTxt.slice(1);
    }

    if ($('#dlgPonto').open) {
      $('#pontoAgora').textContent = `${fmtData(isoData(agora))} · ${fmtHoraRegistro(isoHora(agora))}`;
    }

    clearTimeout(tickTimer);
    tickTimer = setTimeout(tick, 1000 - agora.getMilliseconds() + 10);
  }

  /* ---------- Cronômetro ---------- */
  const sw = { rodando: false, base: 0, inicio: 0, voltas: [], raf: 0 };
  const swDecorrido = () => (sw.rodando ? sw.base + (performance.now() - sw.inicio) : sw.base);

  function fmtSW(ms) {
    const cs = Math.floor(ms / 10) % 100;
    const total = Math.floor(ms / 1000);
    return `${pad(Math.floor(total / 3600))}:${pad(Math.floor(total / 60) % 60)}:${pad(total % 60)}.${pad(cs)}`;
  }

  function swLoop() {
    $('#swDisplay').textContent = fmtSW(swDecorrido());
    if (sw.rodando) sw.raf = requestAnimationFrame(swLoop);
  }

  function swAtualizarBotoes() {
    const iniciou = sw.rodando || sw.base > 0;
    $('#swStart').textContent = sw.rodando ? 'Pausar' : (iniciou ? 'Continuar' : 'Iniciar');
    $('#swLap').disabled = !sw.rodando;
    $('#swReset').disabled = !iniciou && sw.voltas.length === 0;
  }

  function swAlternar() {
    if (sw.rodando) {
      sw.base += performance.now() - sw.inicio;
      sw.rodando = false;
      cancelAnimationFrame(sw.raf);
    } else {
      sw.inicio = performance.now();
      sw.rodando = true;
      sw.raf = requestAnimationFrame(swLoop);
    }
    swLoop();
    swAtualizarBotoes();
  }

  function swVolta() {
    if (!sw.rodando) return;
    sw.voltas.push(swDecorrido());
    swRenderVoltas();
    swAtualizarBotoes();
  }

  function swRedefinir() {
    sw.rodando = false;
    cancelAnimationFrame(sw.raf);
    sw.base = 0;
    sw.voltas = [];
    swLoop();
    swRenderVoltas();
    swAtualizarBotoes();
  }

  function swRenderVoltas() {
    const ul = $('#lapList');
    ul.replaceChildren();
    for (let i = sw.voltas.length - 1; i >= 0; i--) {
      const anterior = i > 0 ? sw.voltas[i - 1] : 0;
      ul.append(el('li', {},
        el('span', { class: 'lap-n', text: `Volta ${i + 1}` }),
        el('span', { class: 'lap-split', text: '+' + fmtSW(sw.voltas[i] - anterior) }),
        el('span', { class: 'lap-total', text: fmtSW(sw.voltas[i]) })
      ));
    }
  }

  /* ---------- Registros (cartão de ponto) ---------- */
  function sanitizarRegistro(r) {
    if (!r || typeof r !== 'object') return null;
    const hora = normalizarHora(r.hora);
    if (!dataValida(r.data) || !hora) return null;
    if (r.tipo !== 'inicio' && r.tipo !== 'termino') return null;
    return {
      id: typeof r.id === 'string' && r.id ? r.id : novoId(),
      data: r.data,
      hora,
      tipo: r.tipo,
      obs: String(r.obs || '').trim().slice(0, MAX_OBS)
    };
  }

  function novoId() {
    return (window.crypto && crypto.randomUUID)
      ? crypto.randomUUID()
      : Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
  }

  const chaveRegistro = (r) => `${r.data}|${r.hora}|${r.tipo}|${r.obs}`;

  let registros = (() => {
    const lista = lerJSON(LS_REG, []);
    return Array.isArray(lista) ? lista.map(sanitizarRegistro).filter(Boolean) : [];
  })();

  function adicionarRegistro({ data, hora, tipo, obs }) {
    const r = sanitizarRegistro({ data, hora, tipo, obs });
    if (!r) { toast('Registro inválido.'); return false; }
    registros.push(r);
    if (!salvarJSON(LS_REG, registros)) { registros.pop(); return false; }
    renderMeuDia();
    return true;
  }

  function agrupar() {
    const mapa = new Map();
    for (const r of registros) {
      if (!mapa.has(r.data)) mapa.set(r.data, []);
      mapa.get(r.data).push(r);
    }
    const datas = [...mapa.keys()].sort();
    if (config.ordem === 'desc') datas.reverse();
    return datas.map((data) => ({
      data,
      itens: mapa.get(data).sort((a, b) => a.hora.localeCompare(b.hora))
    }));
  }

  function calcularTotal(itens) {
    let aberto = null;
    let total = 0;
    for (const it of itens) {
      const s = segundosDoDia(it.hora);
      if (it.tipo === 'inicio') { if (aberto === null) aberto = s; }
      else if (aberto !== null) { total += Math.max(0, s - aberto); aberto = null; }
    }
    return { total, emAberto: aberto !== null };
  }

  function fmtDuracao(seg) {
    return `${Math.floor(seg / 3600)}h ${pad(Math.floor(seg / 60) % 60)}min`;
  }

  /* ---------- Página Meu Dia ---------- */
  function renderMeuDia() {
    const caixa = $('#diasLista');
    caixa.replaceChildren();
    const grupos = agrupar();

    $('#resumoDias').textContent = grupos.length
      ? `${grupos.length} ${grupos.length === 1 ? 'dia' : 'dias'} · ${registros.length} ${registros.length === 1 ? 'registro' : 'registros'}`
      : '';

    if (!grupos.length) {
      caixa.append(el('div', { class: 'card vazio' },
        el('p', { text: 'Nenhum registro ainda.' }),
        el('p', { class: 'muted', text: 'Use “Ponto” para registrar agora ou “Entrada” para lançar um horário passado.' })
      ));
      return;
    }

    for (const g of grupos) {
      const tid = 'dia-' + g.data;
      const { total, emAberto } = calcularTotal(g.itens);
      let resumo = '';
      if (total > 0) resumo = `Total trabalhado: ${fmtDuracao(total)}`;
      if (emAberto) resumo += (resumo ? ' · ' : '') + 'jornada em aberto (sem término)';

      const corpo = el('tbody');
      for (const it of g.itens) {
        const inicio = it.tipo === 'inicio';
        corpo.append(el('tr', {},
          el('td', {}, el('span', { class: 'badge ' + it.tipo, text: inicio ? '▶ Início' : '■ Término' })),
          el('td', { class: 'mono', text: fmtHoraRegistro(it.hora) }),
          el('td', { class: 'obs', text: it.obs || '—' }),
          el('td', { class: 'acoes no-print' },
            el('button', {
              type: 'button', class: 'btn-icon',
              'aria-label': `Excluir ${inicio ? 'início' : 'término'} das ${fmtHoraRegistro(it.hora)} em ${fmtData(g.data)}`,
              'data-action': 'excluir', 'data-id': it.id, text: '🗑️'
            })
          )
        ));
      }

      caixa.append(el('article', { class: 'card dia', 'aria-labelledby': tid },
        el('div', { class: 'dia-head' },
          el('h2', { id: tid, class: 'dia-titulo', text: `Meu Dia ${fmtData(g.data)}` }),
          el('span', { class: 'dia-total', text: resumo })
        ),
        el('table', {},
          el('thead', {}, el('tr', {},
            el('th', { scope: 'col', text: 'Tipo' }),
            el('th', { scope: 'col', text: 'Horário' }),
            el('th', { scope: 'col', text: 'Observação' }),
            el('th', { scope: 'col', class: 'no-print' }, el('span', { class: 'sr-only', text: 'Ações' }))
          )),
          corpo
        )
      ));
    }
  }

  function excluirRegistro(id) {
    const r = registros.find((x) => x.id === id);
    if (!r) return;
    if (!confirm(`Excluir o registro das ${fmtHoraRegistro(r.hora)} de ${fmtData(r.data)}?`)) return;
    const antes = registros;
    registros = registros.filter((x) => x.id !== id);
    if (!salvarJSON(LS_REG, registros)) registros = antes;
    renderMeuDia();
    toast('Registro excluído.');
  }

  /* ---------- Backup / Importação / Impressão ---------- */
  function montarBackup() {
    const dias = {};
    const ordenado = [...registros].sort((a, b) => (a.data + a.hora).localeCompare(b.data + b.hora));
    for (const r of ordenado) {
      (dias[r.data] = dias[r.data] || []).push({ id: r.id, hora: r.hora, tipo: r.tipo, obs: r.obs });
    }
    return {
      app: 'Dumont',
      versao: 1,
      geradoEm: new Date().toISOString(),
      totalDias: Object.keys(dias).length,
      totalRegistros: registros.length,
      dias
    };
  }

  function baixarBackup() {
    if (!registros.length) { toast('Não há registros no Meu Dia para fazer backup.'); return; }
    const blob = new Blob([JSON.stringify(montarBackup(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = el('a', { href: url, download: `dumont-backup-${isoData(new Date())}.json` });
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    toast(`Backup gerado com ${registros.length} ${registros.length === 1 ? 'registro' : 'registros'}.`);
  }

  async function importarArquivo(arquivo) {
    if (!arquivo) return;
    if (arquivo.size > 10 * 1024 * 1024) { toast('Arquivo muito grande para ser um backup do Dumont.'); return; }
    let dados;
    try { dados = JSON.parse(await arquivo.text()); }
    catch { toast('Arquivo inválido: não é um JSON legível.'); return; }

    let brutos = [];
    if (Array.isArray(dados)) brutos = dados;
    else if (dados && Array.isArray(dados.registros)) brutos = dados.registros;
    else if (dados && dados.dias && typeof dados.dias === 'object') {
      for (const [data, lista] of Object.entries(dados.dias)) {
        if (Array.isArray(lista)) for (const it of lista) brutos.push({ ...it, data });
      }
    } else { toast('Arquivo inválido: formato de backup não reconhecido.'); return; }

    const existentes = new Set(registros.map(chaveRegistro));
    let novos = 0, duplicados = 0, ignorados = 0;
    const adicionados = [];
    for (const b of brutos) {
      const r = sanitizarRegistro(b);
      if (!r) { ignorados++; continue; }
      const k = chaveRegistro(r);
      if (existentes.has(k)) { duplicados++; continue; }
      existentes.add(k);
      adicionados.push(r);
      novos++;
    }
    if (adicionados.length) {
      const anterior = registros;
      registros = registros.concat(adicionados);
      if (!salvarJSON(LS_REG, registros)) registros = anterior;
    }
    renderMeuDia();
    toast(`Importação concluída: ${novos} novo(s), ${duplicados} já existente(s), ${ignorados} ignorado(s).`);
  }

  function imprimir() {
    if (!registros.length) { toast('Não há registros para imprimir.'); return; }
    window.print();
  }
  window.addEventListener('beforeprint', () => {
    const agora = new Date();
    $('#printEmissao').textContent = `Emitido em ${fmtData(isoData(agora))} às ${fmtHoraRegistro(isoHora(agora))}`;
  });

  /* ---------- Navegação entre páginas ---------- */
  const VIEWS = ['relogio', 'meudia'];

  function viewDoHash() { return location.hash === '#meudia' ? 'meudia' : 'relogio'; }

  function mostrarView(nome) {
    for (const v of VIEWS) $('#view-' + v).hidden = v !== nome;
    if (nome === 'meudia') renderMeuDia();
  }

  window.addEventListener('hashchange', () => {
    mostrarView(viewDoHash());
    window.scrollTo({ top: 0 });
    $('#conteudo').focus({ preventScroll: true });
  });

  $('#brandLink').addEventListener('click', (e) => {
    e.preventDefault();
    fecharMenu();
    if (location.hash !== '#relogio') location.hash = '#relogio';
    mostrarView('relogio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Menu (gaveta) ---------- */
  const menuBtn = $('#menuBtn');
  const menuPanel = $('#menuPanel');

  function abrirMenu() {
    menuPanel.hidden = false;
    menuBtn.setAttribute('aria-expanded', 'true');
    menuBtn.setAttribute('aria-label', 'Fechar menu');
    const primeiro = menuPanel.querySelector('button, a');
    if (primeiro) primeiro.focus();
  }

  function fecharMenu(devolverFoco = false) {
    if (menuPanel.hidden) return;
    menuPanel.hidden = true;
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Abrir menu');
    if (devolverFoco) menuBtn.focus();
  }

  menuBtn.addEventListener('click', () => (menuPanel.hidden ? abrirMenu() : fecharMenu(true)));

  document.addEventListener('click', (e) => {
    if (!menuPanel.hidden && !menuPanel.contains(e.target) && !menuBtn.contains(e.target)) fecharMenu();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menuPanel.hidden) fecharMenu(true);
  });
  menuPanel.addEventListener('focusout', (e) => {
    const para = e.relatedTarget;
    if (para && !menuPanel.contains(para) && !menuBtn.contains(para)) fecharMenu();
  });

  /* ---------- Diálogos ---------- */
  const dlgPonto = $('#dlgPonto');
  const dlgEntrada = $('#dlgEntrada');
  const dlgSobre = $('#dlgSobre');

  function ligarContador(inputSel, contadorSel) {
    const inp = $(inputSel), cont = $(contadorSel);
    const atualizar = () => { cont.textContent = `${inp.value.length}/${MAX_OBS}`; };
    inp.addEventListener('input', atualizar);
    return atualizar;
  }
  const atualizarContPonto = ligarContador('#obsPonto', '#obsPontoCount');
  const atualizarContEntrada = ligarContador('#ent-obs', '#ent-obsCount');

  for (const d of [dlgPonto, dlgEntrada, dlgSobre]) {
    d.addEventListener('click', (e) => { if (e.target === d) d.close(); });
    d.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) d.close(); });
  }

  function abrirPonto() {
    fecharMenu();
    const hoje = isoData(new Date());
    const doDia = registros.filter((r) => r.data === hoje).sort((a, b) => a.hora.localeCompare(b.hora));
    const proximo = doDia.length && doDia[doDia.length - 1].tipo === 'inicio' ? 'termino' : 'inicio';
    for (const r of document.getElementsByName('tipoPonto')) r.checked = r.value === proximo;
    $('#obsPonto').value = '';
    atualizarContPonto();
    dlgPonto.showModal();
    tick();
    $('#obsPonto').focus();
  }

  $('#formPonto').addEventListener('submit', (e) => {
    e.preventDefault();
    const agora = new Date();
    const tipo = [...document.getElementsByName('tipoPonto')].find((r) => r.checked).value;
    const ok = adicionarRegistro({ data: isoData(agora), hora: isoHora(agora), tipo, obs: $('#obsPonto').value });
    if (ok) {
      dlgPonto.close();
      toast(`${tipo === 'inicio' ? 'Início' : 'Término'} registrado às ${fmtHoraRegistro(isoHora(agora))}.`);
    }
  });

  function abrirEntrada() {
    fecharMenu();
    const agora = new Date();
    $('#ent-dia').value = agora.getDate();
    $('#ent-mes').value = String(agora.getMonth() + 1);
    $('#ent-ano').value = agora.getFullYear();
    $('#ent-hora').value = agora.getHours();
    $('#ent-minuto').value = agora.getMinutes();
    $('#ent-tipo').value = 'inicio';
    $('#ent-obs').value = '';
    $('#erroEntrada').textContent = '';
    atualizarContEntrada();
    dlgEntrada.showModal();
  }

  $('#formEntrada').addEventListener('submit', (e) => {
    e.preventDefault();
    const falhar = (msg, campo) => { $('#erroEntrada').textContent = msg; campo.focus(); };
    const campos = [['dia', 1, 31, 'Dia'], ['mes', 1, 12, 'Mês'], ['ano', 1900, 2100, 'Ano'], ['hora', 0, 23, 'Hora'], ['minuto', 0, 59, 'Minuto']];
    const v = {};
    for (const [id, min, max, rotulo] of campos) {
      const campo = $('#ent-' + id);
      const bruto = campo.value.trim();
      const n = Number(bruto);
      if (bruto === '' || !Number.isInteger(n) || n < min || n > max) {
        return falhar(`${rotulo}: informe um número entre ${min} e ${max}.`, campo);
      }
      v[id] = n;
    }
    const data = `${v.ano}-${pad(v.mes)}-${pad(v.dia)}`;
    if (!dataValida(data)) return falhar('Essa data não existe no calendário.', $('#ent-dia'));
    if (new Date(v.ano, v.mes - 1, v.dia, v.hora, v.minuto).getTime() > Date.now() + 60000) {
      return falhar('Lançamentos retroativos não podem estar no futuro.', $('#ent-dia'));
    }
    const hora = `${pad(v.hora)}:${pad(v.minuto)}:00`;
    const ok = adicionarRegistro({ data, hora, tipo: $('#ent-tipo').value, obs: $('#ent-obs').value });
    if (ok) {
      dlgEntrada.close();
      toast(`Entrada lançada em ${fmtData(data)} às ${fmtHoraRegistro(hora)}.`);
    }
  });

  /* ---------- Instalação PWA ---------- */
  let promptInstalacao = null;
  const modoApp = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;

  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); promptInstalacao = e; });
  window.addEventListener('appinstalled', () => { promptInstalacao = null; toast('Dumont instalado com sucesso!'); });

  async function instalar() {
    fecharMenu();
    if (modoApp()) { toast('O Dumont já está instalado e em execução como aplicativo.'); return; }
    if (!promptInstalacao) {
      toast('Instalação indisponível agora. No Chrome, use o menu ⋮ → “Instalar Dumont”.');
      return;
    }
    const evento = promptInstalacao;
    promptInstalacao = null;
    evento.prompt();
    try {
      const { outcome } = await evento.userChoice;
      if (outcome !== 'accepted') toast('Instalação cancelada.');
    } catch { /* ignorado */ }
  }

  /* ---------- Tela cheia ---------- */
  async function alternarTelaCheia() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch { toast('Tela cheia indisponível neste dispositivo ou navegador.'); }
  }
  document.addEventListener('fullscreenchange', () => {
    $('#txtTelaCheia').textContent = document.fullscreenElement ? 'Sair da tela cheia' : 'Tela cheia';
  });

  /* ---------- Ações (delegação de eventos) ---------- */
  function executar(acao, botao) {
    switch (acao) {
      case 'ponto': abrirPonto(); break;
      case 'entrada': abrirEntrada(); break;
      case 'meudia':
        fecharMenu();
        if (location.hash === '#meudia') mostrarView('meudia'); else location.hash = '#meudia';
        break;
      case 'backup': fecharMenu(); baixarBackup(); break;
      case 'importar': $('#arquivoImport').click(); break;
      case 'imprimir': imprimir(); break;
      case 'instalar': instalar(); break;
      case 'sobre': fecharMenu(); dlgSobre.showModal(); break;
      case 'formato':
        config.formato24 = !config.formato24; salvarConfig(); atualizarSwitches(); tick(); renderMeuDia(); break;
      case 'segundos':
        config.segundos = !config.segundos; salvarConfig(); atualizarSwitches(); tick(); break;
      case 'tema':
        config.tema = config.tema === 'escuro' ? 'claro' : 'escuro';
        salvarConfig(); aplicarTema(); atualizarSwitches(); break;
      case 'telacheia': fecharMenu(); alternarTelaCheia(); break;
      case 'excluir': excluirRegistro(botao.dataset.id); break;
    }
  }

  document.addEventListener('click', (e) => {
    const botao = e.target.closest('[data-action]');
    if (botao) executar(botao.dataset.action, botao);
  });

  $('#ordemDias').addEventListener('change', (e) => {
    config.ordem = e.target.value === 'desc' ? 'desc' : 'asc';
    salvarConfig();
    renderMeuDia();
  });

  $('#arquivoImport').addEventListener('change', async (e) => {
    await importarArquivo(e.target.files[0]);
    e.target.value = '';
  });

  $('#swStart').addEventListener('click', swAlternar);
  $('#swLap').addEventListener('click', swVolta);
  $('#swReset').addEventListener('click', swRedefinir);

  /* Sincroniza abas abertas */
  window.addEventListener('storage', (e) => {
    if (e.key === LS_REG) {
      const lista = lerJSON(LS_REG, []);
      registros = Array.isArray(lista) ? lista.map(sanitizarRegistro).filter(Boolean) : [];
      renderMeuDia();
    }
  });

  /* ---------- Splash (3 segundos exatos) ---------- */
  const splash = $('#splash');
  let splashFechada = false;
  function fecharSplash() {
    if (splashFechada) return;
    splashFechada = true;
    splash.remove();
    $('#app').removeAttribute('inert');
  }
  splash.addEventListener('animationend', (e) => {
    if (e.target === splash && e.animationName === 'splashVida') fecharSplash();
  });
  setTimeout(fecharSplash, 3200); /* rede de segurança */

  /* ---------- Service Worker ---------- */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => { /* indisponível em file:// */ });
    });
  }

  /* ---------- Inicialização ---------- */
  aplicarTema();
  atualizarSwitches();
  mostrarView(viewDoHash());
  swRenderVoltas();
  swAtualizarBotoes();
  tick();
})();
