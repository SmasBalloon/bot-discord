const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("bingo")
        .setDescription("jouer aux bingo")
        .addIntegerOption(option =>
            option.setName("nbmax")
                .setDescription("le bombre maximum")
                .setRequired(true)
        ),

    async execute(interaction) {
        const max = interaction.options.getInteger("nbmax")
        const random = Math.floor(Math.random() * max) + 1
        console.log(random)
        const filter = response => response.content == random && response.author.id === interaction.user.id;
        const collector = interaction.channel.createMessageCollector({ filter, time: 60000 });

        await interaction.reply(`le nombre aléatoire est compris entre 1 et ${max}`)
        

        collector.on('collect', async collected => {
            await interaction.followUp(`Bingo! le chiffre est ${random}`);
            collector.stop();
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
            interaction.followUp('Temps écoulé! Personne n\'a trouvé le bon chiffre. le chiffre était ' + random);
            }
        });

    }
}