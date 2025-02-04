const { SlashCommandBuilder } = require("discord.js");
const sqlite3 = require("sqlite3");
const database = new sqlite3.Database('./bdd/warn.sqlite');

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
                return interaction.reply({ content: "Le membre spécifié est introuvable.", flags: 64 });
            }

            if (!raison) {
                return interaction.reply({ content: "Veuillez spécifier une raison.", flags: 64 });
            }

            await interaction.deferReply();

            try {
                database.run(`
                    create table if not exists warns (
                        user_id text primary key,
                        reason text
                    )`)

                database.run(`insert into warns (user_id, reason) values (?, ?)`, [member.id, raison])
                await interaction.editReply(`le warn de ${member.tag} a bien été enregistré pour la raison suivante : ${raison}`);
                database.get(`select count(*) as count from warns where user_id = ?`, [member.id], async (err, row) => {
                    if (err) {
                        console.error(err);
                        return interaction.editReply("une erreur s'est produite lors de la vérification des warns.");
                    }

                    if (row.count >= 3) {
                        await interaction.guild.members.ban(member.id, { reason: "3 warns" });
                        await interaction.editReply(`${member.tag} a été banni pour avoir reçu 3 warns.`);
                    } else {
                        await interaction.editReply(`${member.tag} a maintenant ${row.count} warns.`);
                    }
                });
            } catch (error) {
                console.error(error);
                await interaction.editReply("une erreur s'est produite lors du warn du membre.");
            }
        }
    }