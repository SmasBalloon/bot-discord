const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("shifoumi")
        .setDescription("jouer à pierre papier ciseau")
        .addUserOption(option =>
            option.setName("membre1")
                .setDescription("le premier joueur")
                .setRequired(true)
        )
        .addUserOption(option =>
            option.setName("membre2")
                .setDescription("le second joueur")
                .setRequired(true)
        ),

    async execute(interaction) {
        const membre1 = interaction.option.getMember("joueur1")
        const membre2 = interaction.option.getMember("joueur2")

        const choix = ["pierre", "papier", "ciseaux"]
        
        
    }
}