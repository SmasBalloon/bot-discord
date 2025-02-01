const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("demute")
        .setDescription("membres du serveur a demute")
        .addUserOption(option =>
            option.setName("membre")
                .setDescription("Le membre à demute")
                .setRequired(true)
        ),

    async execute(interaction) {
        const member = interaction.options.getMember("membre")
        const botMember = interaction.guild.members.cache.get(interaction.client.user.id)

        if (!botMember.permissions.has("MANAGE_ROLES")) {
            return interaction.reply("Je n'ai pas la permission de demute des membres.");
        }
        
        if (!member.bannable) {
            return interaction.reply("Je ne peux pas demute ce membre.");
        }

        if (!member) {
            return interaction.reply("Le membre spécifié est introuvable.");
        }

        try {
            await member.disableCommunicationUntil(null);
            await interaction.reply(`${member.user.tag} a été demute.`);
        } catch (error) {
            console.error(error);
            await interaction.reply("Une erreur s'est produite lors du mute du membre.");
        }
    }
}         