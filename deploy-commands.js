const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const TOKEN = process.env.TOKEN;
const APPLICATION_ID = process.env.APPLICATION_ID;
const GUILD_ID = process.env.GUILD_ID;

const commands = [
  new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Crea una encuesta')
    .addStringOption(option =>
      option.setName('pregunta')
        .setDescription('Pregunta de la encuesta')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('opciones')
        .setDescription('Opciones separadas por coma (máx. 10)')
        .setRequired(true))
    .toJSON(),
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('⏳ Registrando comandos...');
    await rest.put(
      Routes.applicationGuildCommands(APPLICATION_ID, GUILD_ID),
      { body: commands },
    );
    console.log('✅ Comandos registrados con éxito.');
  } catch (error) {
    console.error(error);
  }
})();
