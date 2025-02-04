const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rename")
        .setDescription("Renommer les membres du serveur")
        .addUserOption(option =>
            option.setName("membre")
                .setDescription("Le membre à renommer")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("nouveau_nom")
                .setDescription("Le nouveau nom du membre")
                .setRequired(false)
        ),

    async execute(interaction) {
        const member = interaction.options.getMember("membre")
        const botMember = interaction.guild.members.cache.get(interaction.client.user.id)

        if (!botMember.permissions.has("MANAGE_NICKNAMES")) {
            return interaction.reply("Je n'ai pas la permission de changer les surnoms.");
        }
        const newName = interaction.options.getString("nouveau_nom");

        if (!member) {
            return interaction.reply("Le membre spécifié est introuvable.");
        }
        try {
            if (!newName) {
                await member.setNickname(null);
                return await interaction.reply(`Le nom de ${member.user.username} a été réinitialisé.`);
            }
            await member.setNickname(newName);
            await interaction.reply(`Le nom de ${member.user.username} a été changé en ${newName}`);
        } catch (error) {
            console.error(error);
            await interaction.reply("Une erreur s'est produite lors du changement de nom.");
        }
    }
}