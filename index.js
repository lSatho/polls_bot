const { Client, GatewayIntentBits, PollLayoutType } = require('discord.js');

const TOKEN = process.env.TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessagePolls,
  ],
});

client.once('ready', () => {
  console.log(`✅ Bot listo: ${client.user.tag}`);
});

// (A) Keycaps Unicode (1️⃣…🔟) — se verán a la izquierda de cada opción
const keycaps = ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟'];

// (B) Emojis personalizados 
const custom = [ /* '123456789012345678', '...', ... hasta 10 */ ];

// Elige el emoji para la i-ésima respuesta:
const pickEmoji = (i) => {
  const id = custom[i];
  if (id) return { id };              // emoji custom del servidor (apunta al “azul” que subas)
  return { name: keycaps[i] };        // emoji Unicode
};

client.on('messageCreate', async (message) => {

  if (message.author.id !== client.user.id) return;
  if (!message.content.startsWith('!poll')) return;

  const payload = message.content.slice(5).trim();
  const parts = payload.split('|');
  const pregunta = parts[0]?.trim();
  const opciones = parts[1]
    ? parts[1].split(';').map(s => s.trim()).filter(Boolean)
    : [];

  if (!pregunta || opciones.length < 2) {
    return message.channel.send('❌ Usa: `!poll Pregunta | opcion1, opcion2` (mínimo 2 opciones)');
  }
  if (opciones.length > 10) {
    return message.channel.send('❌ Máximo 10 opciones por encuesta.');
  }


  const respuestas = opciones.map((opt, i) => ({
    text: opt,
    emoji: pickEmoji(i),
  }));

  try {
    await message.delete().catch(() => {});
    await message.channel.send({
      poll: {
        question: { text: pregunta },
        answers: respuestas,
        allowMultiselect: false,
        duration: 24,
        layoutType: PollLayoutType.Default,
      },
    });
  } catch (err) {
    console.error('❌ Error creando la encuesta:', err);
    await message.channel.send('❌ Ocurrió un error al crear la encuesta.');
  }
});

client.login(TOKEN);
