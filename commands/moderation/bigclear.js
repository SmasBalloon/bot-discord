const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName("bigclear")
        .setDescription('supprimer tout les messages du salon')
        .addChannelOption(option =>
            option.setName("channel")
                .setDescription("Le salon à nettoyer")
                .setRequired(true)
        ),

    async execute(interaction){
        const channel = interaction.options.getChannel("channel")

        if (!channel){
            return interaction.reply("Le salon spécifié est introuvable.")
        }
        
        try{
            await channel.clone()
            await channel.delete()
        } catch(error){
            console.error(error)
            await interaction.reply("Une erreur s'est produite lors de la suppression des messages.")
        }
    }
}