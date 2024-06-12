const Discord = require("discord.js")
const { exec } = require('child_process');
const package = require("./package.json");

async function checkUpdate() {

    function getPackageVersion() {

        return new Promise((resolve, reject) => {
            exec(`npm view discord.paginator version`, (error, stdout, stderr) => {
                if (error) return { error };
                if (stderr) return { error: stderr };
                resolve({ version: stdout.trim(), error: false });
            });
        });
        
    }

    const version = await getPackageVersion()

    if(version.error) return;

    if(version.version) {
        if(version.version !== package.version) {
            console.log(`\x1b[34mDiscord.Paginator is out of date!\x1b[0m Remember to use \x1b[32m"npm update discord.paginator" ( ${package.version} -> ${version.version} )\x1b[0m in powershell to take advantage of the new features.`)
        } else return;
    } else return;

}

class Paginator {

    constructor() {
        this.strings = []
        this.embedColor = null
        this.timestamp = null
        this.collectorTime = 900000
        this.buttons = {
            firstPage: {label: false, emoji: "⏮", style: Discord.ButtonStyle.Secondary }, 
            previous: {label: false, emoji: "◀", style: Discord.ButtonStyle.Secondary }, 
            next: {label: false, emoji: "▶", style: Discord.ButtonStyle.Secondary}, 
            lastPage: {label: false, emoji: "⏭", style: Discord.ButtonStyle.Secondary}
        }
    }

    addStrings(strings = {author, title, url, description, fields, image, footer}) {
        this.strings = strings
        return this;
    }

    setEmbedColor(color) {
        this.embedColor = color
        return this;
    }

    setCollectorTime(time) {
        this.collectorTime = time
        return this;
    }

    setTimestamp() {
        this.timestamp = true
        return this;
    }
    
    setButtons(data = {
        firstPage: { label, emoji, style }, 
        previous: { label, emoji, style }, 
        next: { label, emoji, style }, 
        lastPage: { label, emoji, style }
    }) {
        if(data.firstPage) this.buttons.firstPage = {
            label: data.firstPage.label ? data.firstPage.label : false,
            emoji: data.firstPage.emoji ? data.firstPage.emoji : "⏮",
            style: data.firstPage.style ? data.firstPage.style : Discord.ButtonStyle.Secondary,
        };
        if(data.previous) this.buttons.previous = {
            label: data.previous.label ? data.previous.label : false,
            emoji: data.previous.emoji ? data.previous.emoji : "◀",
            style: data.previous.style ? data.previous.style : Discord.ButtonStyle.Secondary,
        };;
        if(data.next) this.buttons.next = {
            label: data.next.label ? data.next.label : false,
            emoji: data.next.emoji ? data.next.emoji : "▶",
            style: data.next.style ? data.next.style : Discord.ButtonStyle.Secondary,
        };;
        if(data.lastPage) this.buttons.lastPage = {
            label: data.lastPage.label ? data.lastPage.label : false,
            emoji: data.lastPage.emoji ? data.lastPage.emoji : "⏭",
            style: data.lastPage.style ? data.lastPage.style : Discord.ButtonStyle.Secondary,
        };;
        return this;
    }

    async create(interaction, type) {

        const chunkArray = (array, size) => {
    
            const chunkedArr = [];
    
            for (let i = 0; i < array.length; i += size) {
    
                chunkedArr.push(array.slice(i, i + size));
    
            }
            
            return chunkedArr;
    
        }
    
        const createEmbed = async(data = {author, title, url, description, fields, image, footer, color}) => {
    
            const embed = new Discord.EmbedBuilder()
    
            if(data.author) embed.setAuthor(data.author);
            if(data.title) embed.setTitle(data.title);
            if(data.url) embed.setURL(data.url);
            if(data.description) embed.setDescription(data.description);
            if(data.fields) embed.setFields(data.fields);
            if(data.image) embed.setImage(data.image);
            if(data.footer) embed.setFooter(data.footer);
            if(data.color) embed.setColor(data.color);
    
            return embed;
    
        }
        
        let page = 0
    
        const chunked = chunkArray(this.strings, 1);
        let totalPages = chunked.length
    
        const firstPageButton = new Discord.ButtonBuilder()
        .setStyle(this.buttons.firstPage.style)
        .setCustomId("paginator_firstPage")
        .setEmoji(this.buttons.firstPage.emoji)
        if(this.buttons.firstPage.label) firstPageButton.setLabel(this.buttons.firstPage.label)
    
        const previousButton = new Discord.ButtonBuilder()
        .setStyle(this.buttons.previous.style || Discord.ButtonStyle.Secondary)
        .setCustomId("paginator_previousPage")
        .setEmoji(this.buttons.previous.emoji)
        if(this.buttons.previous.label) previousButton.setLabel(this.buttons.previous.label)
    
        const nextButton = new Discord.ButtonBuilder()
        .setStyle(this.buttons.next.style || Discord.ButtonStyle.Secondary)
        .setCustomId("paginator_nextPage")
        .setEmoji(this.buttons.next.emoji)
        if(this.buttons.next.label) nextButton.setLabel(this.buttons.next.label)
    
        const lastPageButton = new Discord.ButtonBuilder()
        .setStyle(this.buttons.lastPage.style || Discord.ButtonStyle.Secondary)
        .setCustomId("paginator_lastPage")
        .setEmoji(this.buttons.lastPage.emoji)
        if(this.buttons.lastPage.label) lastPageButton.setLabel(this.buttons.lastPage.label)
    
        const row = new Discord.ActionRowBuilder()
        .addComponents(firstPageButton, previousButton, nextButton, lastPageButton)
    
        if(totalPages == 1) {
            row.components.map(a => a.setDisabled(true))
        } else if(totalPages == 2) {
            row.components[0].setDisabled(true)
            row.components[1].setDisabled(true)
            row.components[3].setDisabled(true)
        } else {
            row.components[0].setDisabled(true)
            row.components[1].setDisabled(true)
        }
    
        if(chunked[page][0].footer) {
            chunked[page][0].footer.text = chunked[page][0].footer.text.replace("{currentPage}", `${page + 1}`).replace("{totalPage}", `${totalPages}`)
        }
    
        let message;
        let user;

        let firstMessageContent = {
            embeds: [
                await createEmbed({
                    author: chunked[page][0].author || false,
                    title: chunked[page][0].title || false,
                    url: chunked[page][0].url || false,
                    description: chunked[page][0].description || false,
                    fields: chunked[page][0].fields || false,
                    image: chunked[page][0].image || false,
                    footer: chunked[page][0].footer || {text: `Page ${page + 1}/${totalPages}`},
                    color: this.embedColor || false,
                    timestamp: this.timestamp || false
                })
            ],
            components: [row]
        }

        if(type == "interactionReply") {

            message = await interaction.reply(firstMessageContent)
            user = interaction.user
            
        } else if(type == "interactionEditReply") {

            message = await interaction.editReply(firstMessageContent)
            user = interaction.user
            
        } else if(type == "interactionFollowUp") {

            message = await interaction.followUp(firstMessageContent)
            user = interaction.user
            
        } if(type == "interactionChannelSend") {

            message = await interaction.channel.send(firstMessageContent)
            user = interaction.user
            
        } if(type == "messageReply") {
    
            message = await interaction.reply(firstMessageContent)
            user = interaction.author
    
        } else if(type == "messageChannelSend") {

            message = await interaction.channel.send(firstMessageContent)
            user = interaction.author

        }
    
        const filter = (interact) => interact.user.id === user.id;
        const collectorr = message.createMessageComponentCollector({ filter, time: this.collectorTime });
                    
        collectorr.on("collect", async(ii) => {
    
            if(ii.customId == "paginator_firstPage") {
                await ii.deferUpdate()
                page = 0;
            } else if(ii.customId == "paginator_previousPage") {
                await ii.deferUpdate()
                page = (page - 1 + chunked.length) % chunked.length;
            } else if(ii.customId == "paginator_nextPage") {
                await ii.deferUpdate()
                page = (page + 1) % chunked.length;
            } else if(ii.customId == "paginator_lastPage") {
                await ii.deferUpdate()
                page = totalPages - 1;
            }
    
            if(chunked[page][0].footer) {
                chunked[page][0].footer.text = chunked[page][0].footer.text.replace("{currentPage}", `${page + 1}`).replace("{totalPage}", `${totalPages}`)
            }
    
            if(totalPages == 2) {
                if((page + 1) == 1) {
                    row.components.map(a => a.setDisabled(true))
                    row.components[2].setDisabled(false)
                } else if((page + 1) == 2) {
                    row.components.map(a => a.setDisabled(true))
                    row.components[1].setDisabled(false)
                }
            } else {
                if((page + 1) == 1) {
                    row.components.map(a => a.setDisabled(false))
                    row.components[0].setDisabled(true)
                    row.components[1].setDisabled(true)
                } else if((page + 1) == totalPages) {
                    row.components.map(a => a.setDisabled(false))
                    row.components[2].setDisabled(true)
                    row.components[3].setDisabled(true)
                } else {
                    row.components.map(a => a.setDisabled(false))
                }
            }
    
            message.edit({
                embeds: [
                    await createEmbed({
                        author: chunked[page][0].author || false,
                        title: chunked[page][0].title || false,
                        url: chunked[page][0].url,
                        description: chunked[page][0].description || false,
                        fields: chunked[page][0].fields || false,
                        image: chunked[page][0].image || false,
                        footer: chunked[page][0].footer || {text: `Page ${page + 1}/${totalPages}`},
                        color: this.embedColor || false,
                        timestamp: this.timestamp || false
                    })
                ],
                components: [row]
            })
    
        })
    
    }
    
}

Paginator.Type = {
    InteractionReply: "interactionReply",
    InteractionEditReply: "interactionEditReply",
    InteractionFollowUp: "interactionFollowUp",
    InteractionChannelSend: "interactionChannelSend",
    MessageReply: "messageReply",
    MessageChannelSend: "messageChannelSend"
}

module.exports = {
    checkUpdate,
    Paginator
}