const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data : new SlashCommandBuilder()
        .setName("addrole")
        .setDescription("ajouter un role a un membre")
        .addUserOption(option =>
            option.setName("membre")
                .setDescription("Le membre à qui ajouter le role")
                .setRequired(true)
        )
        .addRoleOption(option =>
            option.setName("role")
                .setDescription("Le role à ajouter")
                .setRequired(true)
        ),

    async execute(interaction){
        const membres = interaction.options.getMember("membre")
        const role = interaction.options.getRole("role")

        if (!membres){
            return interaction.reply("Le membre spécifié est introuvable.")
        }

        if (!role){
            return interaction.reply("Le role spécifié est introuvable.")
        }

        if (!interaction.member.permissions.has("MANAGE_ROLES")){
            return interaction.reply("Vous n'avez pas la permission de gérer les roles.")
        }

        try{
            await membres.roles.add(role)
            await interaction.reply(`le role ${role.name} a bien été ajouter a ${membres.user.tag}`)
        }catch(error){
            console.error(error)
            await interaction.reply("Une erreur s'est produite lors de l'ajout du role.")
        }
    }
}