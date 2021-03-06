// Required dependencies
const { Client, Intents } = require('discord.js');
const dotenv = require('dotenv');
const axios = require('axios');

// Load environment variables
dotenv.config();

// Create a bot instance
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// on startup
bot.on('ready', async () => {
    console.log(`${bot.user.username} is online`);

    bot.user.setActivity(`STONKS`, { type: "PLAYING" });
});

bot.on('messageCreate', async (message) => {
    let msg = message.content.toLowerCase();    // lower case of the message
    //let sender = message.author;

    // ignore self messages
    if (message.author.bot) return;

    // Reply to !ping
    if (message.content == '!ping') {
        const { data } = await axios.get(
            `https://api.coingecko.com/api/v3/ping`
        );
        message.channel.send(data.gecko_says);
    }

    // help command
    if (message.content == '!help') {
        const helpEmbed = {
            color: 2123412,
            title: 'List of commands',
            fields: [{
                name: "!ping",
                value: "Check server status"
            },{
                name: "!search <crypto>",
                value: "See data on a specific crypto by searching its name or symbol"
            },{
                name: "!ranklist",
                value: "See the top 25 market ranking"
            },{
                name: "!rank <#>",
                value: "See data on a specific rank within top 100"
            },{
                name: "!gas",
                value: "See gas prices from etherscan"
            }]
        }
        message.channel.send({ embeds: [helpEmbed] });
    }

    // list top 25 crypto
    if (message.content == '!ranklist') {
        try {
            const { data } = await axios.get(
                // 100 search results
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=false`
            );
            // Check if data exists
            if (!data) throw Error();

            const argsEmbed = {
                color: 2123412,
                title: "Top 25 market crypto",
                fields: [{
                    name: "Rank 1: " + data[0].name,
                    value: "$" + data[0].current_price.toString()
                },{
                    name: "Rank 2: " + data[1].name,
                    value: "$" + data[1].current_price.toString()
                },{
                    name: "Rank 3: " + data[2].name,
                    value: "$" + data[2].current_price.toString()
                },{
                    name: "Rank 4: " + data[3].name,
                    value: "$" + data[3].current_price.toString()
                },{
                    name: "Rank 5: " + data[4].name,
                    value: "$" + data[4].current_price.toString()
                },{
                    name: "Rank 6: " + data[5].name,
                    value: "$" + data[5].current_price.toString()
                },{
                    name: "Rank 7: " + data[6].name,
                    value: "$" + data[6].current_price.toString()
                },{
                    name: "Rank 8: " + data[7].name,
                    value: "$" + data[7].current_price.toString()
                },{
                    name: "Rank 9: " + data[8].name,
                    value: "$" + data[8].current_price.toString()
                },{
                    name: "Rank 10: " + data[9].name,
                    value: "$" + data[9].current_price.toString()
                },{
                    name: "Rank 11: " + data[10].name,
                    value: "$" + data[10].current_price.toString()
                },{
                    name: "Rank 12: " + data[11].name,
                    value: "$" + data[11].current_price.toString()
                },{
                    name: "Rank 13: " + data[12].name,
                    value: "$" + data[12].current_price.toString()
                },{
                    name: "Rank 14: " + data[13].name,
                    value: "$" + data[13].current_price.toString()
                },{
                    name: "Rank 15: " + data[14].name,
                    value: "$" + data[14].current_price.toString()
                },{
                    name: "Rank 16: " + data[15].name,
                    value: "$" + data[15].current_price.toString()
                },{
                    name: "Rank 17: " + data[16].name,
                    value: "$" + data[16].current_price.toString()
                },{
                    name: "Rank 18: " + data[17].name,
                    value: "$" + data[17].current_price.toString()
                },{
                    name: "Rank 19: " + data[18].name,
                    value: "$" + data[18].current_price.toString()
                },{
                    name: "Rank 20: " + data[19].name,
                    value: "$" + data[19].current_price.toString()
                },{
                    name: "Rank 21: " + data[20].name,
                    value: "$" + data[20].current_price.toString()
                },{
                    name: "Rank 22: " + data[21].name,
                    value: "$" + data[21].current_price.toString()
                },{
                    name: "Rank 23: " + data[22].name,
                    value: "$" + data[22].current_price.toString()
                },{
                    name: "Rank 24: " + data[23].name,
                    value: "$" + data[23].current_price.toString()
                },{
                    name: "Rank 25: " + data[24].name,
                    value: "$" + data[24].current_price.toString()
                }]
            }

            message.channel.send({ embeds: [argsEmbed] });

        } catch (err) {
            message.channel.send("Something went wrong at ranklist function");
        }
    }

    // search by name or symbol (top 100)
    if (msg.startsWith('!search')) {
        const target = message.content.slice(8)
        try {
            const { data } = await axios.get(
                // 100 search results
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
            );
            // Check if data exists
            if (!data) throw Error();

            for (var i = 0; i < data.length; i++) {
                if (data[i].id == target.toLowerCase() || data[i].symbol == target.toLowerCase()) {
                    const symbolEmbed = {
                        color: 2123412,
                        title: data[i].name + " (" + data[i].symbol.toUpperCase() + ")",
                        description: "Rank #" + data[i].market_cap_rank,
                        thumbnail: {
                            url: data[i].image
                        },
                        fields: [{
                            name: "Current",
                            value: "$" + data[i].current_price.toString()
                        },{
                            name: "All time high",
                            value: "$" + data[i].ath.toString()
                        }]
                    }
        
                    message.channel.send({ embeds: [symbolEmbed] });
                    return;
                }
            }

        } catch (err) {
            message.channel.send("I couldn't find anything on " + target);
        }
    }

    // search by rank
    if (msg.startsWith('!rank ')) {
        const args = message.content.slice(6).split(" ");
        const target = args.shift();
        if (isNaN(target) || (target % 1 != 0) || args.length > 0) {
            message.channel.send("Enter a valid number");
        }
        try {
            const { data } = await axios.get(
                // 100 search results
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
            );
            // Check if data exists
            if (!data) throw Error();

            for (var i = 0; i < data.length; i++) {
                if (data[i].market_cap_rank == target){
                    const rankEmbed = {
                        color: 2123412,
                        title: data[i].name + " (" + data[i].symbol.toUpperCase() + ")",
                        description: "Rank #" + data[i].market_cap_rank,
                        thumbnail: {
                            url: data[i].image
                        },
                        fields: [{
                            name: "Current",
                            value: "$" + data[i].current_price.toString()
                        },{
                            name: "All time high",
                            value: "$" + data[i].ath.toString()
                        }]
                    }

                    message.channel.send({ embeds: [rankEmbed] });
                    return;
                }
            }

        } catch (err) {
            message.channel.send("Something went wrong at rank function");
        }
    }

    // Track eth gas
    if (message.content == '!gas') {
        const { data } = await axios.get(
            `http://ethgas.watch/api/gas`
        );

        const gasEmbed = {
            color: 2123412,
            title: "Ethereum gas prices",
            description: "From " + data.sources[0].source.toString(),
            fields: [{
                name: "Slow",
                value: data.slow.gwei + " gwei $" + data.slow.usd 
            },{
                name: "Normal",
                value: data.normal.gwei + " gwei $" + data.normal.usd 
            },{
                name: "Fast",
                value: data.fast.gwei + " gwei $" + data.fast.usd 
            },{
                name: "Instant",
                value: data.instant.gwei + " gwei $" + data.instant.usd 
            }]
        }

        message.channel.send({ embeds: [gasEmbed] });
    }

    // calculator

});

// Log our bot in
bot.login(process.env.DISCORD_BOT_TOKEN);