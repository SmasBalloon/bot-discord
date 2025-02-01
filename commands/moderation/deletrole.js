const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("deleterole")
        .setDescription("supprimer un role")
        .addUserOption(option =>
            option.setName("membre")
                .setDescription("membre a qui supprimer le role")
                .setRequired(true)
        )
        .addRoleOption(option =>
            option.setName("role")
                .setDescription("Le role à supprimer du joueur")
                .setRequired(true)
        ),
    async execute(interaction) {
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
            await membres.roles.remove(role)
            await interaction.reply(`le role ${role.name} a bien été supprimer a ${membres.user.tag}`)
        }catch(error){
            console.error(error)
            await interaction.reply("Une erreur s'est produite lors de la suppression du role.")
        }
    }
}