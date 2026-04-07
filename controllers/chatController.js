const http = require('http');

const SYSTEM_PROMPT = `You are a friendly and knowledgeable travel assistant for "Manali Escape", a tourism website for Himachal Pradesh, India.
You help tourists with information about destinations (Manali, Shimla, Spiti Valley, Dharamshala, Kasol, Bir Billing), 
adventure activities (trekking, paragliding, skiing, river rafting), festivals (Kullu Dussehra, Losar, Minjar Fair),
local cuisine (Sidu, Momos, Kali Dal), and heritage sites (Hadimba Temple, Kangra Fort, Key Monastery).
Keep responses warm, concise (2-4 sentences), and conversational. Use occasional emojis. 
If asked about navigation, mention the relevant page on the website.`;

const chat = async (req, res) => {
  const { message, history = [] } = req.body;
  if (!message) return res.status(400).json({ error: 'No message provided' });

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history.slice(-6), // keep last 6 turns for context
    { role: 'user', content: message }
  ];

  const payload = JSON.stringify({
    model: 'tinyllama',
    messages,
    stream: false
  });

  const options = {
    hostname: '127.0.0.1',
    port: 11434,
    path: '/api/chat',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) }
  };

  const ollamaReq = http.request(options, (ollamaRes) => {
    let data = '';
    ollamaRes.on('data', chunk => { data += chunk; });
    ollamaRes.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        const reply = parsed.message && parsed.message.content
          ? parsed.message.content.trim()
          : 'Sorry, I could not generate a response right now.';
        res.json({ reply });
      } catch (e) {
        res.status(500).json({ error: 'Failed to parse Ollama response' });
      }
    });
  });

  ollamaReq.on('error', (e) => {
    console.error('Ollama connection error:', e.message);
    res.status(503).json({ error: 'AI service unavailable', fallback: true });
  });

  ollamaReq.write(payload);
  ollamaReq.end();
};

module.exports = { chat };
