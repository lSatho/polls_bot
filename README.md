# 🗳️ Discord Polls Bot

Bot de Discord para crear encuestas nativas usando el sistema de polls de Discord.

## Características

- Crea encuestas con el comando `!poll Pregunta | opción1; opción2; opción3`
- Soporte para hasta 10 opciones
- Emojis keycap automáticos (1️⃣, 2️⃣, etc.)
- Soporte para emojis personalizados del servidor
- Duración de 24 horas por encuesta

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/polls_bot.git
   cd polls_bot
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Copia el archivo de ejemplo de variables de entorno y complétalo con tus datos:
   ```bash
   cp .env.example .env
   ```

4. Edita `.env` con tu token y los IDs de tu bot:
   ```
   TOKEN=tu_token_aqui
   APPLICATION_ID=tu_application_id_aqui
   GUILD_ID=tu_guild_id_aqui
   ```

5. Registra los slash commands (una sola vez):
   ```bash
   node deploy-commands.js
   ```

6. Inicia el bot:
   ```bash
   node index.js
   ```

## Uso

Escribe en cualquier canal donde esté el bot:

```
!poll ¿Cuál es tu lenguaje favorito? | JavaScript; Python; Rust; Go
```

## Requisitos

- Node.js 16.9.0 o superior
- Un bot de Discord con los intents `Guilds`, `GuildMessages`, `MessageContent` y `GuildMessagePolls` habilitados

## Licencia

ISC
