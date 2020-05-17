require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (msg) => {
  if (msg.author.bot) {
    return;
  }

  if (msg.content.startsWith('!hello')) {
    msg.reply('world!');
  }

  if (msg.content.startsWith('!dm')) {
    let messageContent = msg.content.replace('!dm', '');
    msg.member.send(messageContent);
  }

  if (msg.content.startsWith('!args')) {
    const args = msg.content.split(' ');
    let messageContent = '';
    if (args.includes('foo')) {
      messageContent += 'bar ';
    }
    if (args.includes('bar')) {
      messageContent += 'baz ';
    }
    if (args.includes('baz')) {
      messageContent += 'foo ';
    }
    msg.reply(messageContent);
  }

  if (msg.content.startsWith('!collector')) {
    // Filters define what kinds of messages should be collected
    let filter = (msg) => !msg.author.bot;
    // Options define how long the collector should remain open
    //    or the max number of messages it will collect
    let options = {
      max: 2,
      time: 15000
    };
    let collector = msg.channel.createMessageCollector(filter, options);

    // The 'collect' event will fire whenever the collector receives input
    collector.on('collect', (m) => {
      console.log(`Collected ${m.content}`);
    });

    // The 'end' event will fire when the collector is finished.
    collector.on('end', (collected) => {
      console.log(`Collected ${collected.size} items`);
    });

    msg.reply('What is your favorite color?');
  }

  if (msg.content.startsWith('!gimme')) {
    // Split the arguments
    const args = msg.content.split(' ');

    // Check the first argument (skipping the command itself)
    if (args[1] === 'smiley') {
      if (args.length < 3) {
        // Filter out any bot messages
        let filter = (msg) => !msg.author.bot;
        // Set our options to expect 1 message, and timeout after 15 seconds
        let options = {
          max: 1,
          time: 15000
        };
        let collector = msg.channel.createMessageCollector(filter, options);

        collector.on('end', (collected, reason) => {
          // If the collector ends for 'time', display a message to the user
          if (reason === 'time') {
            msg.reply('Ran out of time ☹...');
          } else {
            // Convert the collection to an array and check the content of the message.
            //   Repsond accordingly 
            switch (collected.array()[0].content) {
              case 'happy':
                msg.reply('😀');
                break;
              case 'sad':
                msg.reply('😢');
                break;
              default:
                msg.reply('I dont know that smiley...');
                break;
            }
          }
        });

        msg.reply('What kind of smiley do you like? (happy or sad)');
      } else {
        // If all arguments are already there, respond with the requested item
        switch (args[2]) {
          case 'happy':
            msg.reply('😀');
            break;
          case 'sad':
            msg.reply('😢');
            break;
          default:
            msg.reply('I dont know that smiley...');
            break;
        }
      }
    }

    if (args[1] === 'circle') {
      if (args.length < 3) {
        let filter = (msg) => !msg.author.bot;
        let options = {
          max: 1,
          time: 15000
        };
        let collector = msg.channel.createMessageCollector(filter, options);

        collector.on('end', (collected, reason) => {
          if (reason === 'time') {
            msg.reply('Ran out of time ☹...');
          } else {
            switch (collected.array()[0].content) {
              case 'red':
                msg.reply('🔴');
                break;
              case 'blue':
                msg.reply('🔵');
                break;
              default:
                msg.reply('I dont know that color...');
                break;
            }
          }
        });

        msg.reply('What color circle would you like? (blue or red)');
      } else {
        switch (args[2]) {
          case 'red':
            msg.reply('🔴');
            break;
          case 'blue':
            msg.reply('🔵');
            break;
          default:
            msg.reply('I dont know that color...');
            break;
        }
      }
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);