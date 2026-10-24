/* =====================================================================
   STUDPOINT – működés (navigáció, keresés, szűrés, nyelvválasztó, részletoldal)
   A tartalom a data.js-ben van, ezt a fájlt általában nem kell módosítani.
   ===================================================================== */
(function () {
  'use strict';

  const D = window.STUDPOINT;
  const FILTERS = D.filters || [];
  const $ = (id) => document.getElementById(id);

  const ICONS = {
    right: '<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 4l8 8-8 8"/></svg>',
    left:  '<svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 4l-8 8 8 8"/></svg>'
  };

  /* ---------- Állapot ---------- */
  let lang = 'hu';
  let query = '';
  let filters = {};            // pl. { univ: 'bbte', faculty: 'fsega' }
  let filterOpen = false;
  let route = { view: 'list', cat: null, sub: null, id: null };
  let navigated = false;       // volt-e már belső navigáció (a "vissza" gombhoz)
  let listScroll = 0;

  try {
    const savedLang = localStorage.getItem('studpoint-lang');
    if (savedLang && D.languages.indexOf(savedLang) !== -1) lang = savedLang;
  } catch (e) { /* a mentés nem kötelező */ }

  try {
    const saved = JSON.parse(localStorage.getItem('studpoint-filters') || '{}');
    FILTERS.forEach(function (g) {
      if (saved && g.options.some(function (o) { return o.id === saved[g.id]; })) filters[g.id] = saved[g.id];
    });
  } catch (e) { /* nem baj */ }

  /* ---------- Segédfüggvények ---------- */
  function t(key) {
    const u = D.ui;
    return (u[lang] && u[lang][key]) || u.hu[key] || key;
  }

  /* Többnyelvű mező: szöveg (minden nyelven ugyanaz) vagy { hu, ro, en }. */
  function tr(v) {
    if (v == null) return '';
    if (typeof v === 'string') return v;
    return v[lang] || v.hu || v.ro || v.en || '';
  }

  /* Van-e az adott nyelven külön fordítás? (sima szöveg = csak magyar) */
  function translated(v) {
    return v != null && typeof v === 'object' && !!v[lang];
  }

  /* Ékezet- és kisbetű-független keresés. */
  function norm(s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  function safeUrl(u) {
    return /^(https?:|mailto:)/i.test(u || '') ? u : '#';
  }

  function append(node, child) {
    if (child == null || child === false) return;
    if (Array.isArray(child)) { child.forEach(function (c) { append(node, c); }); return; }
    node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
  }

  /* Egyszerű DOM-építő; a szöveget mindig szövegként illeszti be (biztonságos). */
  function el(tag, props) {
    const node = document.createElement(tag);
    if (props) {
      Object.keys(props).forEach(function (k) {
        const v = props[k];
        if (v == null || v === false) return;
        if (k === 'class') node.className = v;
        else if (k === 'text') node.textContent = v;
        else if (k === 'html') node.innerHTML = v;      // csak saját, állandó SVG-khez
        else if (k.indexOf('on') === 0) node.addEventListener(k.slice(2), v);
        else node.setAttribute(k, v);
      });
    }
    for (let i = 2; i < arguments.length; i++) append(node, arguments[i]);
    return node;
  }

  function findCat(id) {
    return D.categories.filter(function (c) { return c.id === id; })[0] || null;
  }
  function findSub(cat, id) {
    return (cat && cat.subcategories || []).filter(function (s) { return s.id === id; })[0] || null;
  }
  function findItem(id) {
    return D.items.filter(function (i) { return i.id === id; })[0] || null;
  }

  function fmtDate(iso) {
    return /^\d{4}-\d{2}-\d{2}$/.test(iso || '') ? iso.replace(/-/g, '.') : (iso || '');
  }

  /* ---------- Útvonalak: #/  #/kategoria  #/kategoria/alkategoria  #/i/bejegyzes ---------- */
  function parseHash() {
    const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
    if (parts[0] === 'i' && findItem(parts[1])) return { view: 'detail', id: parts[1] };
    const c = findCat(parts[0]);
    if (!c) return { view: 'list', cat: null, sub: null };
    const s = findSub(c, parts[1]);
    return { view: 'list', cat: c.id, sub: s ? s.id : null };
  }

  function hrefFor(cat, sub) {
    return '#/' + (cat ? cat + (sub ? '/' + sub : '') : '');
  }

  function go(cat, sub) {
    query = '';
    $('search').value = '';
    const h = hrefFor(cat, sub);
    if (location.hash === h) render(); else location.hash = h;
  }

  function goBack() {
    if (navigated && history.length > 1) { history.back(); return; }
    const it = findItem(route.id);
    go(it ? it.category : null, it ? it.sub : null);
  }

  /* ---------- Szűrés ---------- */
  function filterCount() { return Object.keys(filters).length; }

  /* Címke nélküli bejegyzés mindenkinek szól, ezért mindig látszik. */
  function passesFilters(it) {
    const tags = it.tags || {};
    return FILTERS.every(function (g) {
      const sel = filters[g.id];
      const list = tags[g.id];
      if (!sel || !list || !list.length) return true;
      return list.indexOf(sel) !== -1;
    });
  }

  function saveFilters() {
    try { localStorage.setItem('studpoint-filters', JSON.stringify(filters)); } catch (e) { /* nem baj */ }
  }

  /* ---------- Keresés ---------- */
  const indexCache = {};

  function collect(v, out) {
    if (v == null) return;
    if (typeof v === 'string') { out.push(v); return; }
    if (Array.isArray(v)) { v.forEach(function (x) { collect(x, out); }); return; }
    if (typeof v === 'object') {
      if ('hu' in v || 'ro' in v || 'en' in v) { out.push(tr(v)); return; }
      Object.keys(v).forEach(function (k) {
        if (k === 'url' || k === 'type' || k === 'tone' || k === 'id' || k === 'image' || k === 'tags' || k === 'status' || k === 'category' || k === 'sub' || k === 'collapsible') return;
        collect(v[k], out);
      });
    }
  }

  function searchText(it) {
    const key = it.id + '|' + lang;
    if (!indexCache[key]) {
      const out = [];
      collect(it, out);
      const c = findCat(it.category);
      if (c) { out.push(tr(c.name)); const s = findSub(c, it.sub); if (s) out.push(tr(s.name)); }
      indexCache[key] = norm(out.join(' '));
    }
    return indexCache[key];
  }

  function matchesQuery(it) {
    const hay = searchText(it);
    return query.split(/\s+/).filter(Boolean).every(function (w) { return hay.indexOf(w) !== -1; });
  }

  /* ---------- Megjelenítés: közös részek ---------- */
  function renderStatic() {
    document.documentElement.lang = lang;
    $('heroTitle').textContent = t('heroTitle');
    $('heroText').textContent = t('heroText');
    $('search').placeholder = t('searchPlaceholder');
    $('footerText').textContent = t('footer');
    $('filterLabel').textContent = t('filter');

    const n = filterCount();
    $('filterCount').hidden = n === 0;
    $('filterCount').textContent = String(n);

    Array.prototype.forEach.call(document.querySelectorAll('.lang button'), function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
  }

  function centerActive(box) {
    const a = box.querySelector('.active');
    if (!a || box.scrollWidth <= box.clientWidth) return;
    box.scrollLeft = Math.max(0, a.offsetLeft - (box.clientWidth - a.offsetWidth) / 2);
  }

  function renderCats(active) {
    const box = $('categories');
    box.textContent = '';
    const mk = function (label, isActive, cat) {
      return el('a', {
        class: 'cat' + (isActive ? ' active' : ''),
        href: hrefFor(cat),
        'aria-current': isActive ? 'page' : null,
        onclick: function (e) { e.preventDefault(); go(cat); },
        text: label
      });
    };
    box.appendChild(mk(t('all'), active === null, null));
    D.categories.forEach(function (c) { box.appendChild(mk(tr(c.name), active === c.id, c.id)); });
    centerActive(box);
  }

  function renderSubs(catId, subId) {
    const bar = $('subbar');
    const box = $('subcats');
    box.textContent = '';
    const c = catId ? findCat(catId) : null;
    const subs = c ? (c.subcategories || []) : [];
    bar.hidden = subs.length === 0;
    if (!subs.length) return;

    const mk = function (label, isActive, sub) {
      return el('a', {
        class: 'sub' + (isActive ? ' active' : ''),
        href: hrefFor(catId, sub),
        'aria-current': isActive ? 'page' : null,
        onclick: function (e) { e.preventDefault(); go(catId, sub); },
        text: label
      });
    };
    box.appendChild(mk(t('subAll'), subId === null, null));
    subs.forEach(function (s) { box.appendChild(mk(tr(s.name), subId === s.id, s.id)); });
    centerActive(box);
  }

  function renderFilterPanel() {
    const p = $('filterPanel');
    p.textContent = '';
    p.hidden = !filterOpen;
    $('filterBtn').setAttribute('aria-expanded', String(filterOpen));
    if (!filterOpen) return;

    FILTERS.forEach(function (g) {
      if (!g.options || !g.options.length) return;
      const chips = g.options.map(function (o) {
        const on = filters[g.id] === o.id;
        return el('button', {
          type: 'button',
          class: 'fchip' + (on ? ' active' : ''),
          'aria-pressed': String(on),
          text: tr(o.name),
          onclick: function () {
            if (on) delete filters[g.id]; else filters[g.id] = o.id;
            saveFilters();
            render();
          }
        });
      });
      p.appendChild(el('div', { class: 'f-group' }, el('h4', { text: tr(g.name) }), el('div', { class: 'f-chips' }, chips)));
    });

    if (filterCount() > 0) {
      p.appendChild(el('button', {
        type: 'button', class: 'f-clear', text: t('clearFilters'),
        onclick: function () { filters = {}; saveFilters(); render(); }
      }));
    }
  }

  /* ---------- Lista ---------- */
  function buildCard(it) {
    const cat = findCat(it.category);
    const draft = it.status === 'draft';

    const thumb = el('span', { class: 'thumb', 'aria-hidden': 'true' },
      it.image ? el('img', { src: it.image, alt: '', loading: 'lazy' }) : el('span', { class: 'ph-icon', text: cat ? cat.icon : '' }));

    const summary = it.summary ? tr(it.summary) : (draft ? t('draftSummary') : '');
    const main = el('span', { class: 'c-main' },
      el('h3', { class: 'c-title' }, tr(it.title), draft ? el('span', { class: 'badge-draft', text: t('draft') }) : null),
      summary ? el('p', { class: 'c-sum', text: summary }) : null,
      it.updated ? el('span', { class: 'c-upd' }, el('b', { text: t('updated') + ': ' }), fmtDate(it.updated)) : null
    );

    const rows = [];
    [['who', 'who'], ['deadline', 'deadline'], ['needs', 'needs']].forEach(function (pair) {
      if (it[pair[0]]) rows.push(el('span', null, el('b', { text: t(pair[1]) + ':' }), tr(it[pair[0]])));
    });

    const card = el('a', {
      class: 'card' + (draft ? ' is-draft' : '') + (rows.length ? '' : ' no-meta'),
      href: '#/i/' + encodeURIComponent(it.id)
    }, thumb, main);

    if (rows.length) {
      append(card, el('span', { class: 'c-div', 'aria-hidden': 'true' }));
      append(card, el('span', { class: 'c-meta' }, rows));
    }
    append(card, el('span', { class: 'go', html: ICONS.right, 'aria-hidden': 'true' }));
    return card;
  }

  function sortItems(list) {
    const ci = function (id) { return D.categories.findIndex(function (c) { return c.id === id; }); };
    return list
      .map(function (it, i) { return { it: it, i: i }; })
      .sort(function (a, b) {
        return (ci(a.it.category) - ci(b.it.category)) ||
               ((a.it.status === 'draft') - (b.it.status === 'draft')) ||
               (a.i - b.i);
      })
      .map(function (x) { return x.it; });
  }

  function renderList() {
    const searching = query !== '';
    const catId = searching ? null : route.cat;
    const subId = searching ? null : route.sub;

    renderCats(catId);
    renderSubs(catId, subId);
    renderFilterPanel();

    const list = sortItems(D.items.filter(function (it) {
      return passesFilters(it) &&
             (!catId || it.category === catId) &&
             (!subId || it.sub === subId) &&
             (!searching || matchesQuery(it));
    }));

    $('resultInfo').textContent = t(searching ? 'resultsSearch' : 'results').replace('{n}', list.length);

    const box = $('items');
    box.textContent = '';
    if (!list.length) {
      box.appendChild(el('div', { class: 'empty', text: t(searching || filterCount() ? 'noResults' : 'emptyCat') }));
      return;
    }
    list.forEach(function (it) { box.appendChild(buildCard(it)); });
  }

  /* ---------- Részletoldal ---------- */
  function section(title, intro, body, cls) {
    return el('section', { class: 'blk' + (cls ? ' ' + cls : '') },
      title ? el('h3', { text: title }) : null,
      intro ? el('p', { class: 'blk-intro', text: intro }) : null,
      body);
  }

  const BLOCKS = {
    steps: function (b) {
      const ol = el('ol', { class: 'steps' });
      (b.items || []).forEach(function (s, i) {
        ol.appendChild(el('li', { class: 'panel-soft' },
          el('span', { class: 'num', text: String(i + 1), 'aria-hidden': 'true' }),
          el('div', { class: 'step-body' },
            el('h4', { text: tr(s.title) }),
            s.text ? el('p', { text: tr(s.text) }) : null,
            s.tip ? el('p', { class: 'tip' }, el('b', { text: t('tip') + ': ' }), tr(s.tip)) : null)));
      });
      return section(b.title ? tr(b.title) : t('how'), tr(b.intro), ol);
    },

    facts: function (b) {
      const g = el('div', { class: 'facts' });
      (b.items || []).forEach(function (f) {
        g.appendChild(el('div', { class: 'fact panel-soft' },
          el('div', { class: 'k', text: tr(f.label) }),
          el('div', { class: 'v', text: tr(f.value) }),
          f.sub ? el('div', { class: 's', text: tr(f.sub) }) : null));
      });
      return section(tr(b.title), tr(b.intro), g);
    },

    cards: function (b) {
      const g = el('div', { class: 'cardgrid' });
      (b.items || []).forEach(function (c) {
        g.appendChild(el('div', { class: 'mini panel-soft' },
          el('h4', { text: tr(c.title) }),
          c.text ? el('p', { text: tr(c.text) }) : null,
          c.lines && c.lines.length ? el('div', { class: 'mini-lines' }, c.lines.map(function (l) {
            return el('div', null, el('b', { text: tr(l.label) }), tr(l.value));
          })) : null));
      });
      return section(tr(b.title), tr(b.intro), g);
    },

    list: function (b) {
      return section(tr(b.title), tr(b.intro),
        el('ul', { class: 'blist' }, (b.items || []).map(function (x) { return el('li', { text: tr(x) }); })));
    },

    note: function (b) {
      return el('section', { class: 'blk' },
        el('div', { class: 'note' + (b.tone === 'info' ? ' info' : '') },
          b.title ? el('h4', { text: tr(b.title) }) : null,
          el('p', { text: tr(b.text) })));
    },

    defs: function (b) {
      let body;
      if (b.collapsible) {
        body = el('div', { class: 'accordion' }, (b.items || []).map(function (d) {
          return el('details', null, el('summary', { text: tr(d.term) }), el('p', { text: tr(d.text) }));
        }));
      } else {
        body = el('dl', { class: 'defs' }, (b.items || []).map(function (d) {
          return [el('dt', { text: tr(d.term) }), el('dd', { text: tr(d.text) })];
        }));
      }
      return section(tr(b.title), tr(b.intro), body);
    },

    links: function (b) {
      return section(tr(b.title), tr(b.intro),
        el('ul', { class: 'links' }, (b.items || []).map(function (l) {
          const url = safeUrl(l.url);
          const ext = /^https?:/i.test(url);
          return el('li', null, el('a', {
            href: url,
            target: ext ? '_blank' : null,
            rel: ext ? 'noopener noreferrer' : null,
            text: tr(l.label)
          }));
        })));
    },

    text: function (b) {
      return section(tr(b.title), '', el('p', { class: 'plain-text', text: tr(b.text) }));
    }
  };

  function renderDetail() {
    const it = findItem(route.id);
    const box = $('detailView');
    box.textContent = '';
    if (!it) { go(null); return; }

    const draft = it.status === 'draft';
    document.title = tr(it.title) + ' – Studpoint';

    const head = el('div', { class: 'd-head' },
      el('button', { type: 'button', class: 'back', 'aria-label': t('back'), html: ICONS.left, onclick: goBack }),
      el('h2', { text: tr(it.title) }),
      draft ? el('span', { class: 'badge-draft', text: t('draft') }) : null);

    const summary = it.summary ? tr(it.summary) : (draft ? t('draftSummary') : '');
    const rows = [];
    [['who', 'who'], ['deadline', 'deadline'], ['needs', 'needs']].forEach(function (pair) {
      if (it[pair[0]]) rows.push(el('div', null, el('b', { text: t(pair[1]) + ':' }), tr(it[pair[0]])));
    });

    const showFallback = lang !== 'hu' && it.summary && !translated(it.summary);
    const intro = el('div', { class: 'd-intro' },
      el('div', null,
        summary ? el('p', { class: 'd-sum', text: summary }) : null,
        showFallback ? el('p', { class: 'fb-note', text: t('fallback') }) : null),
      rows.length ? el('div', { class: 'd-meta' }, rows) : null);

    const panel = el('article', { class: 'detail' }, head, intro, el('hr', { class: 'd-hr' }));

    if (draft) {
      panel.appendChild(el('section', { class: 'blk' }, el('div', { class: 'note info' }, el('p', { text: t('draftNotice') }))));
    }

    (it.guide || []).forEach(function (b) {
      const fn = BLOCKS[b.type];
      if (fn) panel.appendChild(fn(b));
    });

    if (it.sources || it.updated) {
      panel.appendChild(el('div', { class: 'd-foot' },
        it.sources ? el('div', null, el('b', { text: t('sources') + ': ' }), tr(it.sources)) : null,
        it.updated ? el('div', null, el('b', { text: t('updated') + ': ' }), fmtDate(it.updated)) : null));
    }

    box.appendChild(panel);
  }

  /* ---------- Fő megjelenítés ---------- */
  function render() {
    const detail = route.view === 'detail';
    renderStatic();
    document.body.classList.toggle('view-detail', detail);
    $('listView').hidden = detail;
    $('detailView').hidden = !detail;
    if (detail) {
      renderDetail();
    } else {
      document.title = 'Studpoint';
      renderList();
    }
  }

  /* ---------- Események ---------- */
  $('search').addEventListener('input', function (e) {
    query = norm(e.target.value).trim();
    if (route.view === 'list') renderList();
  });

  $('filterBtn').addEventListener('click', function () {
    filterOpen = !filterOpen;
    renderFilterPanel();
  });

  Array.prototype.forEach.call(document.querySelectorAll('.lang button'), function (b) {
    b.addEventListener('click', function () {
      lang = b.getAttribute('data-lang');
      try { localStorage.setItem('studpoint-lang', lang); } catch (e) { /* nem baj */ }
      render();
    });
  });

  $('logo').addEventListener('click', function (e) {
    e.preventDefault();
    go(null);
    window.scrollTo(0, 0);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && filterOpen) {
      filterOpen = false;
      renderFilterPanel();
      $('filterBtn').focus();
    }
  });

  window.addEventListener('hashchange', function () {
    const prev = route;
    if (prev.view === 'list') listScroll = window.scrollY;
    navigated = true;
    route = parseHash();
    render();
    if (route.view === 'detail') window.scrollTo(0, 0);
    else if (prev.view === 'detail') requestAnimationFrame(function () { window.scrollTo(0, listScroll); });
  });

  route = parseHash();
  render();
})();
