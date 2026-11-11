(() => {
  'use strict';

  const $ = (selector) => document.querySelector(selector);
  const svgNS = 'http://www.w3.org/2000/svg';
  const storageKey = 'aulaia-cos-en-joc-capes-v1';
  const zones = [
    {id:'eyes', label:'ulls', view:'front', x:210, y:82, rx:31, ry:15, fact:'Els ulls capten la llum; el cervell interpreta allò que veiem.'},
    {id:'ear', label:'orella', view:'front', x:260, y:77, rx:14, ry:23, fact:'L’oïda transforma vibracions en missatges per al cervell i també ajuda a l’equilibri.'},
    {id:'nose', label:'nas', view:'front', x:210, y:97, rx:14, ry:13, fact:'Amb el nas olorem i deixem entrar l’aire.'},
    {id:'mouth', label:'boca', view:'front', x:210, y:113, rx:18, ry:10, fact:'A la boca masteguem i barregem el menjar amb saliva: la digestió ja comença.'},
    {id:'neck', label:'coll', view:'front', x:210, y:139, rx:26, ry:18, fact:'El coll uneix el cap i el tronc, i ens permet moure el cap.'},
    {id:'shoulder', label:'espatlla', view:'front', x:268, y:177, rx:24, ry:25, fact:'L’espatlla dona molta mobilitat al braç.'},
    {id:'elbow', label:'colze', view:'front', x:303, y:282, rx:18, ry:20, fact:'El colze és una articulació que deixa doblegar i estirar el braç.'},
    {id:'hand', label:'mà', view:'front', x:317, y:365, rx:23, ry:32, fact:'La mà i el polze treballen junts per agafar objectes de mides diferents.'},
    {id:'chest', label:'pit', view:'front', x:210, y:207, rx:40, ry:27, fact:'Darrere del pit hi ha el cor i els pulmons.'},
    {id:'belly', label:'panxa', view:'front', x:210, y:270, rx:38, ry:31, fact:'A la panxa hi ha òrgans que ajuden a transformar els aliments.'},
    {id:'knee', label:'genoll', view:'front', x:229, y:461, rx:20, ry:24, fact:'El genoll ajuda a caminar, saltar i ajupir-nos.'},
    {id:'foot', label:'peu', view:'front', x:237, y:566, rx:33, ry:18, fact:'Els peus suporten el pes del cos i ajuden a mantenir l’equilibri.'},
    {id:'back', label:'esquena', view:'back', x:210, y:218, rx:43, ry:38, fact:'L’esquena ens ajuda a mantenir-nos drets i a moure el tronc.'},
    {id:'glutes', label:'glutis', view:'back', x:210, y:312, rx:40, ry:30, fact:'El gluti major és el múscul més gran del cos i ajuda a estendre el maluc.'},
    {id:'calf', label:'panxell', view:'back', x:229, y:511, rx:20, ry:33, fact:'Els músculs del panxell ajuden a posar-nos de puntetes.'}
  ];

  const clues = [
    {zone:'eyes', text:'Dues finestres deixen entrar la llum; el cervell hi descobreix formes i colors.', hint:'Quan es fa fosc, aquestes finestres tenen menys llum per treballar.'},
    {zone:'ear', text:'Una cançó arriba com vibracions i acaba convertida en missatges per al cervell. A dins també hi viu l’equilibri.', hint:'En tenim una a cada costat del cap.'},
    {zone:'nose', text:'Reconec la canyella del pastís abans de tastar-la, mentre l’aire entra cap als pulmons.', hint:'També puc detectar l’olor de la pluja.'},
    {zone:'mouth', text:'La saliva humiteja el menjar i la digestió ja comença aquí.', hint:'Aquí també hi treballen les dents i la llengua.'},
    {zone:'neck', text:'És el pont que deixa girar el cap sense girar tot el cos.', hint:'Uneix el cap amb el tronc.'},
    {zone:'shoulder', text:'Per tocar una estrella de paper ben alta, aquesta articulació deixa alçar i girar el braç.', hint:'És el lloc on el braç s’uneix al tronc.'},
    {zone:'elbow', text:'Per acostar una cullera a la boca, aquesta frontissa es plega.', hint:'És a mig camí entre l’espatlla i la mà.'},
    {zone:'hand', text:'El polze treballa amb els altres dits per agafar una peça minúscula.', hint:'També et serveix per saludar amb els cinc dits.'},
    {zone:'chest', text:'Una bomba amagada sota les costelles continua treballant quan dorms.', hint:'Busca la zona del cos que protegeix el cor.'},
    {zone:'belly', text:'Després de dinar, darrere d’aquesta zona treballen òrgans que aprofiten els nutrients.', hint:'Sovint fa sorolls quan tens gana.'},
    {zone:'knee', text:'Per ajupir-te i cordar-te la sabata, aquesta frontissa es doblega.', hint:'És a la cama, entre la cuixa i el peu.'},
    {zone:'foot', text:'Reparteixen el teu pes cada vegada que camines i t’ajuden a mantenir l’equilibri.', hint:'Tenen dits, però no són mans.'},
    {zone:'back', text:'Quan portes una motxilla, treballo per mantenir el tronc dret. Pots mirar-me si gires el personatge.', hint:'Sóc a la part posterior del tronc.'},
    {zone:'glutes', text:'Quan puges escales, el múscul més gran del cos treballa aquí. I quan t’asseus… aquí descansa el cul!', hint:'Gira el personatge i mira just sota la cintura.'},
    {zone:'calf', text:'Quan et poses de puntetes per veure què hi ha al prestatge, aquests músculs s’esforcen.', hint:'Són a la part del darrere de la cama, sota el genoll.'}
  ];

  const muscleSteps = [
    {
      story:'Primer estires el braç cap amunt per arribar fins al pot.',
      question:'Quins músculs principals alcen i estiren el braç?',
      options:[['deltoid','Deltoide'],['trapezius','Trapezi'],['serratus','Serrat anterior'],['triceps','Tríceps'],['biceps','Bíceps'],['quadriceps','Quàdriceps']],
      correct:['deltoid','trapezius','serratus','triceps'],
      explanation:'El deltoide alça el braç. El trapezi i el serrat anterior mouen l’omòplat perquè pugui pujar més. El tríceps estira el colze. El bíceps serà útil en el pas següent.'
    },
    {
      story:'Ja hi arribes! Ara subjectes el pot i l’acostes cap a tu.',
      question:'Quins músculs principals agafen el pot i dobleguen el colze?',
      options:[['forearm','Mà i avantbraç'],['biceps','Bíceps'],['deltoid','Deltoide'],['triceps','Tríceps'],['quadriceps','Quàdriceps'],['calves','Bessons']],
      correct:['forearm','biceps'],
      explanation:'Els músculs de la mà i l’avantbraç tanquen els dits per subjectar el pot. El bíceps ajuda a doblegar el colze i acostar-lo. Altres músculs continuen estabilitzant el moviment.'
    }
  ];

  const brainParts = [
    {id:'amygdala', name:'Amígdala', icon:'⚡', answer:'alert', note:'Ajuda a detectar que alguna cosa pot ser important i cal parar-hi atenció.'},
    {id:'hippocampus', name:'Hipocamp', icon:'▣', answer:'memory', note:'Ajuda a formar i recuperar records, com altres sorolls que ja coneixes.'},
    {id:'prefrontal', name:'Escorça prefrontal', icon:'✦', answer:'choose', note:'Ajuda a pensar opcions i decidir què fer després de mirar què ha passat.'}
  ];
  const brainOptions = [
    ['alert','Això pot ser important; hi paro atenció.'],
    ['memory','Recordo un soroll semblant.'],
    ['choose','Miro què ha passat i trio què fer.']
  ];

  const baseLayers = [
    {id:'body', name:'Parts del cos', sub:'El que veiem', icon:'✋', description:'Les parts visibles ens ajuden a moure’ns, percebre el món, menjar i mantenir l’equilibri.'},
    {id:'muscles', name:'Músculs', sub:'Com ens movem', icon:'💪', description:'Els músculs treballen en equip per moure ossos i articulacions.'},
    {id:'circulation', name:'Circulació', sub:'El camí de la sang', icon:'♥', description:'El cor, les artèries, les venes i els pulmons formen part del viatge continu de la sang.'},
    {id:'brain', name:'Cervell i emocions', sub:'Pensem i sentim', icon:'✦', description:'Diferents parts del cervell comparteixen informació quan recordem, sentim i triem què fer.'}
  ];

  let mode = 'tickle';
  let view = 'front';
  let selectedLayer = 'body';
  let customLayers = loadLayers();
  let clueDeck = [0, ...shuffle(Array.from({length:clues.length - 1}, (_, i) => i + 1))];
  let currentClue = null;
  let clueSolved = false;
  let sessionScore = 0;
  let muscleStep = 0;
  let deferredInstall = null;

  function shuffle(items) {
    const list = [...items];
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }

  function setSpeech(text) {
    $('#figureSpeech').textContent = text;
  }

  function setFeedback(selector, html, type = '') {
    const el = $(selector);
    el.innerHTML = html;
    el.classList.toggle('is-success', type === 'success');
    el.classList.toggle('is-error', type === 'error');
  }

  function setView(next) {
    view = next;
    $('#bodyStage').dataset.view = next;
    $('#viewLabel').textContent = next === 'front' ? 'Vista de davant' : 'Vista del darrere';
    $('#backArt').setAttribute('aria-hidden', next !== 'back');
    $('#frontArt').setAttribute('aria-hidden', next !== 'front');
    renderHotspots();
    renderCustomMarkers();
  }

  function setStageLayer(layer) {
    $('#bodyStage').dataset.layer = layer;
    const names = {body:'Parts del cos', muscles:'Músculs', circulation:'Circulació', brain:'Cervell i emocions', custom:'La teva capa'};
    $('#layerBadge').textContent = names[layer] || 'La teva capa';
    renderCustomMarkers();
  }

  function setMode(next) {
    mode = next;
    document.querySelectorAll('.nav-button').forEach(button => {
      const active = button.dataset.mode === next;
      button.classList.toggle('is-active', active);
      if (active) button.setAttribute('aria-current', 'page'); else button.removeAttribute('aria-current');
    });
    document.querySelectorAll('.activity-panel').forEach(panel => panel.hidden = panel.dataset.panel !== next);
    const layer = next === 'muscles' ? 'muscles' : next === 'circulation' ? 'circulation' : next === 'emotions' ? 'brain' : next === 'layers' ? (baseLayers.find(item => item.id === selectedLayer)?.id || 'custom') : 'body';
    setStageLayer(layer);
    if (next === 'circulation' || next === 'emotions' || next === 'muscles') setView('front');
    if (next === 'tickle') setSpeech('On és? 🤔');
    if (next === 'muscles') setSpeech('Tots en equip! 💪');
    if (next === 'circulation') setSpeech('Bum, bum! ♥');
    if (next === 'emotions') setSpeech('Pensem junts ✦');
    if (next === 'layers') { setSpeech('Explora’m! ✳'); renderLayerList(); renderLayerDetail(); }
  }

  function svgNode(tag, attrs = {}) {
    const node = document.createElementNS(svgNS, tag);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
    return node;
  }

  function renderHotspots() {
    const parent = $('#hotspots');
    parent.replaceChildren();
    const buttons = $('#zoneButtons');
    buttons.replaceChildren();
    zones.filter(zone => zone.view === view).forEach(zone => {
      const group = svgNode('g', {class:'hotspot', role:'button', tabindex:'0', 'aria-label':`Toca ${zone.label}`, 'data-zone':zone.id});
      group.append(svgNode('ellipse', {class:'hit-ring', cx:zone.x, cy:zone.y, rx:zone.rx, ry:zone.ry}));
      group.append(svgNode('ellipse', {class:'hit-area', cx:zone.x, cy:zone.y, rx:zone.rx + 5, ry:zone.ry + 5}));
      const label = svgNode('text', {class:'hotspot-label', x:zone.x, y:zone.y - zone.ry - 8, 'text-anchor':'middle'});
      label.textContent = zone.label;
      group.append(label);
      group.addEventListener('click', () => handleZone(zone.id, group));
      group.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); handleZone(zone.id, group); }
      });
      parent.append(group);
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = zone.label;
      button.addEventListener('click', () => handleZone(zone.id, group));
      buttons.append(button);
    });
  }

  function flashHotspot(element, correct) {
    if (!element) return;
    element.classList.add(correct ? 'is-correct' : 'is-wrong');
    window.setTimeout(() => element.classList.remove('is-correct', 'is-wrong'), 950);
  }

  function tickle() {
    const stage = $('#bodyStage');
    stage.classList.remove('is-tickled');
    void stage.offsetWidth;
    stage.classList.add('is-tickled');
    window.setTimeout(() => stage.classList.remove('is-tickled'), 900);
    if (navigator.vibrate) navigator.vibrate(45);
  }

  function handleZone(id, element) {
    const zone = zones.find(item => item.id === id);
    if (!zone) return;
    if (mode === 'tickle') {
      if (clueSolved) { setSpeech('Una altra pista! ✨'); return; }
      const correct = currentClue && currentClue.zone === id;
      flashHotspot(element, correct);
      if (correct) {
        clueSolved = true;
        sessionScore += 1;
        $('#scorePill').textContent = `${sessionScore} ${sessionScore === 1 ? 'descoberta' : 'descobertes'}`;
        renderProgress();
        tickle();
        setSpeech('He-he! ✨');
        setFeedback('#clueFeedback', `<strong>Molt bé! ${capitalize(zone.label)}.</strong><p>${zone.fact}</p>`, 'success');
      } else {
        setSpeech('Prova un altre lloc!');
        setFeedback('#clueFeedback', `<strong>Encara no!</strong> Has tocat ${zone.label}. <span class="little-hint">${zone.fact}</span>`, 'error');
      }
    } else if (mode === 'layers') {
      const custom = customLayers.find(item => item.id === selectedLayer);
      const point = custom?.points.find(item => item.zone === id);
      setSpeech(point ? point.label : capitalize(zone.label));
      if (point) {
        const detail = $('#layerDetail');
        const callout = document.createElement('div');
        callout.className = 'fact-box';
        const strong = document.createElement('strong');
        strong.textContent = point.label;
        const p = document.createElement('p');
        p.textContent = point.fact;
        callout.append(strong, p);
        detail.prepend(callout);
        window.setTimeout(() => callout.remove(), 6000);
      }
      flashHotspot(element, !!point);
    } else {
      setSpeech(capitalize(zone.label));
      flashHotspot(element, true);
    }
  }

  function capitalize(s) { return s.charAt(0).toLocaleUpperCase('ca') + s.slice(1); }

  function renderProgress() {
    const dots = $('#progressDots');
    dots.replaceChildren();
    for (let i = 0; i < 8; i++) {
      const dot = document.createElement('i');
      if (i < Math.min(8, sessionScore)) dot.classList.add('filled');
      dots.append(dot);
    }
  }

  function nextClue() {
    if (clueDeck.length === 0) clueDeck = shuffle(Array.from({length:clues.length}, (_, i) => i));
    currentClue = clues[clueDeck.shift()];
    clueSolved = false;
    $('#clueText').textContent = currentClue.text;
    $('#extraHintButton').disabled = false;
    setFeedback('#clueFeedback', 'Toca una zona del personatge. Si cal, gira’l per mirar-lo per darrere.');
    setSpeech('On és? 🤔');
  }

  function showExtraHint() {
    if (clueSolved) return;
    setFeedback('#clueFeedback', `<strong>Una altra pista:</strong> ${currentClue.hint}`);
    $('#extraHintButton').disabled = true;
  }

  function renderMuscleStep() {
    const step = muscleSteps[muscleStep];
    $('#muscleStory').textContent = step.story;
    $('#muscleQuestion').textContent = step.question;
    document.querySelectorAll('.step-button').forEach(button => button.classList.toggle('is-active', Number(button.dataset.step) === muscleStep));
    const parent = $('#muscleChoices');
    parent.replaceChildren();
    step.options.forEach(([id, label]) => {
      const wrapper = document.createElement('label');
      wrapper.className = 'choice';
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.value = id;
      input.name = 'muscle-choice';
      const text = document.createElement('span');
      text.textContent = label;
      wrapper.append(input, text);
      parent.append(wrapper);
    });
    setFeedback('#muscleFeedback', 'Pots seleccionar més d’una resposta.');
  }

  function checkMuscles() {
    const step = muscleSteps[muscleStep];
    const chosen = [...document.querySelectorAll('#muscleChoices input:checked')].map(input => input.value);
    if (chosen.length === 0) { setFeedback('#muscleFeedback', 'Tria almenys un múscul per provar-ho.', 'error'); return; }
    document.querySelectorAll('#muscleChoices .choice').forEach(wrapper => {
      const input = wrapper.querySelector('input');
      wrapper.classList.remove('is-correct', 'is-missed', 'is-wrong');
      if (step.correct.includes(input.value)) wrapper.classList.add(input.checked ? 'is-correct' : 'is-missed');
      else if (input.checked) wrapper.classList.add('is-wrong');
    });
    const exact = chosen.length === step.correct.length && chosen.every(id => step.correct.includes(id));
    const message = exact ? '<strong>Equip complet! 🎉</strong>' : '<strong>Repassem l’equip:</strong> verd = encert, groc = faltava, vermell = aquest no és principal en aquest pas.';
    setFeedback('#muscleFeedback', `${message}<p>${step.explanation}</p>`, exact ? 'success' : 'error');
    if (exact) setSpeech('Ben jugat! 💪');
  }

  function updateBpm() {
    const bpm = Number($('#bpmSlider').value);
    $('#bpmValue').textContent = String(bpm);
    $('.heart-control').style.setProperty('--beat-duration', `${(60 / bpm).toFixed(3)}s`);
    $('#bodyStage').style.setProperty('--flow-duration', `${(110 / bpm).toFixed(3)}s`);
    $('#bpmFact').textContent = bpm < 85
      ? 'Ara els batecs de la simulació van més pausats. El cor continua impulsant la sang pel mateix circuit.'
      : bpm < 120
        ? 'Ara els batecs de la simulació van a un ritme mitjà. El recorregut de la sang no canvia.'
        : 'Ara els batecs de la simulació van més de pressa, com quan ens movem molt. El circuit continua sent el mateix.';
  }

  function renderBrain() {
    const parent = $('#brainMatch');
    parent.replaceChildren();
    brainParts.forEach(part => {
      const row = document.createElement('div');
      row.className = 'brain-row';
      row.dataset.part = part.id;
      const label = document.createElement('label');
      const icon = document.createElement('span');
      icon.className = 'brain-icon';
      icon.textContent = part.icon;
      const name = document.createElement('span');
      name.textContent = part.name;
      label.append(icon, name);
      const select = document.createElement('select');
      select.setAttribute('aria-label', `Què fa ${part.name}?`);
      const prompt = document.createElement('option');
      prompt.value = '';
      prompt.textContent = 'Tria una tasca…';
      select.append(prompt);
      brainOptions.forEach(([value, text]) => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = text;
        select.append(option);
      });
      row.append(label, select);
      parent.append(row);
    });
  }

  function checkBrain() {
    const rows = [...document.querySelectorAll('.brain-row')];
    if (rows.some(row => !row.querySelector('select').value)) { setFeedback('#brainFeedback', 'Tria una tasca per a les tres parts del cervell.', 'error'); return; }
    let score = 0;
    rows.forEach(row => {
      const part = brainParts.find(item => item.id === row.dataset.part);
      const correct = row.querySelector('select').value === part.answer;
      row.classList.toggle('is-correct', correct);
      row.classList.toggle('is-wrong', !correct);
      if (correct) score++;
    });
    const notes = brainParts.map(part => `<strong>${part.name}:</strong> ${part.note}`).join('<br>');
    setFeedback('#brainFeedback', `<strong>${score === 3 ? 'Molt bé! Les tres relacions són correctes.' : `${score} de 3. Mira les explicacions i torna-ho a provar.`}</strong><p>${notes}</p>`, score === 3 ? 'success' : 'error');
    if (score === 3) setSpeech('Pensem en xarxa! ✦');
  }

  function loadLayers() {
    try { return validateLayers(JSON.parse(localStorage.getItem(storageKey) || '[]')); }
    catch { return []; }
  }

  function saveLayers() {
    try { localStorage.setItem(storageKey, JSON.stringify(customLayers)); }
    catch { window.alert('Aquest navegador no ha pogut desar les capes. Descarrega una còpia per conservar-les.'); }
  }

  function validateLayers(value) {
    if (!Array.isArray(value)) return [];
    return value.slice(0, 20).filter(layer => layer && typeof layer === 'object').map((layer, index) => ({
      id: `custom-${index}-${Math.random().toString(36).slice(2,8)}`,
      name: String(layer.name || 'Capa nova').slice(0,32),
      description: String(layer.description || '').slice(0,160),
      color: /^#[0-9a-fA-F]{6}$/.test(layer.color) ? layer.color : '#8056c6',
      points: Array.isArray(layer.points) ? layer.points.slice(0,30).filter(point => zones.some(zone => zone.id === point?.zone)).map(point => ({zone:point.zone, label:String(point.label || '').slice(0,35), fact:String(point.fact || '').slice(0,180)})) : []
    }));
  }

  function renderLayerList() {
    const parent = $('#layerList');
    parent.replaceChildren();
    [...baseLayers, ...customLayers].forEach(layer => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `layer-item${selectedLayer === layer.id ? ' is-active' : ''}`;
      const swatch = document.createElement('span');
      swatch.className = 'layer-swatch';
      swatch.textContent = layer.icon || '✳';
      if (layer.color) { swatch.style.backgroundColor = layer.color; swatch.style.color = '#fff'; }
      const text = document.createElement('span');
      text.textContent = layer.name;
      const sub = document.createElement('small');
      sub.textContent = layer.sub || 'Capa creada per tu';
      text.append(sub);
      button.append(swatch, text);
      button.addEventListener('click', () => {
        selectedLayer = layer.id;
        setStageLayer(baseLayers.some(item => item.id === layer.id) ? layer.id : 'custom');
        renderLayerList();
        renderLayerDetail();
      });
      parent.append(button);
    });
  }

  function renderLayerDetail() {
    const parent = $('#layerDetail');
    parent.replaceChildren();
    const layer = [...baseLayers, ...customLayers].find(item => item.id === selectedLayer) || baseLayers[0];
    const title = document.createElement('h3');
    title.textContent = layer.name;
    const description = document.createElement('p');
    description.textContent = layer.description;
    parent.append(title, description);
    if (baseLayers.some(item => item.id === layer.id)) {
      const note = document.createElement('p');
      note.textContent = layer.id === 'body' ? 'Prova de tocar diferents zones del personatge.' : layer.id === 'muscles' ? 'Les zones acolorides mostren alguns músculs importants.' : layer.id === 'circulation' ? 'Les línies mostren el circuit de manera simplificada.' : 'El cervell i el cos intercanvien senyals.';
      parent.append(note);
      return;
    }
    const list = document.createElement('div');
    list.className = 'point-list';
    if (layer.points.length === 0) {
      const empty = document.createElement('p');
      empty.textContent = 'Aquesta capa encara no té punts. Afegeix-ne un aquí sota.';
      list.append(empty);
    }
    layer.points.forEach(point => {
      const entry = document.createElement('div');
      entry.className = 'point-entry';
      const content = document.createElement('span');
      const strong = document.createElement('strong');
      strong.textContent = `${point.label} · `;
      content.append(strong, document.createTextNode(point.fact));
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.textContent = '×';
      remove.setAttribute('aria-label', `Esborra el punt ${point.label}`);
      remove.addEventListener('click', () => {
        layer.points = layer.points.filter(item => item !== point);
        saveLayers(); renderLayerDetail(); renderCustomMarkers();
      });
      entry.append(content, remove);
      list.append(entry);
    });
    parent.append(list);
    const form = document.createElement('form');
    form.className = 'point-form';
    const zoneLabel = document.createElement('label');
    zoneLabel.textContent = 'Punt del personatge';
    const zoneSelect = document.createElement('select');
    zoneSelect.name = 'zone';
    zones.forEach(zone => { const option = document.createElement('option'); option.value = zone.id; option.textContent = `${zone.label} (${zone.view === 'front' ? 'davant' : 'darrere'})`; zoneSelect.append(option); });
    zoneLabel.append(zoneSelect);
    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Nom del punt';
    const nameInput = document.createElement('input'); nameInput.name = 'label'; nameInput.required = true; nameInput.maxLength = 35; nameInput.placeholder = 'Què hi vols mostrar?'; nameLabel.append(nameInput);
    const factLabel = document.createElement('label');
    factLabel.textContent = 'Què hi aprendrem?';
    const factInput = document.createElement('input'); factInput.name = 'fact'; factInput.required = true; factInput.maxLength = 180; factInput.placeholder = 'Una explicació curta'; factLabel.append(factInput);
    const submit = document.createElement('button'); submit.type = 'submit'; submit.className = 'secondary-button'; submit.textContent = 'Afegeix el punt';
    form.append(zoneLabel, nameLabel, factLabel, submit);
    form.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(form);
      const zone = String(data.get('zone'));
      const label = String(data.get('label')).trim().slice(0,35);
      const fact = String(data.get('fact')).trim().slice(0,180);
      if (!label || !fact || !zones.some(item => item.id === zone)) return;
      layer.points = layer.points.filter(point => point.zone !== zone);
      layer.points.push({zone, label, fact});
      saveLayers();
      setView(zones.find(item => item.id === zone).view);
      renderLayerDetail(); renderCustomMarkers();
      setSpeech('Nou punt! ✳');
    });
    parent.append(form);
    const removeLayer = document.createElement('button');
    removeLayer.type = 'button';
    removeLayer.className = 'delete-layer-button';
    removeLayer.textContent = 'Esborra aquesta capa';
    removeLayer.addEventListener('click', () => {
      if (!window.confirm(`Vols esborrar la capa «${layer.name}»?`)) return;
      customLayers = customLayers.filter(item => item !== layer);
      selectedLayer = 'body';
      saveLayers(); renderLayerList(); renderLayerDetail(); setStageLayer('body');
    });
    parent.append(removeLayer);
  }

  function renderCustomMarkers() {
    const parent = $('#customMarkers');
    parent.replaceChildren();
    if (mode !== 'layers' || $('#bodyStage').dataset.layer !== 'custom') return;
    const layer = customLayers.find(item => item.id === selectedLayer);
    if (!layer) return;
    layer.points.filter(point => zones.find(zone => zone.id === point.zone)?.view === view).forEach((point, index) => {
      const zone = zones.find(item => item.id === point.zone);
      const marker = svgNode('g', {class:'custom-marker'});
      marker.append(svgNode('circle', {cx:zone.x, cy:zone.y, r:13, fill:layer.color}));
      const text = svgNode('text', {x:zone.x, y:zone.y + 1});
      text.textContent = String(index + 1);
      marker.append(text);
      parent.append(marker);
    });
  }

  function createLayer(event) {
    event.preventDefault();
    if (customLayers.length >= 20) { window.alert('Ja tens 20 capes. Descarrega-les abans de crear-ne més.'); return; }
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name')).trim().slice(0,32);
    const description = String(data.get('description')).trim().slice(0,160);
    const color = String(data.get('color'));
    if (!name || !description) return;
    const layer = {id:`custom-${Date.now()}`, name, description, color:/^#[0-9a-fA-F]{6}$/.test(color) ? color : '#8056c6', points:[]};
    customLayers.push(layer);
    selectedLayer = layer.id;
    saveLayers();
    event.currentTarget.reset();
    $('.create-layer').open = false;
    setStageLayer('custom'); renderLayerList(); renderLayerDetail();
  }

  function exportLayers() {
    const data = JSON.stringify({app:'AULAIA Cos en joc', version:1, layers:customLayers.map(({name,description,color,points}) => ({name,description,color,points}))}, null, 2);
    const url = URL.createObjectURL(new Blob([data], {type:'application/json'}));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'aulaia-les-meves-capes.json';
    document.body.append(link);
    link.click(); link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function importLayers(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (file.size > 100000) { window.alert('El fitxer és massa gran.'); return; }
    try {
      const raw = JSON.parse(await file.text());
      if (raw.app !== 'AULAIA Cos en joc' || raw.version !== 1 || !Array.isArray(raw.layers)) throw new Error('format');
      const imported = validateLayers(raw.layers);
      if (imported.length === 0) throw new Error('empty');
      customLayers = [...customLayers, ...imported].slice(0,20);
      selectedLayer = imported[0].id;
      saveLayers(); setStageLayer('custom'); renderLayerList(); renderLayerDetail();
      setSpeech('Capes importades! ✳');
    } catch {
      window.alert('No he pogut llegir aquestes capes. Comprova que sigui un fitxer exportat per aquesta app.');
    }
  }

  function setupInstall() {
    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault();
      deferredInstall = event;
      $('#installButton').hidden = false;
    });
    $('#installButton').addEventListener('click', async () => {
      if (!deferredInstall) return;
      deferredInstall.prompt();
      await deferredInstall.userChoice;
      deferredInstall = null;
      $('#installButton').hidden = true;
    });
    window.addEventListener('appinstalled', () => { $('#installButton').hidden = true; deferredInstall = null; });
    if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
      window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
    }
  }

  document.querySelectorAll('.nav-button').forEach(button => button.addEventListener('click', () => setMode(button.dataset.mode)));
  $('#turnButton').addEventListener('click', () => setView(view === 'front' ? 'back' : 'front'));
  $('#extraHintButton').addEventListener('click', showExtraHint);
  $('#nextClueButton').addEventListener('click', nextClue);
  document.querySelectorAll('.step-button').forEach(button => button.addEventListener('click', () => { muscleStep = Number(button.dataset.step); renderMuscleStep(); }));
  $('#checkMusclesButton').addEventListener('click', checkMuscles);
  $('#bpmSlider').addEventListener('input', updateBpm);
  $('#checkBrainButton').addEventListener('click', checkBrain);
  $('#newLayerForm').addEventListener('submit', createLayer);
  $('#exportLayersButton').addEventListener('click', exportLayers);
  $('#importLayersInput').addEventListener('change', importLayers);

  renderHotspots();
  renderProgress();
  renderMuscleStep();
  renderBrain();
  updateBpm();
  nextClue();
  setupInstall();
})();
