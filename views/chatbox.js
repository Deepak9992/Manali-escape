// ─── Manali Escape Voice Chatbot ───────────────────────────────────────────

const ChatBot = (function () {

  // ── Knowledge base ───────────────────────────────────────────────────────────
  var KB = {
    destinations: [
      { name: 'Manali',       region: 'Kullu',          desc: 'High-altitude resort town known for Solang Valley, Rohtang Pass, and the ancient Hadimba Temple. Best visited October to June.' },
      { name: 'Shimla',       region: 'Shimla',         desc: 'The Queen of Hills and former summer capital of British India. Famous for Mall Road, The Ridge, and Jakhu Temple.' },
      { name: 'Spiti Valley', region: 'Lahaul & Spiti', desc: 'A cold desert mountain valley with Key Monastery, Chandratal Lake, and dramatic landscapes. Best visited June to October.' },
      { name: 'Dharamshala',  region: 'Kangra',         desc: 'Home of the Dalai Lama and Namgyal Monastery. Blends Tibetan culture with Himalayan scenery.' },
      { name: 'Kasol',        region: 'Kullu',          desc: 'Known as the Amsterdam of India. A backpacker haven along the Parvati River with stunning treks to Kheerganga.' },
      { name: 'Bir Billing',  region: 'Kangra',         desc: 'The paragliding capital of India, also home to Palpung Sherabling Monastery and Tibetan settlements.' }
    ],
    adventure: [
      { name: 'Trekking',        desc: 'Routes like Triund, Kheerganga, Hampta Pass, and Pin Parvati Pass. Best from May to October.' },
      { name: 'Paragliding',     desc: 'Bir Billing is the paragliding capital of India. Best from March to May and September to November.' },
      { name: 'Skiing',          desc: 'Solang Valley, Kufri, and Narkanda offer great skiing. Best from December to February.' },
      { name: 'River Rafting',   desc: 'Grade III to IV rapids on the Beas and Spiti rivers. Best from July to September.' },
      { name: 'Mountain Biking', desc: 'Epic routes like Manali to Leh and the Spiti Circuit. Best from June to October.' },
      { name: 'Camping',         desc: 'Camp at Kasol, Chandratal Lake, or Prashar Lake under star-lit skies. Best from April to October.' }
    ],
    festivals: [
      { name: 'Kullu Dussehra', month: 'October',        desc: 'One of the most famous festivals in India, celebrated for 7 days at Dhalpur Maidan in Kullu with a grand procession of deities.' },
      { name: 'Losar',          month: 'February/March', desc: 'Tibetan New Year celebrated in Spiti, Lahaul, and Kinnaur with traditional dances and prayers.' },
      { name: 'Halda',          month: 'November',       desc: 'A festival of lights in Lahaul Valley, similar to Diwali, celebrated with bonfires and rituals.' },
      { name: 'Sazo',           month: 'June',           desc: 'Ancient festival of Kinnaur celebrating the sowing season with folk songs and community gatherings.' },
      { name: 'Minjar Fair',    month: 'July to August', desc: 'A week-long fair in Chamba celebrating the maize crop season with processions and music.' },
      { name: 'Shivratri Fair', month: 'February/March', desc: 'Grand week-long fair in Mandi with over 200 deities brought in procession — one of the largest religious fairs in Himachal.' }
    ],
    cuisine: [
      { name: 'Sidu',        desc: 'Wheat-based steamed bread stuffed with poppy seeds or walnuts — a staple of Himachali households.' },
      { name: 'Patande',     desc: 'Local version of pancakes made from wheat flour, popular in the Kullu region.' },
      { name: 'Kali Dal',    desc: 'Black lentils slow-cooked with local spices — a hearty and nutritious staple.' },
      { name: 'Momos',       desc: 'Tibetan-influenced steamed dumplings filled with vegetables or meat, found everywhere in Himachal.' },
      { name: 'Aloo Palda',  desc: 'Potatoes cooked in a yoghurt-based gravy with local spices — a comfort food classic.' },
      { name: 'Khatta',      desc: 'Tangy tamarind-based curry, often made with potatoes or bottle gourd.' }
    ],
    heritage: [
      { name: 'Naggar Castle',       desc: 'Built in 1460 AD using Himalayan and Western architectural styles, overlooking Kullu Valley.' },
      { name: 'Kangra Fort',         desc: 'Established by the Katoch dynasty, one of the oldest forts in the Himalayas, mentioned in the Mahabharata.' },
      { name: 'Hadimba Temple',      desc: 'Prehistoric cave temple in Manali cedar forest, built in 1553 AD, dedicated to Goddess Hadimba.' },
      { name: 'Key Monastery',       desc: 'Tibetan Buddhist monastery in Spiti at 4166 metres above sea level.' },
      { name: 'Namgyal Monastery',   desc: 'The Dalai Lama personal monastery in McLeod Ganj, Dharamshala.' },
      { name: 'Manikaran Gurudwara', desc: 'Sacred to Sikhs and Hindus, famous for natural hot springs near Kasol on the Parvati River.' }
    ]
  };

  // ── Intent matching ──────────────────────────────────────────────────────────
  function matchIntent(raw) {
    var t = raw.toLowerCase().trim();

    // --- Navigation: very broad matching so speech variants work ---
    if (/home/.test(t) && /go|open|take|navigate|visit/.test(t))              return { type: 'nav', page: '/', label: 'Home' };
    if (/destination/.test(t) && /go|open|take|navigate|visit|show/.test(t)) return { type: 'nav', page: '/destinations', label: 'Destinations' };
    if (/adventure/.test(t) && /go|open|take|navigate|visit|show/.test(t))   return { type: 'nav', page: '/adventure', label: 'Adventure' };
    if (/heritage/.test(t) && /go|open|take|navigate|visit|show/.test(t))    return { type: 'nav', page: '/heritage', label: 'Heritage' };
    if (/(cuisine|food)/.test(t) && /go|open|take|navigate|visit|show/.test(t)) return { type: 'nav', page: '/cuisine', label: 'Cuisine' };
    if (/festival/.test(t) && /go|open|take|navigate|visit|show/.test(t))    return { type: 'nav', page: '/festivals', label: 'Festivals' };
    if (/(book|booking|trip|reserve)/.test(t) && /go|open|take|navigate|visit|show|book|reserve/.test(t)) return { type: 'nav', page: '/booking', label: 'Book a Trip' };
    if (/contact/.test(t) && /go|open|take|navigate|visit|show/.test(t))     return { type: 'nav', page: '/contact', label: 'Contact' };
    if (/taxi|cab|transport|ride/.test(t) && /go|open|take|navigate|visit|show|find|book/.test(t)) return { type: 'nav', page: '/taxi', label: 'Taxi Directory' };
    if (/cost|estimate|price|budget|how much/.test(t))                        return { type: 'nav', page: '/booking', label: 'Cost Estimator' };
    if (/map|direction|navigate|gps|location/.test(t))                        return { type: 'nav', page: '/destinations', label: 'Destinations Map' };

    // --- Greetings ---
    if (/^(hi|hello|hey|namaste|good morning|good evening|good afternoon)/.test(t)) return { type: 'greet' };

    // --- Help ---
    if (/help|what can you|commands|options|what do you/.test(t)) return { type: 'help' };

    // --- Best time ---
    if (/best time|when.*visit|when.*go|when.*travel|which month/.test(t)) return { type: 'besttime' };

    // --- Weather ---
    if (/weather|temperature|climate|cold|hot|snow/.test(t)) return { type: 'weather' };

    // --- Specific item lookups (check before list queries) ---
    var i, item;

    for (i = 0; i < KB.destinations.length; i++) {
      item = KB.destinations[i];
      if (t.indexOf(item.name.toLowerCase()) !== -1) return { type: 'info', category: 'destination', item: item };
    }
    for (i = 0; i < KB.adventure.length; i++) {
      item = KB.adventure[i];
      if (t.indexOf(item.name.toLowerCase()) !== -1) return { type: 'info', category: 'adventure', item: item };
    }
    for (i = 0; i < KB.festivals.length; i++) {
      item = KB.festivals[i];
      // match on first word of festival name (e.g. "kullu", "losar", "halda")
      var firstWord = item.name.toLowerCase().split(' ')[0];
      if (t.indexOf(firstWord) !== -1) return { type: 'info', category: 'festival', item: item };
    }
    for (i = 0; i < KB.cuisine.length; i++) {
      item = KB.cuisine[i];
      if (t.indexOf(item.name.toLowerCase()) !== -1) return { type: 'info', category: 'cuisine', item: item };
    }
    for (i = 0; i < KB.heritage.length; i++) {
      item = KB.heritage[i];
      var firstHWord = item.name.toLowerCase().split(' ')[0];
      if (t.indexOf(firstHWord) !== -1) return { type: 'info', category: 'heritage', item: item };
    }

    // --- List queries ---
    if (/destination|place|city|town/.test(t) && /list|all|show|tell|what|which/.test(t)) return { type: 'list', category: 'destinations' };
    if (/adventure|activit|trek|sport/.test(t) && /list|all|show|tell|what|which/.test(t)) return { type: 'list', category: 'adventure' };
    if (/festival|celebrat|fair/.test(t) && /list|all|show|tell|what|which/.test(t))       return { type: 'list', category: 'festivals' };
    if (/(food|dish|cuisine|eat|meal)/.test(t) && /list|all|show|tell|what|which/.test(t)) return { type: 'list', category: 'cuisine' };
    if (/(heritage|temple|fort|monument|monastery)/.test(t) && /list|all|show|tell|what|which/.test(t)) return { type: 'list', category: 'heritage' };

    // --- Bare topic words (no verb needed) ---
    if (/^destinations?$/.test(t)) return { type: 'list', category: 'destinations' };
    if (/^adventure$/.test(t))     return { type: 'list', category: 'adventure' };
    if (/^festivals?$/.test(t))    return { type: 'list', category: 'festivals' };
    if (/^(cuisine|food)$/.test(t)) return { type: 'list', category: 'cuisine' };
    if (/^heritage$/.test(t))      return { type: 'list', category: 'heritage' };

    return { type: 'unknown' };
  }

  // ── Response generator ───────────────────────────────────────────────────────
  function generateResponse(intent) {
    if (intent.type === 'nav') {
      return {
        text: 'Sure! Taking you to the ' + intent.label + ' page now.',
        redirect: intent.page
      };
    }
    if (intent.type === 'info') {
      return { text: intent.item.name + ': ' + intent.item.desc };
    }
    if (intent.type === 'list') {
      var names = KB[intent.category].map(function (i) { return i.name; }).join(', ');
      return { text: 'Here are the ' + intent.category + ' in Himachal Pradesh: ' + names + '.' };
    }
    if (intent.type === 'besttime') {
      return { text: 'The best time to visit Himachal Pradesh is March to June for pleasant weather, and December to February for snow. Spiti Valley is best from June to October.' };
    }
    if (intent.type === 'weather') {
      return { text: 'Himachal Pradesh has a varied climate. Shimla and Manali are cool in summer at 15 to 25 degrees Celsius and snowy in winter. Spiti can drop to minus 20 degrees in winter. Always carry warm layers!' };
    }
    if (intent.type === 'greet') {
      return { text: 'Namaste! Welcome to Manali Escape. Ask me about destinations, adventure, festivals, cuisine, or heritage. You can also say things like go to adventure or tell me about Manali.' };
    }
    if (intent.type === 'help') {
      return { text: 'Try saying: Tell me about Manali. List all festivals. What adventure activities are there. Best time to visit. Go to destinations. Show me cuisine. Or just say a place name like Shimla or Kasol.' };
    }
    return { text: 'I did not catch that. Try saying a place name like Manali or Shimla, or say help to see what I can do.' };
  }

  // ── Speech synthesis ─────────────────────────────────────────────────────────
  function speak(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    var utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-IN';
    utter.rate = 0.92;
    utter.pitch = 1;
    // Wait for voices to load
    function doSpeak() {
      var voices = window.speechSynthesis.getVoices();
      var preferred = voices.find(function (v) { return v.lang === 'en-IN'; })
                   || voices.find(function (v) { return v.lang.startsWith('en'); });
      if (preferred) utter.voice = preferred;
      window.speechSynthesis.speak(utter);
    }
    if (window.speechSynthesis.getVoices().length) {
      doSpeak();
    } else {
      window.speechSynthesis.onvoiceschanged = doSpeak;
    }
  }

  // ── UI builder ───────────────────────────────────────────────────────────────
  function buildUI() {
    var style = document.createElement('style');
    style.textContent = [
      '#cb-fab{position:fixed;bottom:28px;right:28px;z-index:9999;width:58px;height:58px;border-radius:50%;',
      'background:linear-gradient(135deg,#e67e22,#f39c12);border:none;cursor:pointer;',
      'box-shadow:0 4px 20px rgba(230,126,34,.5);display:flex;align-items:center;justify-content:center;',
      'font-size:1.5rem;transition:transform .2s,box-shadow .2s;}',
      '#cb-fab:hover{transform:scale(1.1);}',
      '#cb-fab.listening{background:linear-gradient(135deg,#e74c3c,#c0392b);animation:cbpulse 1s infinite;}',
      '@keyframes cbpulse{0%,100%{box-shadow:0 4px 20px rgba(231,76,60,.5)}50%{box-shadow:0 4px 36px rgba(231,76,60,.9)}}',

      '#cb-box{position:fixed;bottom:100px;right:28px;z-index:9998;width:370px;background:#fff;',
      'border-radius:20px;box-shadow:0 8px 40px rgba(0,0,0,.18);display:none;flex-direction:column;',
      'overflow:hidden;font-family:Inter,sans-serif;}',
      '#cb-box.open{display:flex;animation:cbslide .25s ease;}',
      '@keyframes cbslide{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}',

      '#cb-header{background:linear-gradient(135deg,#0f2744,#1a3c5e);padding:14px 18px;',
      'display:flex;align-items:center;justify-content:space-between;}',
      '.cb-title{color:#fff;font-weight:600;font-size:.95rem;display:flex;align-items:center;gap:8px;}',
      '#cb-status{font-size:.7rem;color:rgba(255,255,255,.6);margin-top:3px;}',
      '#cb-close{background:none;border:none;color:rgba(255,255,255,.7);cursor:pointer;font-size:1.1rem;padding:4px;line-height:1;}',
      '#cb-close:hover{color:#fff;}',

      '#cb-messages{overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;',
      'max-height:300px;min-height:180px;background:#f8f9fa;}',
      '#cb-messages::-webkit-scrollbar{width:4px;}',
      '#cb-messages::-webkit-scrollbar-thumb{background:#ddd;border-radius:4px;}',

      '.cb-msg{max-width:86%;padding:10px 14px;border-radius:14px;font-size:.86rem;line-height:1.55;',
      'animation:cbfade .2s ease;}',
      '@keyframes cbfade{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}',
      '.cb-msg.bot{background:#fff;color:#2c3e50;border-radius:4px 14px 14px 14px;',
      'box-shadow:0 1px 4px rgba(0,0,0,.08);align-self:flex-start;}',
      '.cb-msg.user{background:linear-gradient(135deg,#e67e22,#f39c12);color:#fff;',
      'border-radius:14px 4px 14px 14px;align-self:flex-end;}',
      '.cb-name{font-size:.68rem;font-weight:700;color:#e67e22;margin-bottom:4px;}',

      '#cb-typing{display:none;align-self:flex-start;padding:10px 14px;background:#fff;',
      'border-radius:4px 14px 14px 14px;box-shadow:0 1px 4px rgba(0,0,0,.08);}',
      '#cb-typing span{display:inline-block;width:6px;height:6px;background:#bbb;border-radius:50%;',
      'margin:0 2px;animation:cbbounce .8s infinite;}',
      '#cb-typing span:nth-child(2){animation-delay:.15s;}',
      '#cb-typing span:nth-child(3){animation-delay:.3s;}',
      '@keyframes cbbounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}',

      '#cb-chips{padding:8px 12px;display:flex;gap:6px;flex-wrap:wrap;background:#fff;border-top:1px solid #f0f0f0;}',
      '.cb-chip{background:#f0f4ff;color:#0f2744;border:1px solid #dde4f5;padding:5px 11px;',
      'border-radius:20px;font-size:.74rem;cursor:pointer;transition:all .2s;white-space:nowrap;}',
      '.cb-chip:hover{background:#0f2744;color:#fff;border-color:#0f2744;}',

      '#cb-footer{padding:10px 12px;background:#fff;border-top:1px solid #f0f0f0;',
      'display:flex;gap:8px;align-items:center;}',
      '#cb-input{flex:1;border:1.5px solid #e5e7eb;border-radius:10px;padding:9px 12px;',
      'font-size:.88rem;font-family:inherit;outline:none;transition:border-color .2s;}',
      '#cb-input:focus{border-color:#e67e22;}',
      '#cb-send,#cb-mic{width:36px;height:36px;border-radius:10px;border:none;cursor:pointer;',
      'font-size:1rem;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .2s;}',
      '#cb-send{background:#e67e22;color:#fff;}#cb-send:hover{background:#cf6d17;}',
      '#cb-mic{background:#0f2744;color:#fff;}#cb-mic:hover{background:#1a3c5e;}',
      '#cb-mic.active{background:#e74c3c;animation:cbpulse 1s infinite;}'
    ].join('');
    document.head.appendChild(style);

    document.body.insertAdjacentHTML('beforeend',
      '<button id="cb-fab" title="Voice Assistant">🎙</button>' +
      '<div id="cb-box">' +
        '<div id="cb-header">' +
          '<div>' +
            '<div class="cb-title"><span>🏔</span> Himachal Assistant</div>' +
            '<div id="cb-status">Ask me anything — type or use your voice</div>' +
          '</div>' +
          '<button id="cb-close" aria-label="Close">✕</button>' +
        '</div>' +
        '<div id="cb-messages">' +
          '<div class="cb-msg bot"><div class="cb-name">Assistant</div>' +
          'Namaste! 🙏 Ask me about destinations, adventure, festivals, cuisine, or heritage. ' +
          'You can also say <em>go to adventure</em> or <em>tell me about Manali</em>.</div>' +
        '</div>' +
        '<div id="cb-typing"><span></span><span></span><span></span></div>' +
        '<div id="cb-chips">' +
          '<span class="cb-chip" data-q="tell me about Manali">Manali</span>' +
          '<span class="cb-chip" data-q="tell me about Shimla">Shimla</span>' +
          '<span class="cb-chip" data-q="list all festivals">Festivals</span>' +
          '<span class="cb-chip" data-q="what adventure activities are there">Adventure</span>' +
          '<span class="cb-chip" data-q="best time to visit">Best Time</span>' +
          '<span class="cb-chip" data-q="go to cuisine">Cuisine</span>' +
        '</div>' +
        '<div id="cb-footer">' +
          '<input id="cb-input" type="text" placeholder="Ask about Himachal..." autocomplete="off"/>' +
          '<button id="cb-mic" title="Hold to speak">🎙</button>' +
          '<button id="cb-send" title="Send">➤</button>' +
        '</div>' +
      '</div>'
    );
  }

  // ── Conversation history for Ollama context ───────────────────────────────────
  var chatHistory = [];

  // ── Call Ollama via backend ───────────────────────────────────────────────────
  function askOllama(message, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/chat', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.timeout = 30000;
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200) {
        try {
          var data = JSON.parse(xhr.responseText);
          callback(null, data.reply);
        } catch (e) {
          callback('parse error', null);
        }
      } else {
        callback('http ' + xhr.status, null);
      }
    };
    xhr.ontimeout = function () { callback('timeout', null); };
    xhr.onerror   = function () { callback('network error', null); };
    xhr.send(JSON.stringify({ message: message, history: chatHistory }));
  }

  // ── Core ─────────────────────────────────────────────────────────────────────
  var recognition = null;
  var isListening = false;

  function addMsg(text, role) {
    var msgs = document.getElementById('cb-messages');
    var div = document.createElement('div');
    div.className = 'cb-msg ' + role;
    if (role === 'bot') {
      div.innerHTML = '<div class="cb-name">Assistant</div>' + text;
    } else {
      div.textContent = text;
    }
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function showTyping(on) {
    var el = document.getElementById('cb-typing');
    el.style.display = on ? 'flex' : 'none';
    document.getElementById('cb-messages').scrollTop = 99999;
  }

  function setStatus(txt) {
    document.getElementById('cb-status').textContent = txt;
  }

  function processInput(text) {
    text = (text || '').trim();
    if (!text) return;
    document.getElementById('cb-input').value = '';
    addMsg(text, 'user');

    // Check navigation intent — redirect locally but still get Ollama to say something
    var intent = matchIntent(text);
    var isNav  = intent.type === 'nav';

    showTyping(true);
    setStatus('🤔 Thinking...');

    askOllama(text, function (err, reply) {
      showTyping(false);
      setStatus('Ask me anything — type or use your voice');

      var finalReply = reply;

      if (err || !reply) {
        // Ollama unavailable — fall back to local KB
        finalReply = generateResponse(intent).text;
      } else {
        chatHistory.push({ role: 'user', content: text });
        chatHistory.push({ role: 'assistant', content: reply });
        if (chatHistory.length > 12) chatHistory = chatHistory.slice(-12);
      }

      addMsg(finalReply, 'bot');
      speak(finalReply);

      if (isNav) {
        setStatus('Navigating...');
        setTimeout(function () { window.location.href = intent.page; }, 2000);
      }
    });
  }

  // ── Speech recognition ───────────────────────────────────────────────────────
  function initSpeech() {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      var micBtn = document.getElementById('cb-mic');
      micBtn.title = 'Speech recognition not supported in this browser. Use Chrome.';
      micBtn.style.opacity = '0.4';
      micBtn.style.cursor = 'not-allowed';
      return;
    }
    recognition = new SR();
    recognition.lang = 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = function () {
      isListening = true;
      document.getElementById('cb-mic').classList.add('active');
      document.getElementById('cb-fab').classList.add('listening');
      document.getElementById('cb-input').placeholder = '🎙 Listening...';
      setStatus('🔴 Listening — speak now');
    };

    recognition.onresult = function (e) {
      var transcript = '';
      for (var i = 0; i < e.results.length; i++) {
        transcript += e.results[i][0].transcript;
      }
      document.getElementById('cb-input').value = transcript;
      if (e.results[e.results.length - 1].isFinal) {
        stopListening();
        processInput(transcript);
      }
    };

    recognition.onerror = function (e) {
      var msg = e.error === 'not-allowed'
        ? 'Mic access denied. Please allow microphone in browser settings.'
        : 'Mic error: ' + e.error;
      setStatus(msg);
      stopListening();
    };

    recognition.onend = function () {
      stopListening();
    };
  }

  function stopListening() {
    isListening = false;
    var mic = document.getElementById('cb-mic');
    var fab = document.getElementById('cb-fab');
    if (mic) mic.classList.remove('active');
    if (fab) fab.classList.remove('listening');
    var inp = document.getElementById('cb-input');
    if (inp) inp.placeholder = 'Ask about Himachal...';
    setStatus('Ask me anything — type or use your voice');
  }

  function toggleMic() {
    if (!recognition) {
      addMsg('Speech recognition is not supported in this browser. Please use Chrome or Edge.', 'bot');
      return;
    }
    if (isListening) {
      recognition.stop();
    } else {
      try {
        recognition.start();
      } catch (err) {
        // already started — ignore
      }
    }
  }

  // ── Init ─────────────────────────────────────────────────────────────────────
  function init() {
    buildUI();
    initSpeech();

    // FAB toggle
    document.getElementById('cb-fab').addEventListener('click', function () {
      var box = document.getElementById('cb-box');
      var isOpen = box.classList.toggle('open');
      if (isOpen) document.getElementById('cb-input').focus();
    });

    // Close button
    document.getElementById('cb-close').addEventListener('click', function () {
      document.getElementById('cb-box').classList.remove('open');
      if (recognition && isListening) recognition.stop();
    });

    // Send button
    document.getElementById('cb-send').addEventListener('click', function () {
      processInput(document.getElementById('cb-input').value);
    });

    // Enter key
    document.getElementById('cb-input').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') processInput(this.value);
    });

    // Mic button
    document.getElementById('cb-mic').addEventListener('click', function () {
      document.getElementById('cb-box').classList.add('open');
      toggleMic();
    });

    // Quick-reply chips
    document.getElementById('cb-chips').addEventListener('click', function (e) {
      var chip = e.target.closest('.cb-chip');
      if (chip) processInput(chip.getAttribute('data-q'));
    });
  }

  return { init: init, send: processInput };

}());

// Auto-init when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () { ChatBot.init(); });
} else {
  ChatBot.init();
}
