const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("membres du serveur a kick")
        .addUserOption(option =>
            option.setName("membre")
                .setDescription("Le membre à kick")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("raison")
                .setDescription("La raison du kick")
                .setRequired(false)
        ),

    async execute(interaction) {
        const membre = interaction.options.getMember("membre")
        const raison = interaction.options.getString("raison")
        
        if (!membre){
            return interaction.reply("Le membre spécifié est introuvable.");
        }

        if (!membre.kickable){
            return interaction.reply("Je ne peux pas kick ce membre.");
        }

        try {
            await membre.kick({ reason: raison || 'Aucune raison fournie' })
            await interaction.reply(membre.user.tag + 'a été kick pour' + raison)
        }catch(error){
            console.error(error);
            await interaction.reply("Une erreur s'est produite lors du kick du membre.");
        }
    }
}
