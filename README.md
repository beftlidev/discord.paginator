# 📖 Discord.Paginator - Paginated Embed Module
You create a paginated embed.
# 🔧 Installation
- You can download `discord.paginator` in powershell with this code.
```js
npm install discord.paginator
```
- For Discord.Paginator to work, you need to use the discord.js module above @14.
```sheel
npm upgrade discord.js
```
# 🧱 Basic Usage
Below are examples for you to create a paginated embed. You cannot make customizations other than the customizations mentioned below. And if you want to do version control automatically, we have extra code.
## <img src="https://cdn.discordapp.com/emojis/1217435722789683241.png" alt="Update logo" width="17"/> Check Update
- Code: 
```js
const { checkUpdate } = require("discord.paginator")

client.on("ready", async() => {

    await checkUpdate()
    
})
```
- Result if the module is out of date (Automatically logs to the console.):
```shell
Discord.Paginator is out of date! Remember to use "npm update discord.paginator" ( Old Version -> New Version ) in powershell to take advantage of the new features.
```
## <img src="https://cdn.discordapp.com/emojis/1203381492508659773.png" alt="Use logo" width="17"/> Example Interaction Usage
- Code:
```js
const { Paginator } = require("discord.paginator")
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("paginated-embed")
    .setDescription("Generates paginated embed!"),
    run: async (client, interaction) => {

        await interaction.deferReply()

        const paginator = new Paginator()
        .addStrings([
            {author: { name: "Paginated Embed!" }, description: "This is the 1st test message."}, 
            {author: { name: "Paginated Embed!" }, description: "This is the 2nd test message."}, 
            {author: { name: "Paginated Embed!" }, description: "This is the 3rd test message."}
        ])
        .setButtons({
            firstPage: { label: "Go First Page" }, 
            previous: { label: "Previous", style: Discord.ButtonStyle.Success }, 
            next: { label: "Next", style: Discord.ButtonStyle.Success }, 
            lastPage: { label: "Go Last Page" }
        })
        .setEmbedColor("Blurple")
        .setTimestamp()

        await paginator.create(interaction, Paginator.Type.InteractionEditReply)
        // Paginator.Type.InteractionReply | Paginator.Type.InteractionEditReply | Paginator.Type.InteractionFollowUp | Paginator.Type.InteractionChannelSend

} 
}
```
## <img src="https://cdn.discordapp.com/emojis/1203381492508659773.png" alt="Use logo" width="17"/> Example Message Usage
- Code:
```js
const { Paginator } = require("discord.paginator")

client.on("messageCreate", async(message) => {

    if(message.content == "paginator") {

        const paginator = new Paginator()
        .addStrings([
            {author: { name: "Paginated Embed!" }, description: "This is the 1st test message."}, 
            {author: { name: "Paginated Embed!" }, description: "This is the 2nd test message."}, 
            {author: { name: "Paginated Embed!" }, description: "This is the 3rd test message."}
        ])
        .setButtons({
            firstPage: { label: "Go First Page" }, 
            previous: { label: "Previous", style: Discord.ButtonStyle.Success }, 
            next: { label: "Next", style: Discord.ButtonStyle.Success }, 
            lastPage: { label: "Go Last Page" }
        })
        .setEmbedColor("Blurple")
        .setTimestamp()

        await paginator.create(message, Paginator.Type.MessageChannelSend)
        // Paginator.Type.Reply | Paginator.Type.MessageChannelSend

    }

})
```
## <img src="https://cdn.discordapp.com/emojis/1203381492508659773.png" alt="Kick logo" width="17"/> All Customizability
- Code:
```js
const { Paginator } = require("discord.paginator")

client.on("messageCreate", async(message) => {

    if(message.content == "paginator") {

        const paginator = new Paginator()
        .addStrings([
            { author: { name: "Paginated Embed!", iconURL: `https://cdn.discordapp.com/emojis/1249062572758663419.png` }, description: "This is the 1st test message.", footer: { text: "Hi", iconURL: "https://r.resimlink.com/MHq9U.png" } }, 
            { author: { name: "Paginated Embed!" }, title: "Hi!", url: "https://discord.gg/TCWbk7zWY5", description: "This is the 2nd test message.", image: "https://r.resimlink.com/MHq9U.png" }, 
            { author: { name: "Paginated Embed!", url: "https://discord.gg/TCWbk7zWY5" }, description: "This is the 3rd test message.", fields: [ { name: "Test Field", value: "Hi!", inline: true } ] }
        ])
        // All options in one: ([ { author: { name: string, iconURL: string }, title: string, url: string, description, fields: [ { name: string, value: string, inline: boolean } ], image: string, footer: { text: string, iconURL: string } }, {...}, {...} ])
        // You can use {currentPage} or {totalPage} in the footer section.
        .setButtons({
            firstPage: { label: "Go First Page", emoji: "1216013763933896804", style: Discord.ButtonStyle.Danger }, 
            previous: { label: "Previous", emoji: "1216013763933896804", style: Discord.ButtonStyle.Primary }, 
            next: { label: "Next", emoji: "1216013763933896804", style: Discord.ButtonStyle.Secondary }, 
            lastPage: { label: "Go Last Page", emoji: "1216013763933896804", style: Discord.ButtonStyle.Success }
        })
        .setEmbedColor("Blurple")
        // What you can use in the setColor section when creating Discord embed is also valid here.
        .setTimestamp()
        // Delete it or leave it, you don't need to put anything in ().

        await paginator.create(message, Paginator.Type.MessageChannelSend)
        // Remember to set Paginator.Type according to Interaction or Message.

    }

})
```
# ✨ Support
You can come to our [Discord server](https://discord.gg/TCWbk7zWY5) and get help and support on [#npm-support](https://discord.com/channels/1196503995661942965/1249767884159455355) channel. Or if you send a friend to my [discord account](https://discord.com/users/389071682649849868), I will return as soon as possible.

<p align="center"><a href="https://discord.gg/TCWbk7zWY5"><img src="https://api.weblutions.com/discord/invite/TCWbk7zWY5/"></a></p>
<p align="center"><a href="https://discord.com/users/389071682649849868"><img src="https://lanyard-profile-readme.vercel.app/api/389071682649849868"></a></p>

# 📜 License
This project is licensed under the **MIT License** - see the [LICENSE](https://github.com/beftlidev/discord.paginator/blob/main/LICENSE) file for details.
