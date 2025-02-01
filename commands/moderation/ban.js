const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("membres du serveur a banir")
        .addUserOption(option =>
            option.setName("membre")
                .setDescription("Le membre à banir")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("raison")
                .setDescription("La raison du banissement")
                .setRequired(false)
        ),

    async execute(interaction) {
        const member = interaction.options.getMember("membre");
        const botMember = interaction.guild.members.cache.get(interaction.client.user.id);

        if (!botMember.permissions.has("BAN_MEMBERS")) {
            return interaction.reply("Je n'ai pas la permission de bannir des membres.");
        }
        
        if (!member.bannable) {
            return interaction.reply("Je ne peux pas bannir ce membre.");
        }

        if (!member) {
            return interaction.reply("Le membre spécifié est introuvable.");
        }

        try {
            await member.ban({ deleteMessageSeconds: 60 * 60 * 24 * 7, reason: interaction.options.getString("raison") || 'Aucune raison fournie' })
            .then(() => interaction.reply(`${member.user.tag} a été banni avec succès.`))
            .catch(error => {
                console.error(error);
                interaction.reply("Une erreur s'est produite lors du bannissement du membre.");
            });
        } catch (error) {
            console.error(error);
            await interaction.reply("Une erreur s'est produite lors du bannissement du membre.");
        }
    }
}