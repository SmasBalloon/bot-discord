const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joinvoc') // Nom de la commande
        .setDescription('Je rejoins le salon vocal spécifié.') // Description de la commande
        .addChannelOption(option =>
            option.setName('channel') // Option pour spécifier le salon vocal
                .setDescription('Le salon vocal à rejoindre')
                .setRequired(true)), // L'option est obligatoire

    async execute(interaction) {
        // Récupère le salon vocal spécifié par l'utilisateur
        const voiceChannel = interaction.options.getChannel('channel');

        // Vérifie si le salon est bien un salon vocal
        if (!voiceChannel.isVoiceBased()) {
            return interaction.reply({ content: 'Le salon spécifié n\'est pas un salon vocal.', ephemeral: true });
        }

        // Vérifie si le bot a la permission de rejoindre le salon vocal
        if (!voiceChannel.joinable) {
            return interaction.reply({ content: 'Je n\'ai pas la permission de rejoindre ce salon vocal.', ephemeral: true });
        }

        try {
            // Rejoindre le salon vocal
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id, // ID du salon vocal
                guildId: interaction.guildId, // ID du serveur
                adapterCreator: interaction.guild.voiceAdapterCreator, // Adaptateur pour la connexion vocale
            });

            // Répondre à l'utilisateur
            await interaction.reply({ content: `J'ai rejoint le salon vocal : ${voiceChannel.name}`, ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Je n\'ai pas pu rejoindre le salon vocal.', ephemeral: true });
        }
    },
}