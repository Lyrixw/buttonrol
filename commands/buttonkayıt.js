const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const config = require("../config.json");

module.exports = {
  name: "buttonkayıt",
  async run(client, message, args) {
    if (!message.member.permissions.has("Administrator")) return;

    const embed = new EmbedBuilder()
      .setAuthor({ name: "Lyrix", iconURL: message.guild.iconURL({ dynamic: true }) })
      .setDescription(
        `👋 **Merhaba!** **17 5 8 #Reborn** sunucusuna hoş geldin!\n\n` +
        `Sunucumuza katılmak için aşağıdaki **butona** tıklayarak kayıt olabilirsin.\n\n` +
        `📘 **Bilgi**\nKayıt olduktan sonra sunucudaki tüm kanallara erişim sağlayabileceksin.\n\n` +
        `🖤 **Kurallar**\nKayıt olmadan önce sunucu kurallarını okuduğundan emin ol!`
      )
      .setImage("https://cdn.discordapp.com/attachments/1384224309265961023/1424616152721522818/HPo2jklmR9SXvYwa7AKavA.png?ex=68e498ae&is=68e3472e&hm=51992145ee39461a32521e4648d082e5ea849cb81c37ad9b41ac6e2a27de94dc&") // buraya kendi banner linkini koy
      .setColor("#2F3136")
      .setFooter({ text: "Lyrix", iconURL: message.guild.iconURL({ dynamic: true }) });

    const button = new ButtonBuilder()
      .setCustomId("kayit_button")
      .setLabel("TIKLA ROLUNU AL ASKM")
      .setEmoji("✅")
      .setStyle(ButtonStyle.Success);

    const row = new ActionRowBuilder().addComponents(button);

    const channel = client.channels.cache.get(config.kayıtChannel);
    if (!channel) return message.reply("Kayıt kanalı bulunamadı!");
    channel.send({ embeds: [embed], components: [row] });
  }
};
