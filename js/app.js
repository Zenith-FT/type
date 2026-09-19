const WORDS = `the be to of and a in that have it for not on with he as you do at this but his by from they we say her she or an will my one all would there their what so up out if about who get which go me when make can like time no just him know take people into year your good some could them see other than then now look only come its over think also back after use two how our work first well way even new want because any these give day most us are was were has had been should may might must shall being does did done going made find where much too very still learn great small large every found study home house water earth light night day morning evening today tomorrow week month hour minute second world life hand eye heart mind form fire air sun moon star sea river mountain road path journey dream idea thought word voice song book page write read speak listen watch feel touch taste walk run dance sing laugh cry love live calm soft slow fast clear dark warm cold young simple easy hard true false white black red blue green yellow gray pause breath focus tree flower grass sky cloud rain snow wind stone wood field garden park street city town school game story shadow door window wall floor roof room table chair food bread milk coffee tea fruit apple fish bird dog cat horse cow mouse sun cloud hill lake ocean beach forest desert island bridge tower clock paper pen pencil phone photo music movie night dream hope peace joy smile heart light sound color shape power magic smile laugh story song river road cloud star moon sun`.split(/\s+/);

// legacy idiom bank (content toggle removed; kept for later use)
const PHRASES = [
"the sun rises early in the morning",
"birds sing in the trees",
"my neighbor walks his dog every evening",
"she reads a great book on the beach",
"we walk slowly toward the station",
"the wind blows hard on the roofs",
"you should drink water during sports",
"the kids play in the yard",
"my father cooks very well on sundays",
"rain falls softly on the flowers",
"we love spending time together",
"the train arrives ten minutes late",
"she wears a very elegant blue dress",
"i like my coffee with no sugar in the morning",
"the mountains look great in winter",
"my cat sleeps near the window",
"we watch a funny movie tonight",
"the baker makes fresh bread every day",
"she runs in the park every morning",
"waves crash on the rocks with force",
"i will see my grandmother tomorrow",
"at night the sky is full of light",
"you did good work keep going",
"the garden smells like roses in spring",
"my brother plays guitar for two years",
"she writes a letter to her friend",
"we leave for a trip next week",
"the lake is calm and perfectly clear",
"the students listen to the teacher with care",
"i clean my room before going out",
"the soup is too hot wait a little",
"my dream is to visit japan one day",
"bees fly over the flowers in the sun",
"he always tells funny stories",
"we dance all night long",
"the stadium is full for the game tonight",
"she paints pictures with bright colors",
"i take the bus to go to work",
"the library closes its doors at eight",
"doctors say you should sleep well every night",
"a quiet morning makes the whole day better",
"fresh air and long walks clear my head",
"practice a little every day and you will improve",
"slow down and breathe between each test",
"the river runs fast after the rain",
"old friends always find their way back",
"a warm meal tastes better when shared",
"the city wakes up before the sun",
"small steps every day build strong habits",
"music helps me focus when i study",
"the dog barks loudly at the mailman",
"winter nights are long and silent",
"a good book can change your whole week",
"the coffee shop opens early on weekends",
"children laugh louder than anyone else",
"the road ahead looks bright and clear",
"my sister draws pictures of the ocean",
"autumn leaves fall slowly to the ground",
"a kind word can save a bad day",
"the moon lights up the quiet street",
"we share stories around the warm fire",
"morning fog hides the hills from view",
"the old bridge crosses the wide river",
"every mistake teaches something new",
"the stars shine brighter far from town",
"a short break makes the mind sharper",
"the market sells fresh fruit each morning",
"my keys are always lost in my bag",
"the phone rings right during dinner",
"a rainy day is perfect for reading",
"the team plays better when fans cheer",
"soft music fills the little cafe",
"the snow covers the garden in white",
"my plants need water twice a week",
"the bus stops right in front of school",
"a smile costs nothing but means a lot",
"the sea smells of salt and summer",
"we pack our bags the night before",
"heavy clouds bring the storm closer",
"the baby sleeps through all the noise",
"my favorite season starts with falling leaves",
"the light turns green and cars move on",
"break a leg",
"call it a day",
"under the weather",
"spill the beans",
"bite the bullet",
"hit the sack",
"through thick and thin",
"once in a blue moon",
"beat around the bush",
"cutting corners",
"piece of cake",
"blessing in disguise",
"costs an arm and a leg",
"back to the drawing board",
"barking up the wrong tree",
"burn the midnight oil",
"don't judge a book by its cover",
"hit the nail on the head",
"let the cat out of the bag",
"miss the boat",
"on the fence",
"pull someone's leg",
"so far, so good",
"speak of the devil",
"that's the last straw",
"time flies when you're having fun",
"to make matters worse",
"well begun is half done",
"your guess is as good as mine",
"a dime a dozen",
"add fuel to the fire",
"ball is in your court",
"bite off more than you can chew",
"by the skin of your teeth",
"comparing apples to oranges",
"cry over spilled milk",
"curiosity killed the cat",
"devil's advocate",
"don't put all your eggs in one basket",
"every cloud has a silver lining",
"get out of hand",
"get your act together",
"give someone the benefit of the doubt",
"go back to square one",
"good things come to those who wait",
"ignorance is bliss",
"it takes two to tango",
"jump on the bandwagon",
"keep your chin up",
"kill two birds with one stone",
"leave no stone unturned",
"let bygones be bygones",
"like two peas in a pod",
"method to my madness",
"no pain, no gain",
"off the hook",
"on top of the world",
"out of the blue",
"play second fiddle",
"pull yourself together",
"rain on someone's parade",
"seeing eye to eye",
"shape up or ship out",
"sit tight",
"slow and steady wins the race",
"straight from the horse's mouth",
"take it with a grain of salt",
"the elephant in the room",
"throw in the towel",
"tie the knot",
"to each his own",
"too many cooks spoil the broth",
"twist someone's arm",
"up in the air",
"weather the storm",
"when pigs fly",
"wrap your head around something",
"you can't have your cake and eat it too",
"a blessing in disguise",
"actions speak louder than words",
"as cool as a cucumber",
"at the drop of a hat",
"better late than never",
"bite the tongue",
"burn bridges",
"butterflies in my stomach",
"by word of mouth",
"call a spade a spade",
"catch someone off guard",
"clear the air",
"come hell or high water",
"cross that bridge when you come to it",
"down to the wire",
"draw the line",
"face the music",
"fly off the handle",
"get a taste of your own medicine",
"hit the ground running",
];

// ---- storage: localStorage first, legacy cookies imported once ----
function storeGet(key, fb) {
  try {
    const v = localStorage.getItem('type.' + key);
    if (v != null) return JSON.parse(v);
  } catch {}
  try {
    if (key === 'history') {
      const h = loadBig('type-epure-history', null);
      if (h) { storeSet(key, h); delBig('type-epure-history'); return h; }
    } else if (key.indexOf('best.') === 0) {
      const c = getCookie('type-epure-best-' + key.slice(5));
      if (c != null && c !== '') { const v = JSON.parse(c); storeSet(key, v); delCookie('type-epure-best-' + key.slice(5)); return v; }
    } else {
      const c = getCookie('type-epure-' + key);
      if (c != null && c !== '') { const v = JSON.parse(c); storeSet(key, v); delCookie('type-epure-' + key); return v; }
    }
  } catch {}
  return fb;
}
function storeSet(key, val) {
  try { localStorage.setItem('type.' + key, JSON.stringify(val)); return; } catch {}
  try {
    if (key === 'history') saveBig('type-epure-history', val);
    else if (key.indexOf('best.') === 0) setCookie('type-epure-best-' + key.slice(5), JSON.stringify(val));
    else setCookie('type-epure-' + key, JSON.stringify(val));
  } catch {}
}
function storeDel(key) {
  try { localStorage.removeItem('type.' + key); } catch {}
  try {
    if (key === 'history') delBig('type-epure-history');
    else if (key.indexOf('best.') === 0) delCookie('type-epure-best-' + key.slice(5));
    else delCookie('type-epure-' + key);
  } catch {}
}

// ---- modes: time / words / quote / zen + punctuation / numbers (monkeytype-inspired) ----
let testMode = 'time'; // 'time' | 'words' | 'quote' | 'zen'
let wordCount = 25;
let usePunct = false;
let useNumbers = false;
let language = 'english'; // 'english' | 'french'
let sessionStart = Date.now();
let quoteCurrent = null;
let fullTargetWords = []; // for words/quote: full test text
let fullTargetIndex = 0; // offset of current line in fullTargetWords
let presentedWords = []; // every word shown this run (for replay/race)
let eventLog = []; // {t, k:'char'|'space'|'back', ch}
let rawSamples = [], errSamples = [], errEvents = [];
let charHist = []; // cumulative correct chars per second (ghost pacing curve)
let lastErrTotal = 0;
let keysThisSec = 0, lastBurstSec = -1, burstHistory = [];
let ghostActive = false, ghostWpm = 0, ghostStart = 0, ghostTimer = null, ghostProgress = 0;
let ghostCurve = null, ghostSpan = -1;
let rematchEndless = false;
let lastRun = null; // {wpm,raw,words,text,events,wpmHist,rawHist,errHist,config,duration}
let replayTimers = [];
try {
  const mc = storeGet('modes', {});
  if (mc.testMode === 'time' || mc.testMode === 'words' || mc.testMode === 'quote' || mc.testMode === 'zen') testMode = mc.testMode;
  if ([10,25,50,100].includes(+mc.wordCount)) wordCount = +mc.wordCount;
  if ([15,30,60,120,300].includes(+mc.timeLimit)) window._pendingTimeLimit = +mc.timeLimit;
  if (typeof mc.usePunct === 'boolean') usePunct = mc.usePunct;
  if (typeof mc.useNumbers === 'boolean') useNumbers = mc.useNumbers;
  if (mc.language === 'english' || mc.language === 'french') language = mc.language;
} catch {}
function saveModes() { try { storeSet('modes', {testMode, wordCount, timeLimit, usePunct, useNumbers, language, quoteLen}); } catch {} }
function setLanguage(l) {
  if (l !== 'english' && l !== 'french') return;
  language = l;
  saveModes();
  reset();
}

// ---- content banks: monkeytype data files (data/*.json), local fallback ----
const FALLBACK_WORDS_FR = `le de un une des du est sont et en dans que qui pour pas plus sur par avec tout faire son sa ses leur leurs notre votre mais ou donc ni car comme tous toute toutes fait font entre autre autres apres avant pendant contre depuis sans sous chez vers entre temps jour nuit main yeux coeur monde vie jour homme femme enfant petit grand nouveau premier deux trois bien encore aussi tres peu beaucoup plus moins non oui merci bon jour soir matin midi minuit semaine mois annee heure minute seconde fois monde terre ciel soleil lune etoile mer montagne rue ville ecole livre mot voix chant porte table chaise pain lait cafe fruit poisson oiseau chien chat cheval eau feu air lire ecrire parler ecouter marcher courir rire pleurer aimer vivre calme doux lent vite clair blanc noir rouge bleu vert pause arbre fleur herbe nuage pluie neige vent pierre bois jardin rue reve idee calme`.split(/\s+/);
const FALLBACK_QUOTES_FR = [
  {text: "Je pense, donc je suis.", source: "Descartes"},
  {text: "Le coeur a ses raisons que la raison ne connait point.", source: "Pascal"},
  {text: "On ne voit bien qu avec le coeur.", source: "Saint-Exupery"},
  {text: "Il n y a qu un bonheur dans la vie, aimer et etre aime.", source: "George Sand"},
  {text: "La vie est une fleur dont l amour est le miel.", source: "Victor Hugo"},
  {text: "Petit a petit, l oiseau fait son nid.", source: "Proverbe"}
];
let quoteBank = { english: null, french: null };
let wordBank = { english: null, french: null };
const langTag = l => l === 'french' ? 'fr' : 'en';
async function loadBanks() {
  for (const lang of ['english', 'french']) {
    const tag = langTag(lang);
    try {
      const r = await fetch('data/quotes-' + tag + '.json');
      if (r.ok) {
        const j = await r.json();
        if (j && j.quotes && j.quotes.length) quoteBank[lang] = j.quotes;
      }
    } catch {}
    try {
      const r = await fetch('data/words-' + tag + '.json');
      if (r.ok) {
        const j = await r.json();
        if (j && j.words && j.words.length) wordBank[lang] = j.words;
      }
    } catch {}
  }
  try { refreshModeUI(); } catch {}
}

const QUOTES = [
  {text: "The only way to do great work is to love what you do.", source: "Steve Jobs"},
  {text: "Life is what happens when you're busy making other plans.", source: "John Lennon"},
  {text: "The future belongs to those who believe in the beauty of their dreams.", source: "Eleanor Roosevelt"},
  {text: "It does not matter how slowly you go as long as you do not stop.", source: "Confucius"},
  {text: "In the middle of difficulty lies opportunity.", source: "Albert Einstein"},
  {text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", source: "Winston Churchill"},
  {text: "The best time to plant a tree was twenty years ago. The second best time is now.", source: "Proverb"},
  {text: "You miss one hundred percent of the shots you don't take.", source: "Wayne Gretzky"},
  {text: "Whether you think you can or you think you can't, you're right.", source: "Henry Ford"},
  {text: "The mind is everything. What you think you become.", source: "Buddha"},
  {text: "Stay hungry, stay foolish.", source: "Stewart Brand"},
  {text: "Simplicity is the ultimate sophistication.", source: "Leonardo da Vinci"},
  {text: "What we think, we become.", source: "Buddha"},
  {text: "The journey of a thousand miles begins with one step.", source: "Lao Tzu"},
  {text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", source: "Ralph Waldo Emerson"},
  {text: "In three words I can sum up everything I've learned about life: it goes on.", source: "Robert Frost"},
  {text: "The only impossible journey is the one you never begin.", source: "Tony Robbins"},
  {text: "Life is really simple, but we insist on making it complicated.", source: "Confucius"},
  {text: "May the Force be with you.", source: "Star Wars"},
  {text: "I have a dream.", source: "Martin Luther King Jr."},
  {text: "Elementary, my dear Watson.", source: "Sherlock Holmes"},
  {text: "It was the best of times, it was the worst of times.", source: "Charles Dickens"},
  {text: "All that glitters is not gold.", source: "Shakespeare"},
  {text: "The cake is a lie.", source: "Portal"},
  {text: "Winter is coming.", source: "Game of Thrones"},
  {text: "With great power comes great responsibility.", source: "Spider-Man"},
  {text: "To infinity and beyond.", source: "Toy Story"},
  {text: "Just keep swimming.", source: "Finding Nemo"},
  {text: "Why so serious?", source: "The Dark Knight"},
  {text: "I think, therefore I am.", source: "Descartes"}
];
QUOTES.forEach((q,i)=>{ q.id=i+1; q.length=q.text.length; });

function randInt(a,b){ return a + ((Math.random()*(b-a+1))|0); }
function randomNumberStr(maxLen=4){
  const len = randInt(1,maxLen);
  let s = String(randInt(1,9));
  for(let i=1;i<len;i++) s += String(randInt(0,9));
  return s;
}
function capitalizeFirst(s){ return s ? s.charAt(0).toUpperCase()+s.slice(1) : s; }
// simplified monkeytype punctuateWord
function punctuateWord(word, isFirst, isLast){
  let w = word;
  if (isFirst && Math.random() < 0.9) w = capitalizeFirst(w);
  const r = Math.random();
  if (isLast) {
    const ends = ['.', '.', '.', '?', '!', ','];
    w += ends[(Math.random()*ends.length)|0];
    return w;
  }
  if (r < 0.06) w += ',';
  else if (r < 0.075) w += '.';
  else if (r < 0.085) w += '?';
  else if (r < 0.095) w += '!';
  else if (r < 0.105) w += ':';
  else if (r < 0.115) w += ';';
  else if (r < 0.125) w = '"' + w + '"';
  else if (r < 0.135) w = "'" + w + "'";
  else if (r < 0.145) w = '(' + w + ')';
  else if (r < 0.155) w += '-';
  return w;
}
function transformWord(base, isFirst, isLast){
  if (useNumbers && Math.random() < 0.1) return randomNumberStr(4);
  let w = base;
  if (usePunct) w = punctuateWord(w, isFirst, isLast);
  return w;
}
function testTypeString(){
  let s = testMode === 'time' ? ('time ' + timeLimit) : testMode === 'words' ? ('words ' + wordCount) : testMode === 'zen' ? 'zen' : 'quote';
  const mods = [];
  if (usePunct) mods.push('punctuation');
  if (useNumbers) mods.push('numbers');
  if (mods.length) s += ' + ' + mods.join(' + ');
  return s;
}
function fmtSession(ms){
  const s = Math.floor(ms/1000);
  const p = n => String(n).padStart(2,'0');
  const h = Math.floor(s/3600), m = Math.floor((s%3600)/60), sec = s%60;
  return p(h)+':'+p(m)+':'+p(sec);
}

// ---- cookie storage (no localStorage) ----
function setCookie(name, value, days=365) {
  try {
    const exp = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + exp + '; path=/; SameSite=Lax';
  } catch {}
}
function getCookie(name) {
  try {
    const parts = ('; ' + document.cookie).split('; ' + name + '=');
    if (parts.length < 2) return null;
    return decodeURIComponent(parts.pop().split(';').shift());
  } catch { return null; }
}
function delCookie(name) {
  try { document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'; } catch {}
}
// big objects: split into chunks (~4KB per cookie limit)
function saveBig(name, obj) {
  const raw = JSON.stringify(obj);
  const chunks = [];
  for (let i = 0; i < raw.length; i += 3500) chunks.push(raw.slice(i, i + 3500));
  let old = 0;
  try { old = parseInt(getCookie(name + '_n') || '0', 10) || 0; } catch {}
  for (let i = chunks.length; i < old; i++) delCookie(name + '_' + i);
  chunks.forEach((c, i) => setCookie(name + '_' + i, c));
  setCookie(name + '_n', String(chunks.length));
}
function loadBig(name, fallback) {
  try {
    const n = parseInt(getCookie(name + '_n') || '0', 10) || 0;
    if (!n) return fallback;
    let raw = '';
    for (let i = 0; i < n; i++) {
      const c = getCookie(name + '_' + i);
      if (c == null) return fallback;
      raw += c;
    }
    return JSON.parse(raw);
  } catch { return fallback; }
}
function delBig(name) {
  let n = 0;
  try { n = parseInt(getCookie(name + '_n') || '0', 10) || 0; } catch {}
  for (let i = 0; i < n; i++) delCookie(name + '_' + i);
  delCookie(name + '_n');
}

let timeLimit = 30, timeLeft = 30;
if (window._pendingTimeLimit) { timeLimit = window._pendingTimeLimit; timeLeft = timeLimit; }
let wordList = [], wordIndex = 0, charIndex = 0;
let started = false, finished = false, timer = null, startTime = 0;
let correctChars = 0, skippedChars = 0, totalTyped = 0, correctWords = 0;
let incorrectChars = 0, extraChars = 0, missedChars = 0, correctWordChars = 0;
let typedHistory = []; // per word: true/false/'skip' per char + .error + .extra
let missedRun = [];
let drillActive = false, drillQueue = [], drillTotal = 0, drillErrors = 0, drillStart = 0;
let wpmSamples = [], lastSampleSec = -1;
let heatMap = {};
try { heatMap = storeGet('heat', {}); } catch { heatMap = {}; }
let settings = { heatmap: true, nextKey: true, spark: true, kbd: true, kbdLayout: 'qwerty', autoU: false, autoSpace: true, restart: { key: 'Tab', ctrl: false, shift: false, alt: false } };
function loadSettings() {
  try {
    const ss = storeGet('settings', {});
    for (const k in settings) if (k !== 'restart' && k !== 'kbdLayout' && typeof ss[k] === 'boolean') settings[k] = ss[k];
    if (typeof ss.kbdLayout === 'string' && ss.kbdLayout) settings.kbdLayout = ss.kbdLayout.toLowerCase();
    if (ss.restart && typeof ss.restart.key === 'string')
      settings.restart = { key: ss.restart.key, ctrl: !!ss.restart.ctrl, shift: !!ss.restart.shift, alt: !!ss.restart.alt };
  } catch {}
}
loadSettings();
function saveSettings() { storeSet('settings', settings); }

const $words = document.getElementById('words');
const $input = document.getElementById('input');

function shuffle(a) {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
let transitioning = false;
function drawWord() {
  const bank = wordBank[language];
  const pool = (bank && bank.length) ? bank : (language === 'french' ? FALLBACK_WORDS_FR : WORDS);
  return pool[(Math.random() * pool.length) | 0];
}
function nextBaseWord() {
  return drawWord();
}
function makeFullList(n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const base = nextBaseWord();
    out.push(transformWord(base, i === 0, i === n - 1));
  }
  return out;
}
const QUOTE_LEN_RANGES = { short: [0, 100], medium: [101, 300], long: [301, 600], all: [0, 99999] };
let quoteLen = 'all';
try { const qm = storeGet('modes', {}); if (qm.quoteLen && QUOTE_LEN_RANGES[qm.quoteLen]) quoteLen = qm.quoteLen; } catch {}
function pickQuote() {
  const bank = quoteBank[language];
  let pool = (bank && bank.length) ? bank.slice() : (language === 'french' ? FALLBACK_QUOTES_FR.slice() : QUOTES.slice());
  const range = QUOTE_LEN_RANGES[quoteLen] || QUOTE_LEN_RANGES.all;
  const fit = pool.filter(q => { const L = q.length || (q.text || '').length; return L >= range[0] && L <= range[1]; });
  if (fit.length) pool = fit;
  const q = pool[(Math.random() * pool.length) | 0];
  quoteCurrent = q;
  return q.text.split(' ').filter(Boolean);
}
// zen: free typing (monkeytype-style) — no targets, everything you type is correct
function fillZenLine() {
  wordList = [''];
  typedHistory = [[]];
  wordIndex = 0; charIndex = 0;
  if (presentedWords[presentedWords.length - 1] !== '') presentedWords.push('');
  skipU();
  render();
}
// keep presented-text entry in sync with the live zen word
function zenSync() {
  presentedWords[lineBaseIdx() + wordIndex] = wordList[wordIndex];
}
function typeZenChar(ch) {
  if (!wordList[wordIndex]) wordList[wordIndex] = '';
  if (!typedHistory[wordIndex]) typedHistory[wordIndex] = [];
  const hist = typedHistory[wordIndex];
  if (ch === ' ') {
    if (charIndex === 0) return;
    logEvent('space', ' ', spanOf(wordIndex, wordList[wordIndex].length), true, -1);
    keysThisSec++;
    wordList.push('');
    typedHistory.push([]);
    presentedWords.push('');
    advanceWord();
    render();
    if (wordList.length > 1 && $words.scrollWidth > $words.clientWidth + 2) lineDone();
  } else {
    totalTyped++;
    keysThisSec++;
    logEvent('char', ch, spanOf(wordIndex, charIndex), true, -1);
    wordList[wordIndex] += ch;
    hist[charIndex] = true;
    correctChars++;
    charIndex++;
    zenSync();
  }
  render();
}
function backspaceZen() {
  keysThisSec++;
  const hist = typedHistory[wordIndex];
  if (charIndex > 0) {
    charIndex--;
    wordList[wordIndex] = wordList[wordIndex].slice(0, -1);
    if (hist) delete hist[charIndex];
    zenSync();
    logEvent('back', '', -1, false, spanOf(wordIndex, charIndex));
  } else if (wordIndex > 0) {
    // merge back into previous word, drop the empty current word
    const pi = lineBaseIdx() + wordIndex;
    wordList.splice(wordIndex, 1);
    typedHistory.splice(wordIndex, 1);
    presentedWords.splice(pi, 1);
    wordIndex--;
    const prev = typedHistory[wordIndex];
    if (prev) {
      if (prev.error === false) {
        correctWords = Math.max(0, correctWords - 1);
        correctWordChars = Math.max(0, correctWordChars - wordList[wordIndex].length);
      }
      if (prev._missed) { missedChars = Math.max(0, missedChars - prev._missed); delete prev._missed; }
      delete prev.error;
    }
    charIndex = wordList[wordIndex].length;
    logEvent('back', '', -1, false, spanOf(wordIndex, charIndex));
  }
  render();
}
// fills exactly one line of words (no scrolling)
function fillLine() {
  if (drillActive) { fillDrillLineGeneric(); return; }
  if (testMode === 'zen') { fillZenLine(); return; }
  if (testMode === 'quote' || testMode === 'words') { fillFixedLine(); return; }
  if (testMode === 'time' && fullTargetWords.length) { fillFixedLine(); return; }
  wordList = [];
  typedHistory = [];
  wordIndex = 0; charIndex = 0;
  for (let i = 0; i < 40; i++) {
    const base = nextBaseWord();
    wordList.push(transformWord(base, wordList.length === 0 && presentedWords.length === 0, false));
    presentedWords.push(wordList[wordList.length-1]);
    render();
    if (wordList.length > 1 && $words.scrollWidth > $words.clientWidth + 2) {
      presentedWords.pop();
      wordList.pop();
      break;
    }
  }
  // mark last word of time test? no end punct needed
  skipU();
  render();
}
function fillFixedLine() {
  wordList = [];
  typedHistory = [];
  wordIndex = 0; charIndex = 0;
  // endless rematch (time/zen race): extend the reused text when exhausted
  if (rematchEndless && fullTargetIndex >= fullTargetWords.length) {
    const more = makeFullList(60);
    for (const w of more) fullTargetWords.push(w);
  }
  while (fullTargetIndex < fullTargetWords.length && wordList.length < 40) {
    wordList.push(fullTargetWords[fullTargetIndex]);
    presentedWords.push(fullTargetWords[fullTargetIndex]);
    fullTargetIndex++;
    render();
    if (wordList.length > 1 && $words.scrollWidth > $words.clientWidth + 2) {
      fullTargetIndex--;
      presentedWords.pop();
      wordList.pop();
      break;
    }
  }
  if (!wordList.length && fullTargetIndex < fullTargetWords.length) {
    wordList.push(fullTargetWords[fullTargetIndex]);
    presentedWords.push(fullTargetWords[fullTargetIndex]);
    fullTargetIndex++;
  }
  skipU();
  render();
}
function fillDrillLineGeneric() {
  wordList = [];
  typedHistory = [];
  wordIndex = 0; charIndex = 0;
  if (!drillQueue.length) { endDrill(); return; }
  let i = 0;
  for (let k = 0; k < 40; k++) {
    wordList.push(drillQueue[i % drillQueue.length]);
    i++;
    render();
    if (wordList.length > 1 && $words.scrollWidth > $words.clientWidth + 2) {
      wordList.pop();
      break;
    }
  }
  skipU();
  render();
}
function lineDone() {
  // words/quote: check test complete
  if (!drillActive && (testMode === 'words' || testMode === 'quote') && fullTargetIndex >= fullTargetWords.length && wordIndex >= wordList.length - 1) {
    // last word will trigger finish via advanceWord; just animate
  }
  transitioning = true;
  render();
  $words.classList.add('line-out');
  setTimeout(() => {
    if (drillActive) {
      if (!drillQueue.length) {
        transitioning = false;
        $words.classList.remove('line-out');
        endDrill();
        return;
      }
      fillDrillLine();
    } else fillLine();
    transitioning = false;
    $words.classList.remove('line-out');
    $words.classList.add('line-in');
    setTimeout(() => $words.classList.remove('line-in'), 250);
  }, 180);
}
// "u" typed automatically: no need to type it (can be disabled in settings)
function skipU() {
  if (!settings.autoU) return;
  let guard = 0;
  while (guard++ < 50) {
    const w = wordList[wordIndex];
    if (!w || charIndex >= w.length) break;
    if (w[charIndex] === 'u' || w[charIndex] === 'U') {
      if (!typedHistory[wordIndex]) typedHistory[wordIndex] = [];
      typedHistory[wordIndex][charIndex] = 'skip';
      skippedChars++;
      charIndex++;
    } else break;
  }
}
// space typed automatically: finished word -> next word
// replay-accurate event log: s = absolute span index in presented text,
// ok = correctness decided live, d = span cleared by backspace
function logEvent(k, ch, s, ok, d) {
  try { eventLog.push({t: Date.now() - startTime, k, ch: ch || '', s: s == null ? -1 : s, ok: ok ? 1 : 0, d: d == null ? -1 : d}); } catch {}
}
// absolute span index of (lineWordIdx, charIdx) in the full presented text
function lineBaseIdx() { return Math.max(0, presentedWords.length - wordList.length); }
function spanOf(lineWi, ci) {
  let s = 0;
  const upto = lineBaseIdx() + lineWi;
  for (let i = 0; i < upto; i++) s += (presentedWords[i] || '').length + 1;
  return s + ci;
}
function wordOkNow(wi) {
  const hist = typedHistory[wi], exp = wordList[wi];
  if (!hist || !exp) return false;
  for (let i = 0; i < exp.length; i++) { const h = hist[i]; if (h !== true && h !== 'skip') return false; }
  return !hist.extra;
}
function advanceWord() {
  const hist = typedHistory[wordIndex];
  if (!hist) return;
  const expected = wordList[wordIndex];
  let ok = true;
  let missed = 0;
  for (let i = 0; i < expected.length; i++) {
    const h = hist?.[i];
    if (h === undefined) { ok = false; missed++; }
    else if (h !== true && h !== 'skip') { ok = false; }
  }
  if (hist?.extra) ok = false;
  missedChars += missed;
  hist.error = !ok;
  hist._missed = missed;
  if (ok) { correctWords++; correctWordChars += expected.length; }
  else if (!drillActive) missedRun.push(expected);
  if (drillActive) {
    if (ok) {
      const ix = drillQueue.indexOf(expected);
      if (ix >= 0) drillQueue.splice(ix, 1);
    } else drillErrors++;
    updateDrillBanner();
  }
  wordIndex++; charIndex = 0;
  // words / quote finish check
  if (!drillActive && (testMode === 'words' || testMode === 'quote')) {
    const doneWords = presentedWords.length - (wordList.length - wordIndex) - (fullTargetWords.length - fullTargetIndex);
    // simpler: count validated words so far
    if (fullTargetIndex >= fullTargetWords.length && wordIndex >= wordList.length) {
      render();
      finish();
      return;
    }
  }
  if (wordIndex >= wordList.length) lineDone();
  else skipU();
}

function render() {
  $words.innerHTML = '';
  wordList.forEach((w, wi) => {
    const span = document.createElement('span');
    span.className = 'word' + (wi === wordIndex ? ' current' : '');
    if (typedHistory[wi] && typedHistory[wi].error) span.classList.add('error');
    [...w].forEach((ch, ci) => {
      const l = document.createElement('span');
      l.className = 'letter';
      l.textContent = ch;
      const h = typedHistory[wi]?.[ci];
      if (h === true) l.classList.add('correct');
      if (h === false) l.classList.add('incorrect');
      if (h === 'skip') l.classList.add('skipped');
      if (wi === wordIndex && ci === charIndex) l.classList.add('current');
      // caret on virtual space after word
      if (wi === wordIndex && ci === w.length-1 && charIndex === w.length) {
        // caret shown via word underline, add extra marker
      }
      span.appendChild(l);
    });
    // extra letters typed beyond word
    const extra = (typedHistory[wi]?.extra || '');
    [...extra].forEach(ch => {
      const l = document.createElement('span');
      l.className = 'letter incorrect';
      l.textContent = ch;
      span.appendChild(l);
    });
    // caret if at end of current word
    if (wi === wordIndex && charIndex === w.length) {
      const c = document.createElement('span');
      c.className = 'letter current';
      c.innerHTML = '&nbsp;';
      c.style.position = 'relative';
      c.style.display = 'inline-block';
      c.style.width = '2px';
      span.appendChild(c);
    }
    $words.appendChild(span);
  });
  // ghost caret (race last run): exact letter of your past self
  if (ghostActive && started && !finished && ghostSpan >= 0) {
    const loc = spanToLine(ghostSpan);
    if (loc) {
      const wel = $words.children[loc.wi];
      const lel = wel && wel.querySelectorAll('.letter')[loc.ci];
      if (lel) lel.classList.add('ghost-caret');
    }
  }
  // highlight the next key on the visual keyboard
  document.querySelectorAll('#kbd .key.next').forEach(el => el.classList.remove('next'));
  const nw = wordList[wordIndex];
  if (settings.nextKey && nw && charIndex < nw.length && !finished) {
    const nk = document.querySelector(`#kbd .key[data-k="${CSS.escape(nw[charIndex].toLowerCase())}"]`);
    if (nk) nk.classList.add('next');
  }
}

function startTimer() {
  startTime = Date.now();
  eventLog = [];
  if (ghostActive) { ghostStart = Date.now(); startGhostTick(); }
  timer = setInterval(() => {
    const elapsed = (Date.now() - startTime) / 1000;
    if (testMode === 'time') {
      timeLeft = Math.max(0, Math.ceil(timeLimit - elapsed));
      document.getElementById('s-time').textContent = timeLeft;
    } else {
      document.getElementById('s-time').textContent = Math.floor(elapsed) + 's';
    }
    updateLiveStats(elapsed);
    sampleTick(elapsed);
    if (testMode === 'time' && elapsed >= timeLimit) finish();
  }, 250);
}

function calcWpm(chars, sec) {
  if (sec <= 0) return 0;
  return (chars / 5) / (sec / 60);
}
function kogasa(cov) {
  return 100 * (1 - Math.tanh(cov + Math.pow(cov, 3) / 3 + Math.pow(cov, 5) / 5));
}
function consistencyKogasa(arr) {
  if (!arr || arr.length < 2) return 100;
  const mean = arr.reduce((s, v) => s + v, 0) / arr.length;
  if (!mean) return 0;
  const sd = Math.sqrt(arr.reduce((s, v) => s + (v - mean) * (v - mean), 0) / arr.length);
  const out = kogasa(sd / mean);
  return Math.max(0, Math.min(100, Math.round(out)));
}

function updateLiveStats(elapsed = (Date.now()-startTime)/1000) {
  if (!started || elapsed < 1) return;
  const min = elapsed / 60;
  const net = Math.round(((correctWordChars + skippedChars) / 5) / min);
  const acc = totalTyped ? Math.round((correctChars / totalTyped) * 100) : 100;
  document.getElementById('s-wpm').textContent = net;
  document.getElementById('s-acc').textContent = Math.min(100, acc);
}

function reset(limit = timeLimit, opts = {}) {
  if (typeof limit === 'object') { opts = limit; limit = timeLimit; }
  timeLimit = limit;
  timeLeft = limit;
  started = false; finished = false;
  correctChars = 0; skippedChars = 0; totalTyped = 0; correctWords = 0;
  incorrectChars = 0; extraChars = 0; missedChars = 0; correctWordChars = 0;
  transitioning = false;
  missedRun = [];
  drillActive = false; drillQueue = [];
  wpmSamples = []; rawSamples = []; errSamples = []; errEvents = [];
  charHist = [];
  burstHistory = []; keysThisSec = 0; lastSampleSec = -1; lastBurstSec = -1; lastErrTotal = 0;
  eventLog = []; presentedWords = [];
  fullTargetWords = []; fullTargetIndex = 0;
  rematchEndless = !!opts.endlessText;
  quoteCurrent = null;
  if (!opts.keepGhost) stopGhost();
  stopReplay();
  clearInterval(timer);
  // build fixed lists for words / quote
  if (!drillActive && testMode === 'words') fullTargetWords = makeFullList(wordCount);
  if (!drillActive && testMode === 'quote') fullTargetWords = pickQuote();
  // ghost rematch: reuse same text (endless modes keep generating after it)
  if (opts.sameText && opts.text && opts.text.length) {
    fullTargetWords = opts.text.slice();
  }
  if (opts.ghostWpm) { ghostActive = true; ghostWpm = opts.ghostWpm; ghostProgress = 0; }
  document.getElementById('drill').classList.remove('show');
  document.getElementById('drill-bar').style.display = 'none';
  document.getElementById('r-missed-wrap').style.display = 'none';
  const rw = document.getElementById('replay-wrap');
  if (rw) rw.classList.remove('show');
  document.getElementById('s-time').textContent = testMode === 'time' ? limit : '0s';
  document.getElementById('s-wpm').textContent = '0';
  document.getElementById('s-acc').textContent = '100';
  document.getElementById('test').classList.toggle('zen', testMode === 'zen');
  document.getElementById('zen-finish').style.display = testMode === 'zen' ? '' : 'none';
  document.getElementById('test').classList.remove('hide');
  document.getElementById('results').classList.remove('show');
  document.getElementById('history').classList.remove('show');
  document.getElementById('stats').classList.remove('show');
  document.getElementById('detail').classList.remove('show');
  document.getElementById('settings').classList.remove('show');
  toggleMenu(false);
  refreshTimesUI();
  refreshModeUI();
  $words.classList.remove('line-out', 'line-in');
  updateHeat();
  drawSpark();
  fillLine();
  focus();
}

function refreshTimesUI() {
  const box = document.getElementById('count-seg');
  if (!box) return;
  box.innerHTML = '';
  const add = (label, active, fn) => {
    const b = document.createElement('button');
    b.textContent = label;
    if (active) b.classList.add('active');
    b.addEventListener('click', e => { e.stopPropagation(); fn(); });
    box.appendChild(b);
  };
  if (testMode === 'time') {
    [15,30,60,120,300].forEach(t => add(t >= 60 ? (t/60)+'m' : t+'s', t === timeLimit, () => reset(t)));
  } else if (testMode === 'words') {
    [10,25,50,100].forEach(n => add(String(n), n === wordCount, () => { wordCount = n; saveModes(); reset(); }));
  } else if (testMode === 'zen') {
    add('∞', true, () => reset());
  } else {
    ['short','medium','long','all'].forEach(q => add(q, q === quoteLen, () => { quoteLen = q; saveModes(); reset(); }));
  }
}
function refreshModeUI() {
  document.querySelectorAll('#mode-seg button').forEach(b =>
    b.classList.toggle('active', b.dataset.m === testMode));
  document.querySelectorAll('#mod-seg button').forEach(b => {
    const on = (b.dataset.mod === 'punctuation' && usePunct) || (b.dataset.mod === 'numbers' && useNumbers);
    b.classList.toggle('active', on);
  });
  document.querySelectorAll('#lang-menu button').forEach(b =>
    b.classList.toggle('active', b.dataset.l === language));
  const lb = document.getElementById('lang-btn');
  if (lb) {
    let label = language;
    if (testMode === 'quote' && quoteCurrent) label += ' · “' + quoteCurrent.source + '”';
    else if (testMode === 'words') label += ' · ' + wordCount + ' words';
    else if (testMode === 'zen') label += ' · endless';
    else label += ' · ' + timeLimit + 's';
    if (usePunct) label += ' · punctuation';
    if (useNumbers) label += ' · numbers';
    lb.textContent = label + ' ▾';
  }
}
function setTestMode(m) {
  if (!['time','words','quote','zen'].includes(m)) return;
  testMode = m;
  saveModes();
  reset();
}

function focus() { $input.focus({preventScroll:true}); }

function setTheme(dark, save=true) {
  document.body.classList.toggle('dark', !!dark);
  document.getElementById('theme-toggle').textContent = dark ? '☀' : '☾';
  if (save) { storeSet('theme', dark ? 'dark' : 'light'); }
}

function getHistory() {
  return storeGet('history', []);
}
function fmtDur(sec) {
  sec = +sec || 0;
  return sec >= 60 ? Math.round(sec / 60) + ' min' : sec + 's';
}
function fmtDate(ts) {
  const d = new Date(ts);
  const p = n => String(n).padStart(2, '0');
  return `${p(d.getMonth()+1)}/${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}
let lastView = 'test';
function showHistory() {
  if (!document.getElementById('detail').classList.contains('show')) {
    lastView = document.getElementById('results').classList.contains('show') ? 'results' : 'test';
  }
  hideOverlays();
  const h = getHistory();
  document.getElementById('h-count').textContent = h.length + (h.length > 1 ? ' runs' : ' run');
  const list = document.getElementById('h-list');
  list.innerHTML = '';
  if (!h.length) {
    const e = document.createElement('div');
    e.className = 'h-empty';
    e.textContent = 'no runs yet — do a test!';
    list.appendChild(e);
  }
  h.forEach((r, i) => {
    const row = document.createElement('button');
    row.className = 'h-row';
    row.dataset.i = i;
    const b = document.createElement('b');
    b.textContent = r.wpm + ' wpm';
    const meta = document.createElement('span');
    meta.className = 'h-meta';
    const tt = r.ttype || (r.testMode ? (r.testMode + ' ' + (r.testMode === 'time' ? (r.timeLimit || r.t) : r.wordCount || '')) : fmtDur(r.t));
    meta.textContent = `${r.acc != null ? r.acc + '%' : '—'} · ${r.words} words · raw ${r.raw != null ? r.raw : '?'} · ${r.errors} err · ${tt} · ${fmtDate(r.d)}`;
    row.appendChild(b);
    row.appendChild(meta);
    row.addEventListener('click', e => { e.stopPropagation(); showDetail(i); });
    list.appendChild(row);
  });
  document.getElementById('history').classList.add('show');
}
function hideHistory() {
  document.getElementById('history').classList.remove('show');
  if (lastView === 'results') document.getElementById('results').classList.add('show');
  else { document.getElementById('test').classList.remove('hide'); focus(); }
}
function hideView(id) { document.getElementById(id).classList.remove('show'); }
function showView(id) { document.getElementById(id).classList.add('show'); }

let statsFrom = 'test';
function currentMainView() {
  if (document.getElementById('results').classList.contains('show')) return 'results';
  if (document.getElementById('history').classList.contains('show')) return 'history';
  return 'test';
}
function showStats() {
  statsFrom = currentMainView();
  hideOverlays();
  const h = getHistory();
  const n = h.length;
  document.getElementById('st-count').textContent = n + (n > 1 ? ' runs' : ' run');
  document.getElementById('st-runs').textContent = n;
  if (!n) {
    document.getElementById('st-detail').textContent = 'no runs yet — do a test!';
    ['st-best','st-avg'].forEach(id => document.getElementById(id).textContent = '0');
    document.getElementById('st-acc').textContent = '0%';
    document.getElementById('st-words').textContent = '0';
    document.getElementById('st-time').textContent = '0 min';
    document.getElementById('st-bars').innerHTML = '';
  } else {
    const best = Math.max(...h.map(r => r.wpm));
    const avg = Math.round(h.reduce((s, r) => s + r.wpm, 0) / n);
    const withAcc = h.filter(r => r.acc != null);
    const acc = withAcc.length ? Math.round(withAcc.reduce((s, r) => s + r.acc, 0) / withAcc.length) : 0;
    const words = h.reduce((s, r) => s + (r.words || 0), 0);
    const secs = h.reduce((s, r) => s + (r.t || 0), 0);
    document.getElementById('st-best').textContent = best;
    document.getElementById('st-avg').textContent = avg;
    document.getElementById('st-acc').textContent = acc + '%';
    document.getElementById('st-words').textContent = words;
    document.getElementById('st-time').textContent = secs >= 60 ? Math.round(secs / 60) + ' min' : secs + 's';
    document.getElementById('st-detail').textContent =
      `best ${best} wpm · average ${avg} wpm · ${n} run${n > 1 ? 's' : ''}`;
    const last = h.slice(0, 15).reverse();
    const max = Math.max(...last.map(r => r.wpm), 1);
    const bars = document.getElementById('st-bars');
    bars.innerHTML = '';
    last.forEach((r, i) => {
      const bar = document.createElement('div');
      bar.className = 'bar' + (i < last.length - 3 ? ' old' : '');
      bar.style.height = Math.max(4, Math.round((r.wpm / max) * 64)) + 'px';
      bar.title = `${r.wpm} wpm · ${fmtDate(r.d)}`;
      bars.appendChild(bar);
    });
  }
  showView('stats');
}
function hideStats() {
  hideView('stats');
  if (statsFrom === 'results') showView('results');
  else if (statsFrom === 'history') showHistory();
  else { document.getElementById('test').classList.remove('hide'); focus(); }
}
function msgFor(wpm) {
  return wpm < 20 ? 'Gentle.' : wpm < 40 ? 'Good.' : wpm < 60 ? 'Fast.' : wpm < 80 ? 'Very fast.' : 'Blazing.';
}
function showDetail(i) {
  const h = getHistory();
  const r = h[i];
  if (!r) return;
  hideOverlays();
  window._detailRun = r;
  window._detailIndex = i;
  document.getElementById('d-date').textContent = fmtDate(r.d) + ' · ' + fmtDur(r.t);
  document.getElementById('d-msg').textContent = msgFor(r.wpm);
  const mm = r.ttype || r.m || 'words';
  document.getElementById('d-detail').textContent =
    `${r.words} correct words · ${r.acc}% accuracy · ${mm} · run on ${fmtDate(r.d)}`;
  document.getElementById('d-wpm').textContent = r.wpm;
  document.getElementById('d-acc').textContent = r.acc != null ? r.acc + '%' : '—';
  document.getElementById('d-raw').textContent = r.raw != null ? r.raw : '—';
  const chStr = (r.c != null && (r.incorrect != null || r.tot != null))
    ? (r.c + '/' + (r.incorrect != null ? r.incorrect : '?') + '/' + (r.extra != null ? r.extra : '?') + '/' + (r.missed != null ? r.missed : '?'))
    : ((r.c != null && r.tot != null) ? r.c + '/' + r.tot : '—');
  document.getElementById('d-chars').textContent = chStr;
  document.getElementById('d-cons').textContent = r.cons != null ? r.cons + '%' : '—';
  document.getElementById('d-time').textContent = fmtDur(r.t);
  document.getElementById('d-words').textContent = r.words;
  document.getElementById('d-type').textContent = r.ttype || mm;
  const drw = document.getElementById('detail-replay-wrap');
  if (drw) drw.style.display = 'none';
  showView('detail');
  try {
    drawHistoryGraph('detail-graph', r.wpmHist || [], r.rawHist || [], r.errHist || []);
  } catch {}
}
function hideDetail() {
  hideView('detail');
  showHistory();
}

function typeChar(ch) {
  if (finished || transitioning) return;
  if (!started) { started = true; startTimer(); updateHeat(); }
  // "u" auto: ignore manual "u" keypresses (unless disabled)
  if (settings.autoU && ch !== ' ' && (ch === 'u' || ch === 'U')) return;
  if (testMode === 'zen' && !drillActive) { typeZenChar(ch); return; }
  const word = wordList[wordIndex];
  if (!word) return;
  if (!typedHistory[wordIndex]) typedHistory[wordIndex] = [];
  const hist = typedHistory[wordIndex];

  if (ch === ' ') {
    // space: move to next word (fallback if word incomplete, re-advance if word done)
    if (charIndex === 0) return;
    logEvent('space', ' ', spanOf(wordIndex, word.length), wordOkNow(wordIndex), -1);
    keysThisSec++;
    advanceWord();
  } else {
    totalTyped++;
    keysThisSec++;
    if (charIndex < word.length) {
      const good = ch === word[charIndex];
      logEvent('char', ch, spanOf(wordIndex, charIndex), good, -1);
      hist[charIndex] = good;
      if (good) correctChars++;
      else { incorrectChars++; recordMiss(word[charIndex]); }
      charIndex++;
      skipU();
      // auto space (setting): finished word -> next one without pressing space.
      // final word of a words/quote test always submits (no trailing space needed).
      const lastWordDone = !drillActive && (testMode === 'words' || testMode === 'quote') &&
        fullTargetIndex >= fullTargetWords.length && wordIndex === wordList.length - 1 && charIndex >= word.length;
      if ((settings.autoSpace && charIndex >= word.length) || lastWordDone) {
        logEvent('space', ' ', spanOf(wordIndex, word.length), wordOkNow(wordIndex), -1);
        advanceWord();
      }
    } else {
      // extra char
      logEvent('char', ch, -1, false, -1);
      hist.extra = (hist.extra || '') + ch;
      hist[charIndex] = false;
      extraChars++;
      charIndex++;
    }
  }
  render();
}

function backspace() {
  if (finished || transitioning) return;
  if (wordIndex === 0 && charIndex === 0) return;
  if (testMode === 'zen' && !drillActive) { backspaceZen(); return; }
  keysThisSec++;
  const hist = typedHistory[wordIndex];
  if (charIndex > 0) {
    charIndex--;
    // step back over auto-typed "u"s
    while (charIndex > 0 && hist && hist[charIndex] === 'skip') {
      delete hist[charIndex];
      skippedChars = Math.max(0, skippedChars - 1);
      charIndex--;
    }
    if (hist && hist[charIndex] === 'skip') {
      delete hist[charIndex];
      skippedChars = Math.max(0, skippedChars - 1);
      logEvent('back', '', -1, false, -1);
    }
    if (hist) {
      if (charIndex >= wordList[wordIndex].length) {
        hist.extra = hist.extra.slice(0, -1);
        if (!hist.extra) delete hist.extra;
        logEvent('back', '', -1, false, -1);
      } else if (hist[charIndex] !== 'skip') {
        const d = spanOf(wordIndex, charIndex);
        delete hist[charIndex];
        logEvent('back', '', -1, false, d);
      }
    }
  } else if (wordIndex > 0) {
    // back to previous word (auto-space) to fix it
    wordIndex--;
    const prev = typedHistory[wordIndex];
    // undo the auto-validation of the previous word
    if (prev) {
      if (prev.error === false) {
        correctWords = Math.max(0, correctWords - 1);
        correctWordChars = Math.max(0, correctWordChars - wordList[wordIndex].length);
      }
      if (prev._missed) { missedChars = Math.max(0, missedChars - prev._missed); delete prev._missed; }
      delete prev.error;
    }
    charIndex = wordList[wordIndex].length;
    logEvent('back', '', -1, false, spanOf(wordIndex, wordList[wordIndex].length));
  }
  render();
}

function finish() {
  if (finished) return;
  finished = true;
  clearInterval(timer);
  stopGhost();
  const elapsedSec = testMode === 'time' ? timeLimit : Math.max(1, (Date.now() - startTime) / 1000);
  const isZen = testMode === 'zen';
  if (isZen && presentedWords.length && presentedWords[presentedWords.length - 1] === '') presentedWords.pop();
  if (isZen) {
    // zen: everything typed is correct — no missed/incorrect concept
    correctWordChars = totalTyped;
  } else {
    // finalize current partial word (missed chars)
    try {
      const hist = typedHistory[wordIndex];
      const expected = wordList[wordIndex];
      if (hist && expected && !hist.error && (charIndex > 0)) {
        let missed = 0;
        for (let i = charIndex; i < expected.length; i++) missed++;
        missedChars += missed;
      }
    } catch {}
  }
  // flush last second sample
  sampleTick(elapsedSec, true);
  const elapsedMin = elapsedSec / 60;
  const wpm = Math.round(calcWpm(correctWordChars + skippedChars, elapsedSec));
  const raw = Math.round(calcWpm(totalTyped + skippedChars, elapsedSec));
  const acc = totalTyped ? Math.min(100, Math.round((correctChars / totalTyped) * 100)) : 100;
  const errors = Math.max(0, totalTyped - correctChars);
  // characters: correct / incorrect / extra / missed (monkeytype order)
  const correctTotal = correctChars + skippedChars;
  const charStr = correctTotal + '/' + incorrectChars + '/' + extraChars + '/' + missedChars;
  const cons = consistencyKogasa(burstHistory.length >= 2 ? burstHistory : rawSamples);
  const ttype = testTypeString();
  const durLabel = testMode === 'time' ? fmtDur(timeLimit) : Math.round(elapsedSec) + 's';
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  set('r-wpm', wpm); set('r-wpm-big', wpm);
  set('r-acc', isZen ? '—' : acc + '%'); set('r-acc-big', isZen ? '—' : acc + '%');
  set('r-raw', raw);
  set('r-chars', isZen ? '—' : charStr);
  set('r-cons', cons + '%');
  set('r-time', durLabel);
  set('r-testtype', ttype);
  set('r-lang', language);
  set('r-words', correctWords);
  set('r-session', 'session ' + fmtSession(Date.now() - sessionStart));
  set('test-type-badge', ttype);
  const msg = testMode === 'zen' ? 'Calm.' : msgFor(wpm);
  set('r-msg', msg);
  set('r-detail', isZen
    ? `${correctWords} words in ${durLabel} · zen · ${modeLabel()}`
    : `${correctWords} correct words in ${durLabel} · ${acc}% accuracy · ${ttype} · ${modeLabel()}`);
  if (quoteCurrent && testMode === 'quote') set('r-detail', `“${quoteCurrent.text}” — ${quoteCurrent.source} · ${acc}% · ${ttype}`);
  // local best score (per test type — never in zen, just vibes)
  try {
    if (testMode === 'zen') {
      set('r-best', 'zen · no records, just vibes');
    } else {
      const suffix = testMode + '-' + (testMode === 'time' ? timeLimit : testMode === 'words' ? wordCount : 'quote');
      const prev = +(storeGet('best.' + suffix, 0));
      const best = Math.max(prev, wpm);
      storeSet('best.' + suffix, best);
      set('r-best', prev > 0
        ? (wpm >= prev ? `New record! Best: ${best} WPM` : `Best: ${prev} WPM · this run: ${wpm} WPM`)
        : `First score saved: ${wpm} WPM`);
    }
  } catch {}
  const missed = [...new Set(missedRun)];
  window._lastMissed = missed;
  const avgWpm = wpmSamples.length ? Math.round(wpmSamples.reduce((s,v)=>s+v,0)/wpmSamples.length) : wpm;
  set('g-cap', `wpm ${wpm} · raw ${raw} · avg ${avgWpm} · consistency ${cons}%`);
  // store last run for race + replay
  lastRun = {
    wpm, raw, acc, cons, words: correctWords, errors,
    duration: Math.round(elapsedSec),
    ttype, lang: language,
    chars: charStr,
    text: presentedWords.slice(),
    fullText: (testMode === 'words' || testMode === 'quote') ? fullTargetWords.slice() : presentedWords.slice(),
    events: eventLog.slice(),
    wpmHist: wpmSamples.slice(), rawHist: rawSamples.slice(), errHist: errSamples.slice(),
    charHist: charHist.slice(),
    config: {testMode, wordCount, timeLimit, usePunct, useNumbers, language, quoteLen},
    quote: quoteCurrent
  };
  window._lastScore = { wpm, raw, acc: isZen ? null : acc, correctWords, errors, timeLimit, elapsedSec, mode: ttype };
  drawBigGraph();
  const mw = document.getElementById('r-missed-wrap');
  const ml = document.getElementById('r-missed');
  ml.innerHTML = '';
  set('r-missed-n', missed.length);
  missed.slice(0, 24).forEach(w => {
    const sp = document.createElement('span');
    sp.textContent = w;
    ml.appendChild(sp);
  });
  mw.style.display = missed.length ? 'block' : 'none';
  // local history (last 50 runs, cap replay size; zen under 15s is not saved)
  try {
    if (!(isZen && elapsedSec < 15)) {
    const h = getHistory();
    h.unshift({
      d: Date.now(), wpm, raw, acc: isZen ? null : acc, cons, words: correctWords, errors,
      t: Math.round(elapsedSec), timeLimit, testMode, wordCount, usePunct, useNumbers,
      c: isZen ? null : correctTotal, tot: correctTotal + incorrectChars + extraChars,
      incorrect: isZen ? null : incorrectChars, extra: isZen ? null : extraChars, missed: isZen ? null : missedChars,
      m: testMode, lang: language, ttype,
      missedWords: missed.slice(0, 20),
      wpmHist: wpmSamples.slice(0, 400), rawHist: rawSamples.slice(0, 400), errHist: errSamples.slice(0, 400),
      charHist: charHist.slice(0, 1200),
      text: presentedWords.slice(0, 400),
      events: eventLog.slice(0, 3000),
      quote: quoteCurrent ? {text: quoteCurrent.text, source: quoteCurrent.source} : null
    });
    storeSet('history', h.slice(0, 50));
    }
  } catch {}
  document.getElementById('test').classList.add('hide');
  document.getElementById('results').classList.add('show');
  refreshModeUI();
}

// visual keyboards that light up as you type (setting: kbdLayout)
const KBD_LAYOUTS = {
  qwerty: { label: 'QWERTY', rows: [
    [{k:'`'},{k:'1'},{k:'2'},{k:'3'},{k:'4'},{k:'5'},{k:'6'},{k:'7'},{k:'8'},{k:'9'},{k:'0'},{k:'-'},{k:'='},{k:'backspace', label:'backspace', cls:'w15'}],
    [{k:'tab', label:'tab', cls:'w15'},{k:'q'},{k:'w'},{k:'e'},{k:'r'},{k:'t'},{k:'y'},{k:'u'},{k:'i'},{k:'o'},{k:'p'},{k:'['},{k:']'},{k:'\\'}],
    [{k:'caps', label:'caps', cls:'w15'},{k:'a'},{k:'s'},{k:'d'},{k:'f'},{k:'g'},{k:'h'},{k:'j'},{k:'k'},{k:'l'},{k:';'},{k:"'"},{k:'enter', label:'enter', cls:'w15'}],
    [{k:'shift', label:'shift', cls:'w15'},{k:'z'},{k:'x'},{k:'c'},{k:'v'},{k:'b'},{k:'n'},{k:'m'},{k:','},{k:'.'},{k:'/'},{k:'shift', label:'shift', cls:'w15'}],
    [{k:' ', label:'space', cls:'space'}]
  ]},
  azerty: { label: 'AZERTY', rows: [
    [{k:'²'},{k:'&'},{k:'é'},{k:'"'},{k:"'"},{k:'('},{k:'-'},{k:'è'},{k:'_'},{k:'ç'},{k:'à'},{k:')'},{k:'='},{k:'backspace', label:'backspace', cls:'w15'}],
    [{k:'tab', label:'tab', cls:'w15'},{k:'a'},{k:'z'},{k:'e'},{k:'r'},{k:'t'},{k:'y'},{k:'u'},{k:'i'},{k:'o'},{k:'p'},{k:'^'},{k:'$'},{k:'enter', label:'enter', cls:'w15'}],
    [{k:'caps', label:'caps', cls:'w15'},{k:'q'},{k:'s'},{k:'d'},{k:'f'},{k:'g'},{k:'h'},{k:'j'},{k:'k'},{k:'l'},{k:'m'},{k:'ù'},{k:'*'}],
    [{k:'shift', label:'shift', cls:'w15'},{k:'<'},{k:'w'},{k:'x'},{k:'c'},{k:'v'},{k:'b'},{k:'n'},{k:','},{k:';'},{k:':'},{k:'!'},{k:'shift', label:'shift', cls:'w15'}],
    [{k:' ', label:'space', cls:'space'}]
  ]},
  qwertz: { label: 'QWERTZ', rows: [
    [{k:'^'},{k:'1'},{k:'2'},{k:'3'},{k:'4'},{k:'5'},{k:'6'},{k:'7'},{k:'8'},{k:'9'},{k:'0'},{k:'ß'},{k:'´'},{k:'backspace', label:'backspace', cls:'w15'}],
    [{k:'tab', label:'tab', cls:'w15'},{k:'q'},{k:'w'},{k:'e'},{k:'r'},{k:'t'},{k:'z'},{k:'u'},{k:'i'},{k:'o'},{k:'p'},{k:'ü'},{k:'+'},{k:'enter', label:'enter', cls:'w15'}],
    [{k:'caps', label:'caps', cls:'w15'},{k:'a'},{k:'s'},{k:'d'},{k:'f'},{k:'g'},{k:'h'},{k:'j'},{k:'k'},{k:'l'},{k:'ö'},{k:'ä'},{k:'#'}],
    [{k:'shift', label:'shift', cls:'w15'},{k:'<'},{k:'y'},{k:'x'},{k:'c'},{k:'v'},{k:'b'},{k:'n'},{k:'m'},{k:','},{k:'.'},{k:'-'},{k:'shift', label:'shift', cls:'w15'}],
    [{k:' ', label:'space', cls:'space'}]
  ]},
  dvorak: { label: 'Dvorak', rows: [
    [{k:'`'},{k:'1'},{k:'2'},{k:'3'},{k:'4'},{k:'5'},{k:'6'},{k:'7'},{k:'8'},{k:'9'},{k:'0'},{k:'['},{k:']'},{k:'backspace', label:'backspace', cls:'w15'}],
    [{k:'tab', label:'tab', cls:'w15'},{k:"'"},{k:','},{k:'.'},{k:'p'},{k:'y'},{k:'f'},{k:'g'},{k:'c'},{k:'r'},{k:'l'},{k:'/'},{k:'='},{k:'\\'}],
    [{k:'caps', label:'caps', cls:'w15'},{k:'a'},{k:'o'},{k:'e'},{k:'u'},{k:'i'},{k:'d'},{k:'h'},{k:'t'},{k:'n'},{k:'s'},{k:'-'},{k:'enter', label:'enter', cls:'w15'}],
    [{k:'shift', label:'shift', cls:'w15'},{k:';'},{k:'q'},{k:'j'},{k:'k'},{k:'x'},{k:'b'},{k:'m'},{k:'w'},{k:'v'},{k:'z'},{k:'shift', label:'shift', cls:'w15'}],
    [{k:' ', label:'space', cls:'space'}]
  ]},
  colemak: { label: 'Colemak', rows: [
    [{k:'`'},{k:'1'},{k:'2'},{k:'3'},{k:'4'},{k:'5'},{k:'6'},{k:'7'},{k:'8'},{k:'9'},{k:'0'},{k:'-'},{k:'='},{k:'backspace', label:'backspace', cls:'w15'}],
    [{k:'tab', label:'tab', cls:'w15'},{k:'q'},{k:'w'},{k:'f'},{k:'p'},{k:'g'},{k:'j'},{k:'l'},{k:'u'},{k:'y'},{k:';'},{k:'['},{k:']'},{k:'\\'}],
    [{k:'caps', label:'caps', cls:'w15'},{k:'a'},{k:'r'},{k:'s'},{k:'t'},{k:'d'},{k:'h'},{k:'n'},{k:'e'},{k:'i'},{k:'o'},{k:"'"},{k:'enter', label:'enter', cls:'w15'}],
    [{k:'shift', label:'shift', cls:'w15'},{k:'z'},{k:'x'},{k:'c'},{k:'v'},{k:'b'},{k:'k'},{k:'m'},{k:','},{k:'.'},{k:'/'},{k:'shift', label:'shift', cls:'w15'}],
    [{k:' ', label:'space', cls:'space'}]
  ]}
};
const KBD_ORDER = ['qwerty', 'azerty', 'qwertz', 'dvorak', 'colemak'];
function kbdRows() {
  const l = KBD_LAYOUTS[settings.kbdLayout];
  return (l ? l.rows : KBD_LAYOUTS.qwerty.rows);
}
function buildKbd() {
  const kb = document.getElementById('kbd');
  kb.innerHTML = '';
  kbdRows().forEach(row => {
    const r = document.createElement('div');
    r.className = 'krow';
    row.forEach(d => {
      const el = document.createElement('div');
      el.className = 'key' + (d.cls ? ' ' + d.cls : '');
      el.dataset.k = d.k;
      el.textContent = d.label || d.k;
      r.appendChild(el);
    });
    kb.appendChild(r);
  });
  updateHeat();
}
function kbdKeyFor(e) {
  if (e.key === ' ') return ' ';
  if (e.key.length === 1) return e.key.toLowerCase();
  const map = { Backspace:'backspace', Tab:'tab', Enter:'enter', Shift:'shift', CapsLock:'caps' };
  return map[e.key] || null;
}
function lightKey(code, on) {
  if (!code) return;
  document.querySelectorAll(`#kbd .key[data-k="${CSS.escape(code)}"]`).forEach(el =>
    el.classList.toggle('lit', on));
}

// ---- settings ----
const SETTINGS_DEF = [
  { key: 'heatmap', label: 'keyboard heatmap', desc: 'tints often-missed keys (shown while idle)' },
  { key: 'nextKey', label: 'next key', desc: 'highlights the key to type on the keyboard' },
  { key: 'spark', label: 'live pace', desc: 'mini wpm curve during the test' },
  { key: 'kbd', label: 'visual keyboard', desc: 'shows the keyboard on the test page' },
  { key: '__layout', label: 'keyboard layout', desc: 'layout of the visual keyboard' },
  { key: 'autoU', label: 'auto u', desc: 'the u key types itself, no need to press it' },
  { key: 'autoSpace', label: 'auto spaces', desc: 'moves to the next word without pressing space' },
  { key: '__restart', label: 'restart shortcut', desc: 'restart quickly during the test' },
];
function applySettings() {
  document.getElementById('kbd').style.display = settings.kbd ? '' : 'none';
  const sp = document.getElementById('spark');
  if (sp && sp.parentElement) sp.parentElement.style.display = settings.spark ? '' : 'none';
  const rh = document.getElementById('restart-hint');
  if (rh) rh.textContent = fmtShortcut(settings.restart);
  updateModeLabels();
  updateHeat();
  render();
}
function modeLabel() {
  if (settings.autoU && settings.autoSpace) return 'u + auto space';
  if (settings.autoU) return 'u auto';
  if (settings.autoSpace) return 'auto space';
  return 'manual';
}
function updateModeLabels() {
  const m = modeLabel();
  const badge = document.getElementById('mode-badge');
  if (badge) badge.textContent = m;
  const hint = document.getElementById('mode-hint');
  if (hint) hint.textContent = m;
}
function restartMatch(e) {
  const r = settings.restart || { key: 'Tab' };
  return e.key === r.key && !!e.ctrlKey === !!r.ctrl && !!e.shiftKey === !!r.shift && !!e.altKey === !!r.alt;
}
function fmtShortcut(r) {
  r = r || { key: 'Tab' };
  const parts = [];
  if (r.ctrl) parts.push('ctrl');
  if (r.shift) parts.push('shift');
  if (r.alt) parts.push('alt');
  parts.push(String(r.key).toLowerCase());
  return parts.join(' + ');
}
function validateShortcut(key, ctrl, shift, alt) {
  if (['Shift', 'Control', 'Alt', 'Meta'].includes(key)) return { ok: false };
  if (key === 'Escape') return { ok: false, cancel: true };
  if (key === 'Backspace' || key === 'Delete' || key === ' ') return { ok: false, msg: 'reserved key, try something else' };
  if (key.length === 1 && !ctrl && !shift && !alt) {
    if (/[\u00e0\u00e2\u00e4\u00e9\u00e8\u00ea\u00eb\u00ee\u00ef\u00f4\u00f6\u00f9\u00fb\u00fc\u00e7]/i.test(key)) return { ok: false, msg: 'no accented characters please, try something else' };
    return { ok: false, msg: 'add ctrl, shift or alt for a letter' };
  }
  return { ok: true, combo: { key, ctrl: !!ctrl, shift: !!shift, alt: !!alt } };
}
let capturingShortcut = false;
function startShortcutCapture() {
  capturingShortcut = true;
  const note = document.getElementById('shortcut-note');
  if (note) note.textContent = 'press a key... (esc = cancel)';
  renderSettings();
}
document.addEventListener('keydown', e => {
  if (!capturingShortcut) return;
  e.preventDefault();
  e.stopPropagation();
  const r = validateShortcut(e.key, e.ctrlKey, e.shiftKey, e.altKey);
  const note = document.getElementById('shortcut-note');
  if (!r.ok && !r.cancel && note && r.msg) note.textContent = r.msg;
  if (!r.ok) {
    if (r.cancel) {
      capturingShortcut = false;
      if (note) note.textContent = '';
      renderSettings();
    }
    return;
  }
  settings.restart = r.combo;
  capturingShortcut = false;
  if (note) note.textContent = '';
  saveSettings();
  applySettings();
  renderSettings();
}, true);
function renderSettings() {
  const list = document.getElementById('set-list');
  list.innerHTML = '';
  SETTINGS_DEF.forEach(d => {
    const row = document.createElement('div');
    row.className = 'set-row';
    const txt = document.createElement('div');
    const b = document.createElement('b');
    b.textContent = d.label;
    const desc = document.createElement('span');
    desc.textContent = d.desc;
    txt.appendChild(b);
    txt.appendChild(desc);
    row.appendChild(txt);
    if (d.key === '__layout') {
      const pick = document.createElement('div');
      pick.className = 'layout-pick';
      KBD_ORDER.forEach(name => {
        const b = document.createElement('button');
        b.className = 'keybtn' + (settings.kbdLayout === name ? ' on' : '');
        b.textContent = KBD_LAYOUTS[name].label;
        b.addEventListener('click', e => {
          e.stopPropagation();
          settings.kbdLayout = name;
          saveSettings();
          buildKbd();
          applySettings();
          renderSettings();
        });
        pick.appendChild(b);
      });
      row.appendChild(pick);
      list.appendChild(row);
      return;
    }
    if (d.key === '__restart') {
      const btn = document.createElement('button');
      btn.className = 'keybtn';
      btn.textContent = capturingShortcut ? 'press...' : fmtShortcut(settings.restart);
      btn.addEventListener('click', e => { e.stopPropagation(); startShortcutCapture(); });
      row.appendChild(btn);
      list.appendChild(row);
      return;
    }
    const sw = document.createElement('button');
    sw.className = 'switch' + (settings[d.key] ? ' on' : '');
    const knob = document.createElement('i');
    sw.appendChild(knob);
    sw.addEventListener('click', e => {
      e.stopPropagation();
      settings[d.key] = !settings[d.key];
      saveSettings();
      applySettings();
      renderSettings();
    });
    row.appendChild(txt);
    row.appendChild(sw);
    list.appendChild(row);
  });
}
function currentVisibleView() {
  for (const id of ['results', 'history', 'stats', 'detail', 'drill'])
    if (document.getElementById(id).classList.contains('show')) return id;
  return 'test';
}
function hideOverlays() {
  ['results', 'history', 'stats', 'detail', 'drill', 'settings'].forEach(hideView);
  document.getElementById('test').classList.add('hide');
}
let settingsFrom = 'test';
function showSettings() {
  settingsFrom = currentVisibleView();
  hideOverlays();
  renderSettings();
  document.getElementById('settings').classList.add('show');
}
function hideSettings() {
  document.getElementById('settings').classList.remove('show');
  if (settingsFrom === 'test') { document.getElementById('test').classList.remove('hide'); focus(); }
  else document.getElementById(settingsFrom).classList.add('show');
}
function toggleMenu(force) {
  const m = document.getElementById('menu');
  const show = force !== undefined ? force : !m.classList.contains('show');
  m.classList.toggle('show', show);
  document.getElementById('scrim').style.display = show ? 'block' : 'none';
}

// ---- missed-words drill ----
function updateDrillBanner() {
  document.getElementById('drill-n').textContent = drillQueue.length;
}
function fillDrillLine() {
  wordList = [];
  typedHistory = [];
  wordIndex = 0; charIndex = 0;
  if (!drillQueue.length) { endDrill(); return; }
  let i = 0;
  for (let k = 0; k < 40; k++) {
    wordList.push(drillQueue[i % drillQueue.length]);
    i++;
    render();
    if (wordList.length > 1 && $words.scrollWidth > $words.clientWidth + 2) {
      wordList.pop();
      break;
    }
  }
  skipU();
  render();
}
function startDrill(words) {
  const list = [...new Set(words || [])];
  if (!list.length) return;
  drillActive = true;
  drillQueue = list;
  drillTotal = list.length;
  drillErrors = 0;
  drillStart = Date.now();
  started = true; finished = false; transitioning = false;
  correctChars = 0; skippedChars = 0; totalTyped = 0; correctWords = 0;
  incorrectChars = 0; extraChars = 0; missedChars = 0; correctWordChars = 0;
  missedRun = [];
  typedHistory = [];
  wpmSamples = []; rawSamples = []; errSamples = []; errEvents = [];
  burstHistory = []; keysThisSec = 0; lastSampleSec = -1; lastBurstSec = -1; lastErrTotal = 0;
  eventLog = []; presentedWords = [];
  stopGhost(); stopReplay();
  clearInterval(timer);
  document.getElementById('s-wpm').textContent = '0';
  document.getElementById('s-acc').textContent = '100';
  document.getElementById('s-time').textContent = '–';
  document.getElementById('results').classList.remove('show');
  document.getElementById('history').classList.remove('show');
  document.getElementById('stats').classList.remove('show');
  document.getElementById('detail').classList.remove('show');
  document.getElementById('drill').classList.remove('show');
  document.getElementById('test').classList.remove('hide');
  $words.classList.remove('line-out', 'line-in');
  document.getElementById('drill-bar').style.display = 'block';
  updateDrillBanner();
  updateHeat();
  drawSpark();
  fillDrillLine();
  focus();
}
function endDrill() {
  drillActive = false;
  finished = true;
  document.getElementById('drill-bar').style.display = 'none';
  const secs = Math.max(1, Math.round((Date.now() - drillStart) / 1000));
  document.getElementById('drill-detail').textContent =
    `${drillTotal} word${drillTotal > 1 ? 's' : ''} reviewed · ${drillErrors} error${drillErrors > 1 ? 's' : ''} · ${secs}s`;
  document.getElementById('test').classList.add('hide');
  document.getElementById('drill').classList.add('show');
}
function quitDrill() {
  drillActive = false;
  document.getElementById('drill-bar').style.display = 'none';
  document.getElementById('test').classList.add('hide');
  document.getElementById('results').classList.add('show');
}

// ---- missed-letter heatmap ----
function recordMiss(expectedCh) {
  const k = (expectedCh || '').toLowerCase();
  if (!k || k.length !== 1) return;
  heatMap[k] = (heatMap[k] || 0) + 1;
  storeSet('heat', heatMap);
  updateHeat();
}
// the heatmap only shows while idle, never during a run
function heatVisible() {
  return settings.heatmap && !started;
}
function updateHeat() {
  const vals = Object.values(heatMap);
  const max = vals.length ? Math.max(...vals) : 0;
  const show = heatVisible() && max > 0;
  const legend = document.getElementById('heat-legend');
  if (legend) legend.style.display = show ? 'block' : 'none';
  document.querySelectorAll('#kbd .key').forEach(el => {
    const k = el.dataset.k;
    const c = (k && k.length === 1) ? (heatMap[k.toLowerCase()] || 0) : 0;
    el.style.setProperty('--heat', show && c > 0 ? (0.08 + 0.32 * (c / max)).toFixed(2) : 0);
  });
}

// ---- wpm curve (net + raw + errors, monkeytype-style) ----
function sampleTick(elapsed, force) {
  const sec = Math.floor(elapsed);
  if (!force && sec <= lastSampleSec) return;
  lastSampleSec = sec;
  const t = Math.max(elapsed, 1);
  const wpm = Math.round(calcWpm(correctWordChars + skippedChars, t));
  const raw = Math.round(calcWpm(totalTyped + skippedChars, t));
  wpmSamples.push(wpm);
  rawSamples.push(raw);
  charHist.push(correctWordChars + skippedChars);
  const errTotal = Math.max(0, totalTyped - correctChars);
  const errDelta = Math.max(0, errTotal - lastErrTotal);
  lastErrTotal = errTotal;
  errSamples.push(errDelta);
  errEvents.push(errDelta);
  // burst (instantaneous raw wpm from keys in last second)
  if (lastBurstSec < 0) lastBurstSec = sec - 1;
  const dt = Math.max(1, sec - lastBurstSec);
  burstHistory.push(Math.round(calcWpm(keysThisSec, dt)));
  keysThisSec = 0;
  lastBurstSec = sec;
  drawSpark();
}
function consistencyOf(a) {
  return consistencyKogasa(a);
}
function drawSpark() {
  const cv = document.getElementById('spark');
  if (!cv || !cv.getContext) return;
  const ctx = cv.getContext('2d');
  const W = cv.width, H = cv.height;
  ctx.clearRect(0, 0, W, H);
  if (wpmSamples.length < 2) return;
  const dark = document.body.classList.contains('dark');
  const max = Math.max(...wpmSamples, 10);
  ctx.beginPath();
  wpmSamples.forEach((v, i) => {
    const x = 2 + (i / (wpmSamples.length - 1)) * (W - 4);
    const y = H - 3 - (v / max) * (H - 6);
    i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
  });
  ctx.strokeStyle = dark ? '#60a5fa' : '#2563eb';
  ctx.lineWidth = 1.5;
  ctx.stroke();
}
function drawHistoryGraph(canvasId, wpmHist, rawHist, errHist) {
  const cv = document.getElementById(canvasId);
  if (!cv || !cv.getContext) return;
  const dpr = window.devicePixelRatio || 1;
  const cssW = cv.clientWidth || 650, cssH = 220;
  cv.width = cssW * dpr; cv.height = cssH * dpr;
  const ctx = cv.getContext('2d');
  ctx.scale(dpr, dpr);
  const W = cssW, H = cssH;
  ctx.clearRect(0, 0, W, H);
  const dark = document.body.classList.contains('dark');
  const padL = 34, padR = 30, padT = 12, padB = 22;
  const iw = W - padL - padR, ih = H - padT - padB;
  const n = Math.max(wpmHist.length, rawHist.length, 2);
  const maxWpm = Math.max(10, ...wpmHist, ...rawHist);
  const maxErr = Math.max(1, ...errHist);
  const niceMax = Math.ceil(maxWpm / 20) * 20;
  // grid + left axis (wpm)
  ctx.font = '10px system-ui';
  ctx.fillStyle = dark ? '#7a7a82' : '#999';
  ctx.strokeStyle = dark ? '#2b2b30' : '#eee';
  ctx.lineWidth = 1;
  for (let g = 0; g <= 4; g++) {
    const v = Math.round(niceMax * g / 4);
    const y = padT + ih - (v / niceMax) * ih;
    ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(padL + iw, y); ctx.stroke();
    ctx.fillText(String(v), 6, y + 3);
  }
  // right axis (errors)
  const errMax = maxErr <= 2 ? 2 : Math.ceil(maxErr);
  [0, errMax].forEach(v => {
    const y = padT + ih - (v / errMax) * ih;
    ctx.fillText(String(v), padL + iw + 6, y + 3);
  });
  ctx.save();
  ctx.translate(10, padT + ih / 2); ctx.rotate(-Math.PI / 2);
  ctx.fillText('Words per Minute', -30, 0);
  ctx.restore();
  ctx.save();
  ctx.translate(W - 8, padT + ih / 2); ctx.rotate(Math.PI / 2);
  ctx.fillText('Errors', -18, 0);
  ctx.restore();
  const px = i => padL + (n <= 1 ? 0 : (i / (n - 1)) * iw);
  const pyW = v => padT + ih - (v / niceMax) * ih;
  const pyE = v => padT + ih - (v / errMax) * ih;
  // x labels (time / progression)
  ctx.fillStyle = dark ? '#7a7a82' : '#999';
  const totalSec = n;
  for (let i = 0; i < n; i += Math.max(1, Math.floor(n / 8))) {
    ctx.fillText(String(i + 1), px(i) - 3, H - 6);
  }
  ctx.fillText(totalSec + '', padL + iw - 10, H - 6);
  // raw (gray solid)
  if (rawHist.length > 1) {
    ctx.beginPath();
    rawHist.forEach((v, i) => i ? ctx.lineTo(px(i), pyW(v)) : ctx.moveTo(px(i), pyW(v)));
    ctx.strokeStyle = dark ? '#8a8a90' : '#888';
    ctx.lineWidth = 1.6;
    ctx.stroke();
  }
  // wpm net (yellow solid)
  const YEL = '#e2b714';
  if (wpmHist.length > 1) {
    ctx.beginPath();
    wpmHist.forEach((v, i) => i ? ctx.lineTo(px(i), pyW(v)) : ctx.moveTo(px(i), pyW(v)));
    ctx.strokeStyle = YEL;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  // average (yellow dashed)
  if (wpmHist.length > 1) {
    const avg = wpmHist.reduce((s, v) => s + v, 0) / wpmHist.length;
    ctx.beginPath();
    ctx.setLineDash([5, 4]);
    ctx.moveTo(padL, pyW(avg)); ctx.lineTo(padL + iw, pyW(avg));
    ctx.strokeStyle = YEL;
    ctx.lineWidth = 1.4;
    ctx.stroke();
    ctx.setLineDash([]);
  }
  // errors (red X)
  ctx.strokeStyle = '#e5484d';
  ctx.lineWidth = 1.6;
  errHist.forEach((c, i) => {
    if (!c) return;
    const x = px(i), y = pyE(Math.min(c, errMax));
    const s = 4;
    ctx.beginPath();
    ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s);
    ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s);
    ctx.stroke();
  });
}
function drawBigGraph() {
  drawHistoryGraph('big-graph', wpmSamples, rawSamples, errSamples);
}

// ---- ghost race (fight your last run, same text, true pacing) ----
function ghostCharsAt(curve, wpm, t) {
  if (curve && curve.length > 1) {
    const i = Math.min(curve.length - 1, Math.max(0, t));
    const i0 = Math.floor(i), i1 = Math.min(curve.length - 1, i0 + 1);
    const f = i - i0;
    return curve[i0] * (1 - f) + curve[i1] * f;
  }
  return (wpm * 5 / 60) * t; // linear fallback
}
// map absolute presented-text span -> current line {wi, ci}
function spanToLine(span) {
  const base = lineBaseIdx();
  let s = 0;
  for (let i = 0; i < base; i++) s += (presentedWords[i] || '').length + 1;
  for (let wi = 0; wi < wordList.length; wi++) {
    const w = wordList[wi];
    if (span >= s && span <= s + w.length) return {wi, ci: Math.min(span - s, w.length)};
    s += w.length + 1;
  }
  return null;
}
function startGhostTick() {
  stopGhostTick();
  ghostTimer = setInterval(() => {
    if (!started || finished) return;
    const elapsed = (Date.now() - ghostStart) / 1000;
    ghostProgress = ghostCharsAt(ghostCurve, ghostWpm, elapsed);
    // absolute span of past-self caret in the shared text
    ghostSpan = Math.floor(ghostProgress);
    render();
  }, 100);
}
function stopGhostTick() { if (ghostTimer) { clearInterval(ghostTimer); ghostTimer = null; } }
function stopGhost() { ghostActive = false; ghostWpm = 0; ghostProgress = 0; ghostCurve = null; ghostSpan = -1; stopGhostTick(); }
function raceWithRun(run) {
  if (!run) return;
  const cfg = run.config || run;
  // apply config
  if (cfg.testMode) testMode = cfg.testMode;
  if (cfg.wordCount) wordCount = cfg.wordCount;
  if (cfg.timeLimit) timeLimit = cfg.timeLimit;
  if (typeof cfg.usePunct === 'boolean') usePunct = cfg.usePunct;
  if (typeof cfg.useNumbers === 'boolean') useNumbers = cfg.useNumbers;
  if (cfg.quoteLen) quoteLen = cfg.quoteLen;
  saveModes();
  const text = (run.fullText || run.text || []).slice();
  const wpmGhost = run.wpm || 0;
  ghostCurve = (run.charHist && run.charHist.length > 1) ? run.charHist.slice() : null;
  if (text.length) {
    // same text in EVERY mode; endless modes extend it when outrun
    const endless = testMode === 'time' || testMode === 'zen';
    reset({keepGhost: true, sameText: true, text, ghostWpm: wpmGhost, endlessText: endless});
    fullTargetWords = text.slice();
    fullTargetIndex = 0;
    presentedWords = [];
    rematchEndless = endless;
    ghostActive = true; ghostWpm = wpmGhost; ghostProgress = 0; ghostSpan = -1;
    fillLine();
    refreshModeUI();
    focus();
    return;
  }
  reset({keepGhost: true, ghostWpm: wpmGhost});
  ghostActive = true; ghostWpm = wpmGhost; ghostProgress = 0; ghostSpan = -1;
  refreshModeUI();
  focus();
}

// ---- replay (watch keystrokes, exact stored colors) ----
function stopReplay() { replayTimers.forEach(clearTimeout); replayTimers = []; }
function playReplayInto(run, wordsElId, statsElId, wrapElId) {
  const wordsEl = document.getElementById(wordsElId);
  const statsEl = document.getElementById(statsElId);
  const wrap = wrapElId ? document.getElementById(wrapElId) : null;
  if (!run || !run.events || !run.events.length || !wordsEl) return;
  stopReplay();
  if (wrap) wrap.classList.add('show');
  const text = (run.fullText || run.text || []).join(' ');
  const evs = run.events;
  const wpmHist = run.wpmHist || run.wpmHistory || [];
  wordsEl.innerHTML = '';
  const chars = text.split('');
  const spans = chars.map(ch => {
    const s = document.createElement('span');
    s.textContent = ch;
    s.style.color = 'var(--muted)';
    wordsEl.appendChild(s);
    return s;
  });
  let errCount = 0;
  evs.forEach((ev, idx) => {
    const t = setTimeout(() => {
      if (ev.k === 'char' || ev.k === 'space') {
        if (ev.s != null && ev.s >= 0 && spans[ev.s]) {
          // exact path: correctness decided live at capture time
          const good = ev.ok != null ? !!ev.ok : ((ev.k === 'space' ? ' ' : ev.ch) === chars[ev.s]);
          spans[ev.s].style.color = good ? 'var(--correct)' : 'var(--incorrect)';
          if (!good) errCount++;
        } else {
          if (ev.ok === 0) errCount++; // extra char (no span in text)
        }
      } else if (ev.k === 'back') {
        const d = (ev.d != null && ev.d >= 0) ? ev.d : -1;
        if (d >= 0 && spans[d]) spans[d].style.color = 'var(--muted)';
      }
      const sec = Math.round((ev.t || 0) / 1000);
      const w = wpmHist[Math.min(sec, Math.max(0, wpmHist.length - 1))] || 0;
      if (statsEl) statsEl.textContent = `${w} wpm · ${sec}s · ${errCount} errors · replay ${idx+1}/${evs.length}`;
      if (idx === evs.length - 1 && statsEl) {
        statsEl.textContent += ` · done — ${run.wpm || 0} wpm`;
      }
    }, Math.max(0, (ev.t || 0) - (evs[0].t || 0)));
    replayTimers.push(t);
  });
  void t0;
}

// events
function updateCapsWarn(e) {
  const warn = document.getElementById('caps-warn');
  if (!warn) return;
  let on = false;
  try { on = !!(e && e.getModifierState && e.getModifierState('CapsLock')); } catch {}
  warn.style.display = on ? 'block' : 'none';
}
document.addEventListener('keydown', e => {
  lightKey(kbdKeyFor(e), true);
  updateCapsWarn(e);
  if (document.getElementById('menu').classList.contains('show')) {
    toggleMenu(false);
    if (e.key !== 'Tab') return;
  }
  if (document.getElementById('settings').classList.contains('show')) {
    if (e.key === 'Escape' || e.key === 'Tab' || e.key === 'Enter') { e.preventDefault(); hideSettings(); }
    return;
  }
  if (document.getElementById('drill').classList.contains('show')) {
    if (e.key === 'Escape') {
      e.preventDefault();
      document.getElementById('drill').classList.remove('show');
      document.getElementById('results').classList.add('show');
    }
    else if (e.key === 'Tab' || e.key === 'Enter') { e.preventDefault(); reset(); }
    return;
  }
  if (document.getElementById('detail').classList.contains('show')) {
    if (e.key === 'Escape' || e.key === 'Tab' || e.key === 'Enter') { e.preventDefault(); hideDetail(); }
    return;
  }
  if (document.getElementById('stats').classList.contains('show')) {
    if (e.key === 'Escape' || e.key === 'Tab' || e.key === 'Enter') { e.preventDefault(); hideStats(); }
    return;
  }
  if (document.getElementById('history').classList.contains('show')) {
    if (e.key === 'Escape' || e.key === 'Tab' || e.key === 'Enter') { e.preventDefault(); hideHistory(); }
    return;
  }
  if (e.key === 'Escape' && drillActive) { e.preventDefault(); quitDrill(); return; }
  if (e.key === 'Escape' && testMode === 'zen' && started && !finished && !document.getElementById('results').classList.contains('show')) { e.preventDefault(); finish(); return; }
  if (restartMatch(e)) { e.preventDefault(); reset(); return; }
  if (e.key === 'Tab') e.preventDefault();
  if (document.getElementById('results').classList.contains('show')) {
    if (e.key === 'Enter' || e.key === ' ' || restartMatch(e)) { e.preventDefault(); reset(); }
    return;
  }
  if (e.key === 'Backspace') { e.preventDefault(); backspace(); return; }
  if (e.key === 'Enter' && e.shiftKey && testMode === 'zen' && started && !finished &&
      !document.getElementById('results').classList.contains('show')) { e.preventDefault(); finish(); return; }
  if (e.key === 'Enter') { e.preventDefault(); typeChar(' '); return; }
  if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
    if (e.key === ' ' && wordIndex===0 && charIndex===0 && !started) return;
    e.preventDefault();
    typeChar(e.key);
  }
});

$words.addEventListener('click', focus);
document.addEventListener('click', focus);
document.addEventListener('keyup', e => { lightKey(kbdKeyFor(e), false); updateCapsWarn(e); });
window.addEventListener('blur', () => document.querySelectorAll('#kbd .key.lit').forEach(el => el.classList.remove('lit')));
document.getElementById('restart').addEventListener('click', e => { e.stopPropagation(); reset(); });
document.getElementById('again').addEventListener('click', e => { e.stopPropagation(); reset(); });
document.getElementById('race-last').addEventListener('click', e => { e.stopPropagation(); if (lastRun) raceWithRun(lastRun); });
document.getElementById('watch-replay').addEventListener('click', e => {
  e.stopPropagation();
  if (lastRun) playReplayInto(lastRun, 'replay-words', 'replay-stats', 'replay-wrap');
});
document.getElementById('detail-race').addEventListener('click', e => { e.stopPropagation(); if (window._detailRun) raceWithRun(window._detailRun); });
document.getElementById('detail-replay').addEventListener('click', e => {
  e.stopPropagation();
  if (window._detailRun) {
    document.getElementById('detail-replay-wrap').style.display = 'block';
    playReplayInto(window._detailRun, 'detail-replay-words', 'detail-replay-stats', null);
  }
});
document.getElementById('copy').addEventListener('click', async e => {
  e.stopPropagation();
  const s = window._lastScore;
  if (!s) return;
  const txt = `type pure: ${s.wpm} WPM (raw ${s.raw}) · ${s.acc != null ? s.acc + '% acc' : 'zen'} · ${s.correctWords} words · ${s.mode}`;
  try { await navigator.clipboard.writeText(txt); e.target.textContent = 'copied!'; }
  catch { prompt('Copy your score:', txt); }
  setTimeout(() => e.target.textContent = 'copy score', 1500);
});
document.getElementById('hist-open2').addEventListener('click', e => { e.stopPropagation(); showHistory(); });
document.getElementById('hist-back').addEventListener('click', e => { e.stopPropagation(); hideHistory(); });
document.getElementById('hist-clear').addEventListener('click', e => {
  e.stopPropagation();
  storeDel('history');
  showHistory();
});
document.getElementById('stats-open2').addEventListener('click', e => { e.stopPropagation(); showStats(); });
document.getElementById('stats-open3').addEventListener('click', e => { e.stopPropagation(); showStats(); });
document.getElementById('stats-back').addEventListener('click', e => { e.stopPropagation(); hideStats(); });
document.getElementById('stats-hist').addEventListener('click', e => { e.stopPropagation(); hideView('stats'); showHistory(); });
document.getElementById('detail-back').addEventListener('click', e => { e.stopPropagation(); hideDetail(); });
document.getElementById('detail-again').addEventListener('click', e => { e.stopPropagation(); reset(); });
document.getElementById('theme-toggle').addEventListener('click', e => { e.stopPropagation(); setTheme(!document.body.classList.contains('dark')); });
function goHome(e) { if (e) e.stopPropagation(); reset(); }
document.getElementById('logo-home').addEventListener('click', goHome);
document.getElementById('logo-home').addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goHome(e); }
});
document.getElementById('burger').addEventListener('click', e => { e.stopPropagation(); toggleMenu(); });
document.getElementById('menu-close').addEventListener('click', e => { e.stopPropagation(); toggleMenu(false); });
document.getElementById('scrim').addEventListener('click', e => { e.stopPropagation(); toggleMenu(false); });
document.addEventListener('click', e => {
  const m = document.getElementById('menu');
  if (m.classList.contains('show') && !e.target.closest('#menu') && !e.target.closest('#burger')) toggleMenu(false);
});
document.querySelectorAll('#menu button').forEach(b =>
  b.addEventListener('click', e => {
    e.stopPropagation();
    toggleMenu(false);
    const go = b.dataset.go;
    if (go === 'test') reset();
    else if (go === 'history') showHistory();
    else if (go === 'stats') showStats();
    else if (go === 'settings') showSettings();
  }));
document.getElementById('settings-back').addEventListener('click', e => { e.stopPropagation(); hideSettings(); });
document.getElementById('retry').addEventListener('click', e => { e.stopPropagation(); startDrill(window._lastMissed || []); });
document.getElementById('drill-again').addEventListener('click', e => { e.stopPropagation(); reset(); });
document.getElementById('drill-back').addEventListener('click', e => {
  e.stopPropagation();
  document.getElementById('drill').classList.remove('show');
  document.getElementById('results').classList.add('show');
});
document.getElementById('heat-clear').addEventListener('click', e => {
  e.stopPropagation();
  heatMap = {};
  storeDel('heat');
  updateHeat();
});
document.getElementById('zen-finish').addEventListener('click', e => { e.stopPropagation(); if (started && !finished) finish(); });
function closeLangMenu() { const lm = document.getElementById('lang-menu'); if (lm) lm.style.display = 'none'; }
document.getElementById('lang-btn').addEventListener('click', e => {
  e.stopPropagation();
  const lm = document.getElementById('lang-menu');
  lm.style.display = lm.style.display === 'none' ? 'flex' : 'none';
});
document.querySelectorAll('#lang-menu button').forEach(b =>
  b.addEventListener('click', e => { e.stopPropagation(); closeLangMenu(); setLanguage(b.dataset.l); }));
document.addEventListener('click', e => {
  const lw = document.getElementById('lang-wrap');
  if (lw && !e.target.closest('#lang-wrap')) closeLangMenu();
});

document.querySelectorAll('#mode-seg button').forEach(b =>
  b.addEventListener('click', e => { e.stopPropagation(); setTestMode(b.dataset.m); }));
document.querySelectorAll('#mod-seg button').forEach(b =>
  b.addEventListener('click', e => {
    e.stopPropagation();
    if (b.dataset.mod === 'punctuation') usePunct = !usePunct;
    if (b.dataset.mod === 'numbers') useNumbers = !useNumbers;
    saveModes();
    reset();
  }));

try {
  const th = storeGet('theme', getCookie('type-epure-theme'));
  if (th === 'dark' || th === 'light') setTheme(th === 'dark', false);
  else setTheme(true, false);
} catch { setTheme(true, false); }
buildKbd();
applySettings();
reset(timeLimit); // instant first paint with fallback banks
loadBanks().then(() => reset(timeLimit)).catch(() => {});
