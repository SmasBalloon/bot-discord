const { SlashCommandBuilder } = require("discord.js")
const sqlite3 = require("sqlite3").verbose();
const database = new sqlite3.Database('./bdd/warn.sqlite')

module.exports = {
    data : new SlashCommandBuilder()
        .setName("warn")
        .setDescription("Warn un membre")
        .addUserOption(option =>
            option.setName("membre")
                .setDescription("Le membre à warn")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("raison")
                .setDescription("La raison du warn")
                .setRequired(true)
            ),
        async execute(interaction) {
            const member = interaction.options.getUser("membre");
            const raison = interaction.options.getString("raison")
            
            if (!member) {
                return interaction.reply("Le membre spécifié est introuvable.");
            }

            if (!raison) {
                return interaction.reply("Veuillez spécifier une raison.");
            }

            try {
                database.run(`
                    create table if not exists warns (
                        user_id text primary key,
                        reason text
                    )`)

                database.run(`insert into warns (user_id, reason) values (?, ?)`, [member.id, raison])
                await interaction.reply(`le warn de ${member.tag} a bien été enregistré pour la raison suivante : ${raison}`);
            } catch (error) {
                console.error(error);
                await interaction.reply("une erreur s'est produite lors du warn du membre.");
            }
        } 
    }