const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mute")
        .setDescription("membres du serveur a mute")
        .addUserOption(option =>
            option.setName("membre")
                .setDescription("Le membre à mute")
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName("temp")
                .setDescription("le temp de ban (minutes)")
                .setRequired(true)
        ),

    async execute(interaction) {
        const member = interaction.options.getMember("membre");
        const botMember = interaction.guild.members.cache.get(interaction.client.user.id);
        const temp = interaction.options.getInteger("temp");

        if (!botMember.permissions.has("BAN_MEMBERS")) {
            return interaction.reply("Je n'ai pas la permission de mute des membres.");
        }
        
        if (!member.bannable) {
            return interaction.reply("Je ne peux pas mute ce membre.");
        }

        if (!member) {
            return interaction.reply("Le membre spécifié est introuvable.");
        }

        try {
            await member.disableCommunicationUntil(Date.now() + (temp * 60 * 1000), 'They deserved it');
            await interaction.reply(`${member.user.tag} a été mute pour ${temp} minutes.`);
        } catch (error) {
            console.error(error);
            await interaction.reply("Une erreur s'est produite lors du mute du membre.");
        }
        }
    }
