const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("devinnette")
        .setDescription("jouer aux devinnettes")
        .addIntegerOption(option =>
            option.setName("nbmax")
                .setDescription("le nombre maximum")
                .setRequired(true)
        )
        .addUserOption(option =>
            option.setName("membre")
                .setDescription("le joueur qui va jouer")
                .setRequired(true)
        ),

    async execute(interaction) {
        const membre = interaction.options.getMember("membre")
        const max = interaction.options.getInteger("nbmax")
        const random = Math.floor(Math.random() * max) + 1
        console.log(random)
        const filter = response => response.content == random && response.author.id === interaction.user.id;
        const collector = interaction.channel.createMessageCollector({ filter, time: 60000 });

        await interaction.reply(`le nombre aléatoire est compris entre 1 et ${max}`)
        
        while (collected.constent !== random) {
            if (collected.content == random) {
                await interaction.followUp(`Bingo! le chiffre est ${random}`);
                break
                } else if (collected.content > random) {
                await interaction.followUp(`Le chiffre est plus petit que ${collected.content}`);
                } else {
                await interaction.followUp(`Le chiffre est plus grand que ${collected.content}`);
                }
        }
        collector.on('collect', async collected => {
            if (collected.content == random) {
            await interaction.followUp(`Bingo! le chiffre est ${random}`);
            collector.stop();
            } else if (collected.content > random) {
            await interaction.followUp(`Le chiffre est plus petit que ${collected.content}`);
            } else {
            await interaction.followUp(`Le chiffre est plus grand que ${collected.content}`);
            }
        });
        
        collector.on('end', collected => {
            if (collected.size === 0) {
                interaction.followUp('Temps écoulé! Personne n\'a trouvé le bon chiffre. le chiffre était ' + random);
            }
        });

    }
}