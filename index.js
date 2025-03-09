// Load environment variables from the .env file
require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');

// Create a simple Express server to keep Vercel from shutting down
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot is running!');
});

app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`);
});

// Log the token to check if it's loaded correctly
console.log("Bot Token: ", process.env.DISCORD_BOT_TOKEN);  // <-- Add this line to check the token

// Create a new Discord client with the necessary intents
const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,            // For guild events
        GatewayIntentBits.GuildMembers,      // For member-related events
        GatewayIntentBits.GuildMessages,     // For message events
        GatewayIntentBits.MessageContent     // To read message content
    ]
});

// Login to your bot using the token from the environment variable
bot.login(process.env.DISCORD_BOT_TOKEN)
    .then(() => {
        console.log('Bot logged in successfully!');
    })
    .catch(error => {
        console.error('Error during bot login:', error);
    });

// Set the bot's username and avatar when it logs in
bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.user.setUsername("Markbot Interactive V.2");  // Set bot's name
    bot.user.setAvatar("https://i.ibb.co/Vchbt04x/Markbot-pfp.jpg");  // Set bot's avatar

    // Set custom status to "Just chilling"
    bot.user.setPresence({
        activities: [{ name: 'Just chilling', type: 'PLAYING' }],
        status: 'online',
    });
});

// Catch any errors and print them to the console
bot.on('error', (error) => {
    console.error('Bot encountered an error:', error);
});
bot.on('warn', (warn) => {
    console.warn('Bot warning:', warn);
});
bot.on('debug', (debugInfo) => {
    console.log('Bot debug info:', debugInfo);
});

// Welcome message when a user joins the server
bot.on('guildMemberAdd', member => {
    console.log(`New member joined: ${member.user.tag}`);
    const channel = member.guild.channels.cache.get('999951446160187415'); // Welcome channel ID
    if (!channel) {
        console.error('Channel not found!');
        return;
    }

    // Send the welcome message
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

    // Send the goodbye message
    channel.send(`I can announce that ${member.user.tag} has left the server, what a pity :(`);
});