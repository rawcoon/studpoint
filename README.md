# Studpoint

Diákélet-infók a kolozsvári egyetemistáknak: kedvezmények, útmutatók és tippek, kategóriákba rendezve, magyar, román és angol nyelven.

## Fájlok

| Fájl | Mire való |
|------|-----------|
| `index.html` | Az oldal váza |
| `style.css` | Kinézet. A színek a fájl tetején, változókként vannak megadva |
| `data.js` | **Tartalom**: kategóriák, alkategóriák, szűrők, bejegyzések, felületi szövegek |
| `app.js` | Működés (navigáció, keresés, szűrés, nyelvváltás). Általában nem kell módosítani |

## Új bejegyzés hozzáadása

A `data.js` `items` listájába másolj be egy meglévő bejegyzést, és írd át:

```js
{
  id: 'egyedi-azonosito',          // kisbetű, szóköz nélkül; ez lesz a link vége is
  category: 'etel',                // a kategória azonosítója
  sub: 'kantinok',                 // az alkategória azonosítója (elhagyható)
  title: 'Bejegyzés neve',
  summary: 'Egy-két mondatos magyarázat.',
  who: 'Kinek szól',               // elhagyható
  deadline: 'Határidő',            // elhagyható
  needs: 'Mi kell hozzá',          // elhagyható
  tags: { univ: ['bbte'] },        // kire szól (lásd: Szűrők); elhagyható
  updated: '2026-10-24',           // az utolsó ellenőrzés dátuma
  guide: [ /* a részletes útmutató blokkjai */ ],
  sources: 'Honnan származnak az adatok'
}
```

Ha még nincs tartalom, elég az `id`, `category`, `title` és a `status: 'draft'`. Ilyenkor a kártyán „Hamarosan" címke jelenik meg.

## Az útmutató blokkjai (`guide`)

A `guide` egy lista, a blokkok abban a sorrendben jelennek meg, ahogy felsorolod őket.

| `type` | Mire jó | Mezők |
|--------|---------|-------|
| `steps` | Számozott lépések (az alapcíme: „Hogyan veheted igénybe?") | `title`, `intro`, `items: [{ title, text, tip }]` |
| `facts` | Nagy kulcsadat-csempék (nyitvatartás, ár…) | `items: [{ label, value, sub }]` |
| `cards` | Kártyarács („Mit kapsz?") | `items: [{ title, text, lines: [{ label, value }] }]` |
| `list` | Pontokba szedett lista („Jó tudni") | `title`, `items: ['…', '…']` |
| `note` | Kiemelt jegyzet | `title`, `text`, `tone: 'info'` (kék; nélküle arany) |
| `defs` | Cím–érték lista; `collapsible: true` esetén lenyíló szószedet | `title`, `items: [{ term, text }]` |
| `links` | Gombként megjelenő linkek (weboldal, `mailto:`) | `title`, `items: [{ label, url }]` |
| `text` | Sima szövegrész | `title`, `text` |

## Kategóriák és alkategóriák

A `data.js` `categories` listájában vannak. Új kategória vagy alkategória a meglévők mintájára adható hozzá. Ha egy kategóriának nincs alkategóriája (`subcategories: []`), az alkategória-sáv nem jelenik meg.

## Szűrők (egyetem, kar/szak)

A `filters` listában vannak a szűrési szempontok. A bejegyzés `tags` mezőjében adhatod meg, kire szól:

```js
tags: { univ: ['bbte'], faculty: ['fsega'] }
```

- Ha egy bejegyzésnek **nincs** címkéje egy szempontnál, akkor **mindenkinek szól**, és mindig megjelenik.
- Ha egy diák kiválasztja az egyetemét, csak a rá vonatkozó és az általános bejegyzéseket látja.
- Új egyetem vagy kar: vegyél fel egy új `option`-t a `filters` megfelelő szempontja alá.
- A diák választását a böngésző megjegyzi.

## Nyelvek

A felületi szövegek (`ui`) és a kategórianevek mindhárom nyelven megvannak. A bejegyzések szövegei egyelőre csak magyarul vannak. Ha egy mezőhöz fordítást szeretnél, a sima szöveget cseréld ki így:

```js
summary: { hu: 'Magyar szöveg', ro: 'Text în română', en: 'English text' }
```

Ahol egy nyelvhez nincs szöveg, ott az oldal a magyart mutatja, és jelzi, hogy a bejegyzés csak magyarul érhető el. Ez minden szövegmezőre igaz (cím, összefoglaló, lépések, jegyzetek…).

## Képek

A kártyákon a szürke négyzet a képhelyettesítő. Saját képhez tölts fel egy képfájlt (pl. `kepek/fsega.jpg`), és add meg a bejegyzésben: `image: 'kepek/fsega.jpg'`.

## Feltöltés GitHub Pagesre

1. Hozz létre egy ingyenes fiókot a github.com-on, majd egy új, **Public** repository-t (pl. `studpoint`).
2. Húzd be a fájlokat a böngészőben (**Add file → Upload files**), majd **Commit changes**.
3. **Settings → Pages**: a *Source* legyen *Deploy from a branch*, a branch `main`, a mappa `/ (root)`. Mentsd el.
4. Pár perc múlva az oldal elérhető a `https://felhasznalonev.github.io/studpoint/` címen.

Módosításkor ugyanígy töltsd fel újra az érintett fájlt, az felülírja a régit.
