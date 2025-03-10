// Load environment variables from the .env file

const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const express = require('express');

// Create a simple Express server to prevent shutdown
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot is running!');
});

app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`);
});

// Check if the token is loaded correctly
if (!process.env.DISCORD_BOT_TOKEN) {
    console.error("Error: DISCORD_BOT_TOKEN is not set in the environment variables!");
    process.exit(1); // Exit the bot if no token is provided
}

// Create a new Discord client with the necessary intents
const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMembers, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ]
});

// Login to the bot using the token from the environment variables
bot.login(process.env.DISCORD_BOT_TOKEN)
    .then(() => console.log('Bot logged in successfully!'))
    .catch(error => console.error('Error during bot login:', error));

// Bot ready event
bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);

    // Set bot properties
    bot.user.setUsername("Markbot Interactive V.2");
    bot.user.setAvatar("https://i.ibb.co/Vchbt04x/Markbot-pfp.jpg");

    // Set custom status
    bot.user.setPresence({
        activities: [{ name: 'Just chilling', type: ActivityType.Playing }],
        status: 'online',
    });
});

// Welcome message when a user joins the server
bot.on('guildMemberAdd', member => {
    console.log(`New member joined: ${member.user.tag}`);
    const channel = member.guild.channels.cache.get('999951446160187415'); // Welcome channel ID
    if (!channel) {
        console.error('Channel not found!');
        return;
    }

    // Send welcome message
    channel.send(`${member.user.tag} welcome to ${member.guild.name}! 

If you're going to participate, then please choose your team from <#999961475911262238>. Once you do so, please post your characters in either <#999961816430039150> or <#999961864651935764>, according to the <#1000398951679283310>.

For a good start, why not introduce yourself in <#999962354332741682>? You can even put Toyhou.se or Artfight.com links in there if you're an artist!

**Check out <#999962679101882468> for the most recent Artfight game updates!**

January 11th 2025 Update: Our active members number is higher than ever!

Remember to be patient with the other server members because attacks don't happen immediately - they do happen though!

**NOTICE: PLEASE be patient with us :')... Thank you!**

As always, enjoy your stay and have fun, ${member.user.username}!`);
});

// Goodbye message when a user leaves the server
bot.on('guildMemberRemove', member => {
    console.log(`Member left: ${member.user.tag}`);
    const channel = member.guild.channels.cache.get('999951446160187415'); // Goodbye channel ID
    if (!channel) {
        console.error('Channel not found!');
        return;
    }

    // Send goodbye message
    channel.send(`I can announce that ${member.user.tag} has left the server, what a pity :(`);
});

// Error handling
bot.on('error', error => console.error('Bot encountered an error:', error));
bot.on('warn', warn => console.warn('Bot warning:', warn));
bot.on('debug', debugInfo => console.log('Bot debug info:', debugInfo));