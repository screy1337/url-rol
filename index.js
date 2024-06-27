const {  Client, GatewayIntentBits, Partials, ActivityType } = require('discord.js');
const cfg = require("./settings/config");

const client = new Client({
  intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.GuildPresences,GatewayIntentBits.GuildMessageReactions,GatewayIntentBits.DirectMessages,GatewayIntentBits.MessageContent,GatewayIntentBits.AutoModerationConfiguration,GatewayIntentBits.AutoModerationExecution,GatewayIntentBits.DirectMessageReactions,GatewayIntentBits.DirectMessageTyping,GatewayIntentBits.GuildEmojisAndStickers,GatewayIntentBits.GuildIntegrations,GatewayIntentBits.GuildInvites,GatewayIntentBits.GuildMembers,GatewayIntentBits.GuildMessageTyping,GatewayIntentBits.GuildModeration,GatewayIntentBits.GuildScheduledEvents,GatewayIntentBits.GuildVoiceStates,GatewayIntentBits.GuildWebhooks,],
  partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction , Partials.GuildMember , Partials.GuildScheduledEvent , Partials.ThreadMember]
});




client.on('ready', () => {
  console.log(`${client.user.tag} - screy#1337`);
  client.user.setStatus("idle");
  setInterval(() => {
  const oyun = Math.floor(Math.random() * (cfg.STATUS.length));
  client.user.setActivity({name: `${cfg.STATUS[oyun]}`, type: ActivityType.Playing});
}, 10000);
});



client.on('presenceUpdate', (oldPresence, newPresence) => {
  const guild = client.guilds.cache.get(cfg.GUILD_ID);
  const role = guild.roles.cache.get(cfg.ROLE_ID);
  if (!role) {
    console.error('Rol yok.');
    return;
  }
  const member = guild.members.cache.get(newPresence.userId);
 if (!member) {
    return;
 }
  if (newPresence.activities[0]?.state?.includes(cfg.EXPECTED_STATUS)) {
      member.roles.add(role)
        .catch(error => console.error('Rol verme hatası:', error));
    } else {
    if (member.roles.cache.has(role.id)) {
      member.roles.remove(role)
        .catch(error => console.error('Rol alma hatası:', error));
    }
  }
});

client.login(cfg.TOKEN);
