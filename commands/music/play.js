const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const play = require('play-dl'); // Module pour récupérer l’audio

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Joue un son depuis Spotify ou YouTube')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('Lien Spotify ou YouTube')
                .setRequired(true)),

    async execute(interaction) {
        const url = interaction.options.getString('url');

        // Vérifier si l'URL est valide
        if (play.is_expired && play.is_expired()) await play.refreshToken();
        const isSpotify = play.sp_validate(url) === 'track';

        try {
            const voiceChannel = interaction.member.voice.channel;
            if (!voiceChannel) return interaction.reply({ content: 'Tu dois être dans un salon vocal !', flags: 64 });

            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: interaction.guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });

            let stream;
            if (isSpotify) {
                const trackInfo = await play.spotify(url);
                const search = await play.search(`${trackInfo.name} ${trackInfo.artists[0].name}`, { limit: 1 });
                stream = await play.stream(search[0].url); // Convertir Spotify en stream YouTube
            } else {
                stream = await play.stream(url);
            }

            const resource = createAudioResource(stream.stream, { inputType: stream.type });
            const player = createAudioPlayer();
            player.play(resource);
            connection.subscribe(player);

            player.on(AudioPlayerStatus.Playing, () => {
                console.log('Le bot joue de l\'audio !');
            });

            player.on('error', error => {
                console.error(`Erreur lors de la lecture de l'audio : ${error.message}`);
            });

            await interaction.reply({ content: `🎵 Lecture de : ${url}`, flags: 64 });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Erreur lors de la lecture.', flags: 64 });
        }
    },
};
