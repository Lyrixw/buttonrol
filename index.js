const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const fs = require("fs");
const config = require("./config.json");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ],
  partials: [Partials.Channel]
});

client.commands = new Collection();

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once("ready", async () => {
  console.log(`${client.user.tag} aktif`);
  const channel = client.channels.cache.get(config.voiceChannel);
  if (channel && channel.joinable) channel.join?.();
});

client.on("messageCreate", async (message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName);
  if (!command) return;
  try {
    await command.run(client, message, args);
  } catch (err) {
    console.log(err);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;
  if (interaction.customId === "kayit_button") {
    const role = interaction.guild.roles.cache.get(config.kayıtRol);
    if (!role) return interaction.reply({ content: "Rol bulunamadı!", ephemeral: true });
    await interaction.member.roles.add(role).catch(() => {});
    interaction.reply({ content: "Kayıt işlemin tamamlandı ✅", ephemeral: true });
  }
});

client.on("guildMemberAdd", (member) => {
  const kanal = member.guild.channels.cache.get(config.logKanal);
  if (kanal) kanal.send(`📥 **${member.user.tag}** sunucuya katıldı.`);
});

client.on("guildMemberRemove", (member) => {
  const kanal = member.guild.channels.cache.get(config.logKanal);
  if (kanal) kanal.send(`📤 **${member.user.tag}** sunucudan ayrıldı.`);
});

client.login(config.token);
