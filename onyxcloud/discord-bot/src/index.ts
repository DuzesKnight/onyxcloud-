import { Client, GatewayIntentBits } from 'discord.js';
import express from 'express';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const channelId = process.env.DISCORD_CHANNEL_ID || '';
const app = express();
app.use(express.json());

app.post('/log', async (req, res) => {
  const event = { event: req.body.event, timestamp: new Date().toISOString(), data: req.body.data };
  if (client.isReady() && channelId) {
    const channel = await client.channels.fetch(channelId);
    if (channel?.isTextBased()) await channel.send('```json\n' + JSON.stringify(event, null, 2) + '\n```');
  }
  console.log(JSON.stringify(event));
  res.json({ ok: true });
});

client.login(process.env.DISCORD_BOT_TOKEN).catch(() => console.warn('Discord login failed'));
app.listen(4030, () => console.log('discord logger :4030'));
