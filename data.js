/* =====================================================================
   STUDPOINT – TARTALOM
   Itt van minden, ami az oldalon megjelenik: felületi szövegek, kategóriák,
   alkategóriák, szűrők és a bejegyzések (kedvezmények, tippek).

   Szövegek: sima idézőjeles szöveg = csak magyar (vagy névként minden nyelven).
   Többnyelvű szöveg: { hu: '...', ro: '...', en: '...' }
   Ha egy nyelvhez nincs szöveg, az oldal a magyart mutatja.

   Új bejegyzés: másolj be egy meglévőt az "items" listába, és írd át.
   Részletes leírás: README.md
   ===================================================================== */

window.STUDPOINT = {

  languages: ['hu', 'ro', 'en'],

  /* ---------- Felületi szövegek ---------- */
  ui: {
    hu: {
      heroTitle: 'Minden, ami a diákélethez kell – egy helyen',
      heroText: 'A kolozsvári egyetemistákért',
      searchPlaceholder: 'Keress kedvezményt, programot…',
      all: 'Mind',
      subAll: 'Összes',
      results: '{n} bejegyzés',
      resultsSearch: '{n} találat',
      filter: 'Szűrés',
      clearFilters: 'Szűrők törlése',
      noResults: 'Nincs találat. Próbálj másik kulcsszót vagy más szűrőket.',
      emptyCat: 'Ide még nem került tartalom – hamarosan érkezik.',
      who: 'Kinek szól',
      deadline: 'Határidő',
      needs: 'Mi kell hozzá',
      updated: 'Utolsó frissítés',
      draft: 'Hamarosan',
      draftSummary: 'Az útmutató még készül.',
      draftNotice: 'Ennek az útmutatónak a részletes tartalma még készül. Nézz vissza később!',
      back: 'Vissza',
      how: 'Hogyan veheted igénybe?',
      tip: 'Tipp',
      sources: 'Források',
      fallback: 'Ez a bejegyzés egyelőre csak magyarul érhető el.',
      footer: 'Studpoint – diákélet-infók egy helyen. A tartalom tájékoztató jellegű, a részleteket mindig ellenőrizd a forrásnál.'
    },
    ro: {
      heroTitle: 'Tot ce îți trebuie pentru viața de student – într-un singur loc',
      heroText: 'Pentru studenții din Cluj',
      searchPlaceholder: 'Caută reduceri, evenimente…',
      all: 'Toate',
      subAll: 'Toate',
      results: '{n} intrări',
      resultsSearch: '{n} rezultate',
      filter: 'Filtrare',
      clearFilters: 'Șterge filtrele',
      noResults: 'Niciun rezultat. Încearcă alt cuvânt-cheie sau alte filtre.',
      emptyCat: 'Aici nu a ajuns încă niciun conținut – în curând.',
      who: 'Cui se adresează',
      deadline: 'Termen',
      needs: 'Ce îți trebuie',
      updated: 'Ultima actualizare',
      draft: 'În curând',
      draftSummary: 'Ghidul este în lucru.',
      draftNotice: 'Conținutul detaliat al acestui ghid este încă în lucru. Revino mai târziu!',
      back: 'Înapoi',
      how: 'Cum poți beneficia?',
      tip: 'Sfat',
      sources: 'Surse',
      fallback: 'Această intrare este disponibilă momentan doar în limba maghiară.',
      footer: 'Studpoint – informații despre viața de student într-un singur loc. Conținutul are caracter informativ; verifică mereu detaliile la sursă.'
    },
    en: {
      heroTitle: 'Everything you need for student life – in one place',
      heroText: 'For the students of Cluj',
      searchPlaceholder: 'Search discounts, events…',
      all: 'All',
      subAll: 'All',
      results: '{n} entries',
      resultsSearch: '{n} results',
      filter: 'Filter',
      clearFilters: 'Clear filters',
      noResults: 'No results. Try another keyword or different filters.',
      emptyCat: 'No content here yet – coming soon.',
      who: 'Who it is for',
      deadline: 'Deadline',
      needs: 'What you need',
      updated: 'Last updated',
      draft: 'Coming soon',
      draftSummary: 'This guide is in progress.',
      draftNotice: 'The detailed content of this guide is still being written. Check back soon!',
      back: 'Back',
      how: 'How to get it',
      tip: 'Tip',
      sources: 'Sources',
      fallback: 'This entry is currently available in Hungarian only.',
      footer: 'Studpoint – student life info in one place. The content is for information only; always check the details at the source.'
    }
  },

  /* ---------- Kategóriák és alkategóriák ----------
     "icon": a kártyákon a képhelyettesítő ikon (amíg nincs saját kép).
     Alkategória nélküli kategóriánál a "subcategories" lista maradhat üres. */
  categories: [
    {
      id: 'etel', icon: '🍽️',
      name: { hu: 'Étel', ro: 'Mâncare', en: 'Food' },
      subcategories: [
        { id: 'kantinok',    name: { hu: 'Kantinok',    ro: 'Cantine',  en: 'Canteens' } },
        { id: 'kedvezmenyek', name: { hu: 'Kedvezmények', ro: 'Reduceri', en: 'Discounts' } }
      ]
    },
    {
      id: 'sport', icon: '🏊',
      name: { hu: 'Sport', ro: 'Sport', en: 'Sports' },
      subcategories: []
    },
    {
      id: 'kozlekedes', icon: '🚌',
      name: { hu: 'Közlekedés', ro: 'Transport', en: 'Transport' },
      subcategories: [
        { id: 'busz',  name: { hu: 'Busz',  ro: 'Autobuz', en: 'Bus' } },
        { id: 'vonat', name: { hu: 'Vonat', ro: 'Tren',    en: 'Train' } }
      ]
    },
    {
      id: 'szoftverek', icon: '💻',
      name: { hu: 'Szoftverek', ro: 'Software', en: 'Software' },
      subcategories: []
    },
    {
      id: 'szabadido', icon: '🌿',
      name: { hu: 'Szabadidő', ro: 'Timp liber', en: 'Leisure' },
      subcategories: []
    },
    {
      id: 'gyujto', icon: '💳',
      name: { hu: 'Gyűjtőprojektek', ro: 'Platforme de reduceri', en: 'Discount hubs' },
      subcategories: []
    },
    {
      id: 'tippek', icon: '💡',
      name: { hu: 'Tippek', ro: 'Sfaturi', en: 'Tips' },
      subcategories: []
    }
  ],

  /* ---------- Szűrők (egyetem, kar/szak, ...) ----------
     Egy bejegyzésnél a "tags" mezőben adhatod meg, melyik egyetemre / karra szól.
     Ha egy bejegyzésnek nincs címkéje egy szűrőnél, akkor MINDENKINEK szól,
     és mindig megjelenik. Új egyetem vagy kar: vegyél fel egy új "option"-t. */
  filters: [
    {
      id: 'univ',
      name: { hu: 'Egyetem', ro: 'Universitate', en: 'University' },
      options: [
        { id: 'bbte', name: { hu: 'BBTE (UBB)', ro: 'UBB', en: 'UBB (Babeș-Bolyai)' } },
        { id: 'utcn', name: 'UTCN' }
      ]
    },
    {
      id: 'faculty',
      name: { hu: 'Kar / szak', ro: 'Facultate / specializare', en: 'Faculty / major' },
      options: [
        { id: 'fsega', name: 'FSEGA' }
      ]
    }
  ],

  /* ---------- Bejegyzések ----------
     status: 'draft'  → "Hamarosan" címke; a részletes tartalom még készül.
     Kötelező: id, category, title.  A többi elhagyható.
     A "guide" blokkjai (lépések, kártyák, jegyzetek…) a README-ben vannak leírva. */
  items: [

    /* ===================== ÉTEL ===================== */
    {
      id: 'fsega-kantin',
      category: 'etel',
      sub: 'kantinok',
      title: 'FSEGA kantin',
      summary: 'Hol, mikor és mennyiért ebédelhetsz az egyetemen – kedvezménnyel. Az FSEGA épület −1 szintjén lévő kantinban student card-dal 20% kedvezményt kapsz.',
      who: 'Egyetemisták (student card-dal)',
      needs: 'Student card',
      tags: { faculty: ['fsega'] },
      updated: '2026-10-22',
      guide: [
        { type: 'facts', items: [
          { label: 'Nyitvatartás',   value: '12:00–15:30', sub: 'délben 12-től fél 4-ig' },
          { label: 'Kedvezmény',     value: '−20%',        sub: 'student card-dal' },
          { label: 'Átlagos ebédár', value: '10–20 lej',   sub: 'kedvezménnyel együtt' },
          { label: 'Helyszín',       value: '−1 szint',    sub: 'FSEGA épület' }
        ] },
        { type: 'steps', items: [
          { title: 'Érkezz 12:00 és 15:30 között', text: 'A kantin ebben az idősávban van nyitva, vagyis délben 12-től fél 4-ig.' },
          { title: 'Menj le a −1 szintre', text: 'Lépj be az FSEGA épületébe (Str. Teodor Mihali 58–60), és menj le a −1 szintre – itt találod a kantint.' },
          { title: 'Válaszd ki az ebédedet', text: 'Egy átlagos ebéd leves + második fogásból áll.' },
          { title: 'Fizess a student card-oddal', text: 'Fizetéskor mutasd meg a student card-odat (románul: legitimație de student) – így 20% kedvezményt kapsz. Kedvezménnyel együtt egy átlagos ebéd kb. 10–20 lej.' }
        ] },
        { type: 'defs', title: 'Hogyan találsz oda?', items: [
          { term: 'Cím',     text: 'Str. Teodor Mihali 58–60, Cluj-Napoca' },
          { term: 'Épület',  text: 'FSEGA (Közgazdaság- és Gazdálkodástudományi Kar)' },
          { term: 'Szint',   text: '−1 (alagsor) – a kantin az épületen belül van.' }
        ] },
        { type: 'links', items: [
          { label: 'Térkép megnyitása', url: 'https://www.google.com/maps/search/?api=1&query=Str.%20Teodor%20Mihali%2058-60%2C%20Cluj-Napoca' }
        ] },
        { type: 'list', title: 'Jó tudni', items: [
          'Mindig vidd magaddal a student card-ot – anélkül nincs kedvezmény.',
          'Egyes listákban Cafeteria Economica néven szerepel.',
          'Mentsd el a térképet a telefonodra, hogy ne tévedj el az épületben.',
          'Az árak és a nyitvatartás változhatnak (pl. ünnepnapokon) – ha bizonytalan vagy, kérdezz rá a helyszínen.'
        ] }
      ],
      sources: 'a megadott kantin-adatok; az FSEGA és az ESN Cluj hivatalos elérhetőségei (cím, kantinlista). Az adatok tájékoztató jellegűek, a helyszínen változhatnak.'
    },
    {
      id: 'bbte-kantin',
      category: 'etel',
      sub: 'kantinok',
      status: 'draft',
      title: 'BBTE kantin',
      tags: { univ: ['bbte'] }
    },
    {
      id: 'utcn-kantin',
      category: 'etel',
      sub: 'kantinok',
      status: 'draft',
      title: 'UTCN kantin',
      tags: { univ: ['utcn'] }
    },

    /* ===================== SPORT ===================== */
    {
      id: 'babes-park-uszoda',
      category: 'sport',
      status: 'draft',
      title: 'Babeș park – Complexul de Natație'
    },
    {
      id: 'bazin-olimpic-utcn',
      category: 'sport',
      status: 'draft',
      title: 'Bazin Olimpic – UTCN',
      tags: { univ: ['utcn'] }
    },

    /* ===================== KÖZLEKEDÉS ===================== */
    {
      id: 'ctp-busz',
      category: 'kozlekedes',
      sub: 'busz',
      status: 'draft',
      title: 'CTP – helyi busz',
      summary: 'A kolozsvári helyi tömegközlekedés (CTP) diákbérlete. A részletes útmutató még készül.',
      who: 'BBTE nappali tagozatos, 30 év alatti hallgatók (2026/2027-es tanév)',
      guide: [
        { type: 'note', tone: 'info', title: 'Amit eddig tudunk',
          text: 'A CTP közleménye szerint a 2026/2027-es tanévben a BBTE nappali tagozatos, 30 év alatti hallgatói közvetlenül a CTP-nél intézhetik a bérletet: első évesként online kérhetsz utazási kártyát a ctpcj.ro oldalon. Az A Kártya app leírása szerint az A Kártyával ingyenes buszbérlet is kiváltható. Az aktuális szabályt mindig a CTP oldalán ellenőrizd.' },
        { type: 'links', items: [ { label: 'ctpcj.ro', url: 'https://ctpcj.ro' } ] }
      ],
      sources: 'KMDSZ A Kártya útmutató; CTP közlemény (Szabadság, 2026. szept. 25.).'
    },
    {
      id: 'vonat-legitimatie',
      category: 'kozlekedes',
      sub: 'vonat',
      status: 'draft',
      title: 'Vonat – legitimație (diákkedvezmény)'
    },

    /* ===================== SZOFTVEREK ===================== */
    {
      id: 'gemini-drive',
      category: 'szoftverek',
      title: 'Google AI Plus – Gemini és Google Drive',
      summary: 'A felsőoktatásban tanuló diákok 12 hónapig ingyen használhatják a prémium Google AI Plus csomagot: fejlettebb Gemini AI és 400 GB felhőtárhely (Drive, Gmail, Fotók).',
      who: 'Felsőoktatási intézmény aktív, legalább 18 éves hallgatói',
      needs: 'Személyes Google-fiók (@gmail.com), diákstátusz-igazolás, bankkártya',
      guide: [
        { type: 'list', title: 'Előfeltételek és jogosultságok', items: [
          'Személyes fiók kötelező: az igénylést a személyes (@gmail.com) fiókoddal kell elvégezned. Az egyetemi (intézményi) Workspace-fiókok az adminisztrátori korlátozások miatt nem használhatók az előfizetés fogadására.',
          'Érvényes hallgatói jogviszony: akkreditált felsőoktatási intézmény aktív hallgatójának kell lenned, és be kell töltened a 18. életévedet.',
          'Fizetési mód: a regisztrációhoz érvényes bankkártyát kell megadnod; az első évben nem vonnak le tőled pénzt.'
        ] },
        { type: 'steps', items: [
          { title: 'Jelentkezz be a személyes Google-fiókodba', text: 'Nyisd meg a böngészőt, és győződj meg arról, hogy a személyes Google-fiókodba vagy bejelentkezve. Ellenőrizd a jobb felső sarokban a profilképedet, hogy véletlenül se az intézményi fiókod legyen az aktív profil.' },
          { title: 'Keresd fel az igénylési oldalt', text: 'Látogass el a hivatalos diákoldalra: one.google.com/ai-student vagy gemini.google/students. Kattints az „Ajánlat beváltása” vagy „Diákstátusz igazolása” lehetőségre.' },
          { title: 'Igazold a diákstátuszodat a SheerID felületén', text: 'A rendszer átirányít a SheerID igazoló oldalára. Itt meg kell adnod az egyetemed vagy főiskolád pontos nevét, a hivatalos teljes neved és születési dátumod, valamint az egyetemi e-mail címed.\nHa az automatikus azonosítás nem sikerül, tölts fel igazoló dokumentumot (pl. aktív diákigazolvány fotója, jogviszony-igazolás vagy érvényes órarend).' },
          { title: 'Állítsd be a fizetési módot, és véglegesítsd', text: 'A sikeres SheerID ellenőrzés után térj vissza a Google One oldalára, és add meg a bankkártyád adatait a számlázási profilhoz. Az első 12 hónap ingyenes. Az összegzésnél ellenőrizd, hogy a fizetendő összeg nulla, majd erősítsd meg a megrendelést.' }
        ] },
        { type: 'cards', title: 'Mit kapsz?', items: [
          { title: '400 GB felhőtárhely', text: 'Bőséges tárhely a Google Drive, Gmail és Google Fotók számára a tanulmányi anyagok és nagy méretű fájlok biztonságos tárolására.' },
          { title: 'Gemini Advanced AI', text: 'Közvetlen hozzáférés a legújabb Gemini modellhez, magasabb használati korlátokkal és összetett feladatelvégzési képességgel.' },
          { title: 'Workspace-integráció', text: 'A Gemini funkciók közvetlen elérése a Google Dokumentumok, Táblázatok, Prezentációk és a Gmail felületén belül.' },
          { title: '12 hónap ingyenesség', text: 'Teljesen díjmentes hozzáférés egy éven át a jogosult egyetemi hallgatók számára, kötelezettségmentes próbaidőszakkal.' }
        ] },
        { type: 'note', title: 'Hogyan kerülheted el az automatikus terhelést?',
          text: 'A 12 hónapos ingyenes időszak után az előfizetés automatikusan átvált a normál havi díjas csomagra. Ha nem szeretnéd folytatni a fizetős időszakot, lépj be a one.google.com felületére, és a Beállítások menüpontban válaszd az Előfizetés lemondása lehetőséget.\nA lemondást az aktiválás után bármikor elvégezheted; a 12 hónapos ingyenes hozzáférésed a próbaidőszak végéig megmarad.' },
        { type: 'links', items: [
          { label: 'one.google.com/ai-student', url: 'https://one.google.com/ai-student' },
          { label: 'gemini.google/students', url: 'https://gemini.google/students' }
        ] }
      ]
    },
    {
      id: 'microsoft-office',
      category: 'szoftverek',
      title: 'Microsoft Office (Microsoft 365)',
      summary: 'A BBTE együttműködik a Microsofttal, ezért minden hallgató ingyen használhatja a Microsoft 365 csomagot az egyetemi e-mail címével – böngészőben és telepítve is.',
      who: 'BBTE hallgatók',
      needs: 'Egyetemi e-mail cím (@stud.ubbcluj.ro)',
      tags: { univ: ['bbte'] },
      updated: '2026-10-22',
      guide: [
        { type: 'facts', items: [
          { label: 'Ár',          value: 'Ingyenes',   sub: 'az egyetemi fiókoddal' },
          { label: 'Kell hozzá',  value: 'Egyetemi e-mail', sub: '@stud.ubbcluj.ro' },
          { label: 'Tárhely',     value: '1 TB',       sub: 'OneDrive felhőtárhely' },
          { label: 'Bejelentkezés', value: 'portal.office.com' }
        ] },
        { type: 'steps', items: [
          { title: 'Keresd meg az adataidat', text: 'Az AcademicInfo felületen, az Informații oldalon találod az e-mail címed (prenume.nume@stud.ubbcluj.ro) és a kezdő jelszavad. Ha nem találod: „Recuperare cont” (fiók-visszaállítás).' },
          { title: 'Jelentkezz be', text: 'Nyisd meg a portal.office.com oldalt, add meg az egyetemi e-mail címed, majd a kezdő jelszót.' },
          { title: 'Állítsd be a fiókot', text: 'Az első belépéskor cseréld le a jelszót, és adj meg egy másik (pl. Gmail) e-mail címet a jelszó-visszaállításhoz. Előfordulhat, hogy a Microsoft Authenticator appot is be kell állítanod.' },
          { title: 'Telepítsd, vagy használd online', text: 'A főoldalon az Install apps (Microsoft 365 apps) gombbal a gépedre telepítheted a programokat; de böngészőben, telepítés nélkül is használhatod őket.' }
        ] },
        { type: 'cards', title: 'Mit kapsz?', items: [
          { title: 'Irodai programok', text: 'Word, Excel, PowerPoint és OneNote – böngészőben, vagy a gépedre telepítve, internet nélkül (offline) is.' },
          { title: 'Levelezés és naptár', text: 'Egyetemi postafiók (Outlook) a tanárokkal való levelezéshez, naptárral. Weben: outlook.office.com.' },
          { title: 'Teams és OneDrive', text: 'Teams: online kurzusok, feladatok, videóhívások. OneDrive: 1 TB felhőtárhely a fájljaidnak.' }
        ] },
        { type: 'note', title: 'Ha elakadsz',
          text: 'Nem tudsz belépni, vagy nem látsz alkalmazásokat? Írj a help.office365@ubbcluj.ro címre. A tárgy: Probleme O365 student [prenume.nume], az üzenetbe pedig írd le röviden a problémát.' },
        { type: 'list', title: 'Jó tudni', items: [
          'A hozzáférés a hallgatói jogviszonyhoz kötött lehet – diploma után ne csak az egyetemi OneDrive-on tárold a fontos fájlokat.',
          'A Teams app iOS-re és Androidra is van – ugyanazzal a fiókkal jelentkezz be.'
        ] },
        { type: 'links', items: [
          { label: 'portal.office.com', url: 'https://portal.office.com' },
          { label: 'outlook.office.com', url: 'https://outlook.office.com' },
          { label: 'help.office365@ubbcluj.ro', url: 'mailto:help.office365@ubbcluj.ro' }
        ] }
      ],
      sources: 'BBTE Matematika-Informatika Kar (cs.ubbcluj.ro), BBTE hallgatói Microsoft 365 útmutató, BBTE DTIC. A szolgáltatás és a menük változhatnak.'
    },
    {
      id: 'revolut',
      category: 'szoftverek',
      title: 'Revolut diákkedvezmények',
      summary: 'A Revolut mobilbank-alkalmazás Romániában külön, ingyenes előnycsomagot ad az egyetemistáknak: magasabb megtakarítási kamat, dupla hűségpont és ingyenes előfizetések (a Revolut becslése szerint kb. 2 100 lej értékben egy évre).',
      who: '18–24 éves egyetemisták, akiknek van egyetemi e-mail-címük',
      deadline: 'Jelentkezés 2027. szeptember 1-ig',
      needs: 'Revolut-fiók és egyetemi e-mail-cím',
      updated: '2026-10-20',
      guide: [
        { type: 'note', tone: 'info', text: 'Az adatok állapota: 2026. október 20. Az aktuális, pontos feltételeket mindig az appban ellenőrizd.' },
        { type: 'facts', items: [
          { label: 'Ár',            value: 'Ingyenes',     sub: 'a Standard fiók is elég' },
          { label: 'Érték',         value: 'kb. 2 100 lej', sub: 'egy évre (Revolut-becslés)' },
          { label: 'Jelentkezés',   value: 'szept. 1-ig',  sub: '2027. szeptember 1-ig' },
          { label: 'Az ajánlat vége', value: '2027. dec. 31.' }
        ] },
        { type: 'steps', intro: 'Kb. 5 perc az egész. Ehhez kell: okostelefon és az egyetemi e-mail-címed.', items: [
          { title: 'Frissítsd az appot', text: 'Telepítsd a Revolut appot, vagy frissítsd a legújabb verzióra.', tip: 'Régi verzióban lehet, hogy nem látod a diákelőnyök menüt.' },
          { title: 'Legyen Revolut-fiókod', text: 'Ha még nincs fiókod, nyiss egyet az appban. Ha már van, ugorj a 3. lépésre.', tip: 'Nem kell fizetős csomag: az ingyenes Standard fiók is elég a diákelőnyökhöz.' },
          { title: 'Nyisd meg a diákelőnyöket', text: 'Az appban nyisd meg a profilodat, és válaszd a „Beneficii pentru studenți” menüpontot (angolul: „Student benefits”). Utána kövesd a képernyőn megjelenő lépéseket.', tip: 'A menü neve az app nyelvétől függ.' },
          { title: 'Igazold, hogy egyetemista vagy', text: 'Add meg az egyetemi e-mail-címedet, és erősítsd meg.', tip: 'Az egyetemi e-mail-címedre van szükség, ezzel igazolod a hallgatói jogviszonyodat.' },
          { title: 'Kész, használd az előnyöket', text: 'A kedvezmények elindulnak, és a tanulmányaid idejére érvényesek.', tip: 'A részleteket (pl. az előfizetések) az app diákelőnyök oldalán látod.' },
          { title: 'Évente erősítsd meg újra', text: 'Évente egyszer újra meg kell erősítened az egyetemi e-mail-címedet.', tip: 'Tedd be a naptáradba! Ha kihagyod, a kedvezmények megszűnnek.' }
        ] },
        { type: 'cards', title: 'Mit kapsz diákként?', intro: 'Hét előny, mindegyik ingyenes a Student Benefits csomagban.', items: [
          { title: 'Magasabb megtakarítási kamat',
            text: 'Ha pénzt teszel félre a Revolut azonnal hozzáférhető megtakarítási számláján, a bank kamatot fizet utána. Diákként ezt a kamatot megemelik.',
            lines: [
              { label: 'Mit kapsz', value: '+0,25 százalékpont a megszokott kamat fölött. Példa (csak szemléltetés): 4,00% helyett 4,25%.' },
              { label: 'Meddig tart', value: '2027. december 31-ig, amíg jogosult vagy' },
              { label: 'Mire figyelj', value: 'Nem vonható össze más akciós kamattal. A Profit.ro szerint a csomagok kamatával együtt akár 4,5% éves kamat is elérhető.' }
            ] },
          { title: 'Dupla RevPoints',
            text: 'A RevPoints hűségpont: vásárláskor kapod. Nem pénz, de beválthatod (repülőmérföld, ajándékkártya stb.).',
            lines: [
              { label: 'Mit kapsz', value: 'Kétszer annyi pont jár kiválasztott helyeken, pl. Ryanair és Vinted. A Profit.ro szerint a Sephora, a Spotify és a Netflix is köztük van.' },
              { label: 'Meddig tart', value: 'Amíg jogosult vagy' },
              { label: 'Mire figyelj', value: 'Csak kiválasztott boltoknál és kategóriákban működik. Más akciós pontszorzóval nem vonható össze.' }
            ] },
          { title: 'ChatGPT Go',
            text: 'Mesterséges intelligencia alapú asszisztens: tanuláshoz, íráshoz, ötleteléshez.',
            lines: [ { label: 'Mit kapsz', value: '6 hónap ingyen' }, { label: 'Mire figyelj', value: 'A részleteket az appban a diákelőnyök oldalon látod.' } ] },
          { title: 'Superhuman Go',
            text: 'Helyesírás-ellenőrző és AI-s írássegítő a szövegeidhez (dolgozat, e-mail).',
            lines: [ { label: 'Mit kapsz', value: '12 hónap ingyen' }, { label: 'Mire figyelj', value: 'A részleteket az appban a diákelőnyök oldalon látod.' } ] },
          { title: 'Kickresume Premium',
            text: 'Önéletrajz-készítő program AI-val, több mint 40 sablonnal. Van benne ATS-ellenőrző is (az ATS a cégek automatikus önéletrajz-szűrő rendszere).',
            lines: [ { label: 'Mit kapsz', value: '12 hónap ingyen' }, { label: 'Mire figyelj', value: 'A részleteket az appban a diákelőnyök oldalon látod.' } ] },
          { title: 'Canva Pro',
            text: 'Grafikai tervezőprogram: prezentációk, plakátok, közösségimédia-posztok készítésére.',
            lines: [ { label: 'Mit kapsz', value: '1 év ingyen' }, { label: 'Mire figyelj', value: 'A részleteket az appban a diákelőnyök oldalon látod.' } ] },
          { title: 'Financial Times (FT Edit)',
            text: 'Angol nyelvű nemzetközi gazdasági és világhírek.',
            lines: [ { label: 'Mit kapsz', value: '1 év hozzáférés' }, { label: 'Mire figyelj', value: 'A részleteket az appban a diákelőnyök oldalon látod.' } ] }
        ] },
        { type: 'defs', title: 'Ki kaphatja meg, és meddig?', intro: 'A Revolut hivatalos feltételei alapján, egyszerűen megfogalmazva.', items: [
          { term: 'Életkor', text: '18–24 év.' },
          { term: 'Ki jogosult?', text: 'Aki jelenleg egyetemi hallgató egy brit vagy EGT-beli egyetemen, és van egyetemi e-mail-címe. (Az EGT az EU országai plusz Izland, Liechtenstein és Norvégia.)' },
          { term: 'Revolut-fiók', text: 'Kell hozzá Revolut-fiók. Ha még nincs, az igénylés előtt nyiss egyet.' },
          { term: 'Jelentkezési időszak', text: '2026. szeptember 8. és 2027. szeptember 1. között lehet jelentkezni.' },
          { term: 'Az ajánlat vége', text: '2027. december 31.' },
          { term: 'Éves újraigazolás', text: 'Évente egyszer újra meg kell erősítened az egyetemi e-mail-címedet.' },
          { term: 'Mikor szűnnek meg az előnyök?', text: 'Attól függően, hogy melyik következik be előbb: elvégzed az egyetemet, eléred a korhatárt, kihagyod az éves újraigazolást, vagy lejár az ajánlat.' },
          { term: 'Mit tarthatsz meg?', text: 'Ami már megvan, az megmarad: a jóváírt kamat és a megszerzett RevPoints nem vesznek el.' },
          { term: 'Díj', text: 'A diákelőnyökért nem fizetsz.' }
        ] },
        { type: 'defs', collapsible: true, title: 'Fogalmak – mit jelentenek a szakszavak?', intro: 'Ha valamit nem értesz, itt megtalálod.', items: [
          { term: 'Revolut', text: 'Mobilbank: a számládat és a kártyádat az appból kezeled. Romániában a Revolut Bank UAB bukaresti fiókja nyújtja a szolgáltatást.' },
          { term: 'Student Benefits (diákelőnyök)', text: 'A Revolut ingyenes csomagja egyetemistáknak: magasabb kamat, dupla pont és ingyenes előfizetések.' },
          { term: 'Megtakarítási számla (Economii cu acces instant)', text: 'Olyan számla, ahová félreteheted a pénzt. Kamatot kapsz utána, és bármikor hozzáférsz a pénzedhez.' },
          { term: 'Kamat', text: 'A bank jutalma azért, hogy nála tartod a pénzed. Például 4% kamat azt jelenti, hogy 100 lejből egy év alatt kb. 4 lej lesz hozzá.' },
          { term: 'DAE', text: 'Román rövidítés: éves effektív kamat. Ennyit hoz a pénzed egy év alatt.' },
          { term: 'Százalékpont', text: 'Két százalék közti különbség. Ha a kamatod 4,00%, és +0,25 százalékpontot kapsz, akkor 4,25% lesz.' },
          { term: 'RevPoints', text: 'A Revolut hűségpontjai. Vásárláskor gyűjtöd, és beválthatod repülőmérföldre, szállásfoglalási kedvezményre, ajándékkártyára vagy mobiladatra. Nem pénz, nem váltható készpénzre. A be nem váltott pontok a megszerzésüktől számított 3 évig érvényesek.' },
          { term: 'Dupla RevPoints (2x)', text: 'Kiválasztott boltoknál kétszer annyi pontot kapsz, mint egyébként.' },
          { term: 'Egyetemi e-mail-cím', text: 'Az egyetemed által adott e-mail-cím. Ezzel igazolod, hogy hallgató vagy.' },
          { term: 'Éves újraigazolás', text: 'Évente egyszer újra meg kell erősítened, hogy még egyetemista vagy.' },
          { term: 'Standard csomag', text: 'A Revolut ingyenes alapcsomagja. A diákelőnyökhöz ez is elég.' },
          { term: 'Fizetős csomag (Plus, Premium)', text: 'Havidíjas csomag több funkcióval. A diákelőnyökhöz nem kötelező.' },
          { term: 'Promóció (akció)', text: 'Időkorlátos ajánlat. Ez az ajánlat 2027. december 31-ig tart.' }
        ] },
        { type: 'links', title: 'Források', items: [
          { label: 'Revolut Student (RO)', url: 'https://www.revolut.com/ro-RO/student/' },
          { label: 'Student Benefits promóció feltételei', url: 'https://www.revolut.com/ro-RO/legal/student-benefits-promotion/' },
          { label: 'Revolut Súgó: a diákelőnyök lejárata', url: 'https://help.revolut.com/en-RO/help/plans-and-benefits/student-benefits/student-benefits-expiry/' },
          { label: 'Profit.ro', url: 'https://www.profit.ro/povesti-cu-profit/financiar/foto-revolut-lanseaza-in-romania-un-pachet-dedicat-studentilor-cu-anumite-varste-22789376' },
          { label: 'Revolut RevPoints feltételek (RO)', url: 'https://www.revolut.com/en-RO/legal/RevPoints/' }
        ] }
      ]
    },

    /* ===================== SZABADIDŐ ===================== */
    {
      id: 'botanikus-kert',
      category: 'szabadido',
      status: 'draft',
      title: 'Alexandru Borza – Botanikus kert'
    },
    {
      id: 'bbte-muzeumok',
      category: 'szabadido',
      status: 'draft',
      title: 'BBTE múzeumok',
      tags: { univ: ['bbte'] }
    },
    {
      id: 'bbte-csillagvizsgalo',
      category: 'szabadido',
      status: 'draft',
      title: 'BBTE csillagvizsgáló',
      tags: { univ: ['bbte'] }
    },

    /* ===================== GYŰJTŐPROJEKTEK ===================== */
    {
      id: 'a-kartya-kmdsz',
      category: 'gyujto',
      title: 'A Kártya – KMDSZ',
      summary: 'Az A Kártya a Kolozsvári Magyar Diákszövetség (KMDSZ) ingyenes diákkártyája, telefonos appként: kedvezmények, KMDSZ-programok és szavazások egy helyen.',
      who: 'Kolozsváron tanuló magyar diákok',
      needs: 'Student card (az app használatához)',
      updated: '2026-10-22',
      guide: [
        { type: 'facts', items: [
          { label: 'Ár',        value: 'Ingyenes',    sub: 'letöltés és regisztráció' },
          { label: 'Kell hozzá', value: 'Student card', sub: 'az app használatához' },
          { label: 'Elérhető',  value: 'iOS + Android', sub: 'App Store · Google Play' }
        ] },
        { type: 'steps', title: 'Hogyan kezdd el? – 4 lépésben', items: [
          { title: 'Töltsd le az appot', text: 'Keresd a boltban: KMDSZ A Kártya (iPhone) vagy A Kártya (Android).' },
          { title: 'Regisztrálj', text: 'Add meg az adataidat az appban. Tartsd kéznél a student card-odat, mert az egyetemista státuszodhoz szükséges.' },
          { title: 'Ellenőrzés', text: 'Ha elutasítják a jelentkezésedet, az újabb verzióban PDF-et is feltölthetsz. Kérdés esetén írj: akartya@kmdsz.ro.' },
          { title: 'Használd', text: 'Partnereknél a kedvezményekhez, a KMDSZ rendezvényeken a belépéshez. Nézd meg a programokat és a szavazásokat is.' }
        ] },
        { type: 'cards', title: 'Mit tud az app?', items: [
          { title: 'Kedvezmények', text: 'Árengedmények a partnereknél, pl. kocsmákban, éttermekben, fodrászatoknál és fogászatokon. A pontos listát az appban találod.' },
          { title: 'KMDSZ programok', text: 'Információk a KMDSZ által szervezett programokról, és belépés a rendezvényekre, pl. a KMDSZ Diáknapokra.' },
          { title: 'Szavazások', text: 'A KMDSZ által kiírt szavazásokon részt vehetsz, az újabb verzióban pedig opciókat is javasolhatsz hozzájuk.' }
        ] },
        { type: 'note', title: 'Buszbérlet – ezt is tudd',
          text: 'Az app leírása szerint az A Kártyával ingyenes buszbérlet is kiváltható. A CTP közleménye szerint viszont a 2026/2027-es tanévben a BBTE nappali tagozatos, 30 év alatti hallgatói közvetlenül a CTP-nél intézhetik: első évesként online kérhetsz utazási kártyát a ctpcj.ro oldalon. Az aktuális szabályt mindig ott ellenőrizd.' },
        { type: 'text', title: 'KMDSZ iroda', text: 'Avram Iancu (Petőfi) u. 21., Kolozsvár' },
        { type: 'links', items: [
          { label: 'akartya.ro', url: 'https://akartya.ro' },
          { label: 'akartya@kmdsz.ro', url: 'mailto:akartya@kmdsz.ro' }
        ] }
      ],
      sources: 'App Store és Google Play leírás, akartya.ro, KMDSZ, CTP közlemény (Szabadság, 2026. szept. 25.). A partnerek és a szabályok változhatnak.'
    },
    {
      id: 'isic-kartya',
      category: 'gyujto',
      status: 'draft',
      title: 'ISIC kártya'
    },
    {
      id: 'diverzum',
      category: 'gyujto',
      status: 'draft',
      title: 'Diverzum'
    }
  ]
};
