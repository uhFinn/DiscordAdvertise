const Discord = require("discord.js");
const client = new Discord.Client;
const bot = new Discord.Client({disableEveryone: true});
const http = require('http');
const express = require('express');
const app = express();
const fs = require('fs');
const ms = require('ms');
let data = require('./data.json')
let list = require('./list.json')
let tokens = require("./tokens.json")
let boosts = require("./boosts.json")

client.on("ready", async () => {
  console.log("New Instance")

client.on("guildDelete", guild => {
    console.log("Left a guild: " + guild.name);
    if(data[`${guild.id}`]){
      data[`${guild.id}`].active = false
      fs.writeFile("./data.json", JSON.stringify(data), (err) => {
        if(err) console.log(err)
      });
    }
})

setInterval(Loopi, 3600000);
function Loopi( )
 {
let listersi = list["list"].main 
var i;
  for (i = 0; i < listersi.length; i++) {
  let guild = listersi[i]
  let guildid = data[`${guild}`].guildid
  let channelid = data[`${guild}`].channelid
  let active = data[`${guild}`].active
  //random one
  let length = listersi.length -1
  let random = Math.round(Math.random() * length)
  console.log(random)
  let randomguild = listersi[random]
  console.log(randomguild)
  let randomcheck = data[`${randomguild}`].active
  if(randomcheck == false){
   random = Math.round(Math.random() * listersi)
   randomguild = listersi[random]
  }
  //random done

  if(active == true){
    if(data[`${randomguild}`].color == "" && data[`${randomguild}`].thumbnail != ""){
    let emb = new Discord.RichEmbed()
    .setTitle(data[`${randomguild}`].title)
    .addField("--------------------", `${data[`${randomguild}`].field}\n\n${data[`${randomguild}`].invite}`)
    client.guilds.get(`${guildid}`).channels.get(`${channelid}`).send(emb)
    } else if(data[`${randomguild}`].color != "" && data[`${randomguild}`].thumbnail == ""){
      let emb = new Discord.RichEmbed()
      .setTitle(data[`${randomguild}`].title)
      .addField("--------------------", `${data[`${randomguild}`].field}\n\n${data[`${randomguild}`].invite}`)
      .setColor(`${data[`${randomguild}`].color}`)
      client.guilds.get(`${guildid}`).channels.get(`${channelid}`).send(emb)
    } else if(data[`${randomguild}`].color == "" && data[`${randomguild}`].thumbnail != ""){
      let emb = new Discord.RichEmbed()
      .setTitle(data[`${randomguild}`].title)
      .addField("--------------------", `${data[`${randomguild}`].field}\n\n${data[`${randomguild}`].invite}`)
      .setThumbnail(`${data[`${randomguild}`].thumbnail}`)
      client.guilds.get(`${guildid}`).channels.get(`${channelid}`).send(emb)
    } else if(data[`${randomguild}`].color != "" && data[`${randomguild}`].thumbnail != ""){
      let emb = new Discord.RichEmbed()
      .setTitle(data[`${randomguild}`].title)
      .addField("--------------------", `${data[`${randomguild}`].field}\n\n${data[`${randomguild}`].invite}`)
      .setColor(`${data[`${randomguild}`].color}`)
      .setThumbnail(`${data[`${randomguild}`].thumbnail}`)
      client.guilds.get(`${guildid}`).channels.get(`${channelid}`).send(emb)
    }
  }
}
 }

})





client.on('message', async message => {

       if(!tokens[message.author.id]){
          tokens[message.author.id] = {
            amount: 0
          };
        }
        fs.writeFile("./tokens.json", JSON.stringify(tokens), (err) => {
          if(err) console.log(err)
        });

        if(!boosts[message.guild.id]){
          boosts[message.guild.id] = {
            active: false,
            timeboosted: "",
            timeexpires: "",
            history: [],
            totalboosts: 0
          };
        }
        fs.writeFile("./boosts.json", JSON.stringify(boosts), (err) => {
          if(err) console.log(err)
        });
  
  
  
  let prefix = "="
  const users = client.users.size
  const servers = client.guilds.size
  if(message.author.bot) return;
 if(message.content.indexOf("=") !== 0) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
 

if(command === "setup"){

if(data[`${message.guild.id}`]){
  if(data[`${message.guild.id}`].active == false){
    message.channel.send("Your Server Is Already Set Up, To reset your server please type +restart")
    return
  }
  message.channel.send("This server is already set up, to edit it type +edit or to reset it type +restart")
  return
}
let listers = list["list"].main
let title = ""
let field = ""
let invlink = ""

let invite = await message.channel.createInvite({
  maxAge: 0, // 0 = infinite expiration
  maxUses: 0 // 0 = infinite uses
}).catch(console.error);

invlink = `${invite}`
let idd
message.channel.send("Welcome to Discord Advertise Bot setup!\nTo get started please specify the name of the discord server you wish to advertise")
  let filter = m => m.author.id === message.author.id
  message.channel.awaitMessages(filter, {
  max: 1,
  time: 30000
  }).then(collected => {
   message.channel.send(`Perfect! You chose the name: **${collected.first().content}**\n\nNow choose the main field for the advert, This can be up to 500 charachters long!`)
   title = collected.first().content
   let filter2 = m => m.author.id === message.author.id
   message.channel.awaitMessages(filter, {
   max: 1,
   time: 300000
   }).then(collected2 => {
    field = collected2.first().content
    message.channel.send(`Great! Its all set up, type **confirm** If you wish for me to register this to the database and set up the advertisement channels in this server\nAlternately type **cancel** to cancel this entire process`)
    let filter3 = m => m.author.id === message.author.id
    message.channel.awaitMessages(filter, {
    max: 1,
    time: 30000
    }).then(collected3 => {
     if(collected3.first().content == "confirm"){
     (async () => {
     let mm = await message.channel.send("**Stage 1/2** : Uploading Now! 0% Completed")
     setTimeout(function(){
      let completed1 = Math.round(Math.random() * 20 + 5)
      mm.edit(`**Stage 1/2** : Uploading Now! ${completed1}% Completed`)
      setTimeout(function(){
        let completed2 = Math.round(Math.random() * 45 + 20)
        mm.edit(`**Stage 1/2** : Uploading Now! ${completed2}% Completed`)
        setTimeout(function(){
         mm.edit(`**Stage 1/2** : Uploading Now! 100% Completed`)
         if(!data[message.guild.id]){
          data[message.guild.id] = {
            active: true,
            guildid: `${message.guild.id}`,
            channelid: "",
            title: title,
            field: field,
            invite: invlink,
            color: "",
            thumbnail: ""
          };
        }
        listers.push(`${message.guild.id}`)
        fs.writeFile("./data.json", JSON.stringify(data), (err) => {
          if(err) console.log(err)
        });
        fs.writeFile("./list.json", JSON.stringify(list), (err) => {
          if(err) console.log(err)
        });
         setTimeout(function(){
          mm.edit("**Stage 2/2** : Generating Server Settings & Channels | Current: Generating Advert Channel")
          setTimeout(function(){
            (async () => {
            let test = await message.guild.createChannel(`advertisements`, `advertisements`)
                .then(m => {
                idd = m.id 
                m.overwritePermissions(message.guild.id, {
                    VIEW_CHANNEL: true,
                    SEND_MESSAGES: false
                })
                data[`${message.guild.id}`].channelid = `${idd}`
                fs.writeFile("./data.json", JSON.stringify(data), (err) => {
                  if(err) console.log(err)
                });
              })
              })();
            mm.edit("**Stage 2/2** : Generating Server Settings & Channels | Current: Hooking Permissions")
            setTimeout(function(){
              mm.edit("**Stage 2/2** : Generating Server Settings & Channels | Current: Sending Channel Start Test-Message")
              let emb = new Discord.RichEmbed()
               .setTitle(title)
               .addField("----------------------------------", `${field}\n\n${invlink}`)
              client.guilds.get(message.guild.id).channels.get(idd).send(emb)
                setTimeout(function(){
                  mm.edit("Message Sent Successfully, Setup Complete!\n\nHeres whats going to happen:\nEvery 1 hour you will recieve a random advert from another server in the advertisements channel, \nYet this comes with a reward: your advert you created a minute ago will also be live in other peoples servers!")
                }, ms("3s"));
            }, ms("3s"));
          }, ms("3s"));
         }, ms("2s"));

        }, ms("5s"));
      }, ms("4s"));
    }, ms("2s"));
    })();
     } else {
       message.channel.send("Cancelled!")
     }
    })
   })
 })
}
  
  
if(command === "eval"){
  
 function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}  
  let arg = msg.content.split(" ").slice(1);
    if(msg.author.id !== "265536498529599490") return
    try {
      let code = arg.join(" ");
      let evaled = eval(code);
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
      msg.channel.send(clean(evaled), {code:"xl"});
      console.log(`Done: ${code} return: good`)
    } catch (err) {
      msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      console.log("error with eval")
    }
}

if(command === "help"){
  let emb = new Discord.RichEmbed()
  .setTitle("Command Help")
  .setColor('#eb4034')
  .addField("--------------------", "=help  -  Displays This Menu\n=setup  -  Interactive Discord Advertise Set Up For Your Server\n=edit  -  Allows You To Edit Your Servers Advertisement\n=premium  -  Shows Premium Perks & Buy Options")
  message.channel.send(emb)
}

if(command === "premium"){
  let emb = new Discord.RichEmbed()
  .setTitle("Discord Advertise Premium")
  .setColor('#eb4034')
  .addField("----------------------------------------", "**What Does It Do?**\nDiscord Advertise Premium gives you the ability to add extra customisation to your advertisement, With premium you can choose your own color to be added to the side rim of your advertisement, And you can also add your own image thumbnail to the advertisements for your server. And finally your advertisement is 2x more likely to be posted in servers!\n\n**Thats Cool, But How Much Does It Cost?**\n1 Month - $2.99\n3 Months - $7.99\n6 Months - $14.99\n**Lifetime** - $35.99\n\n**How Do I Purchase This?**\nTo purchase join this discord: \nAnd dm the owner: uhFinn#0001")
  message.channel.send(emb)
}

if(command === "boost"){
  if(boosts[message.guild.id].active == true) return message.channel.send("***No Can Do***,\nThis server already has a 1 day boost active! To check its status do =status")
  let curtokens = tokens[message.author.id].tokens
  if(curtokens == 0) return message.channel.send("***Oops...***\nYou dont have any tokens! You can purchase some here: https://soontobewebsite")
  tokens[message.author.id].tokens = curtokens - 1
  boosts[message.guild.id].active = true
  fs.writeFile("./boosts.json", JSON.stringify(boosts), (err) => {
      if(err) console.log(err)
  });
  let boostm = await message.channel.send("***Hang Tight!***\nWe're starting the boost transaction now!\nThis could take a moment, We will let you know when its active!")
  setTimeout(function(){
    let rng = Math.round(Math.random() * 3 + 1)
    if(rng == 1){
      boostm.edit("Hmm Loading is taking longer than usual, We should be done in a minute!")
    } 
    setTimeout(function(){
      fs.writeFile("./tokens.json", JSON.stringify(tokens), (err) => {
          if(err) console.log(err)
      });
      boostm.delete()
      message.reply("\nAll Done, Your Boost Is Now Active! To check its status do =status")
    }, ms("3s"));
  }, ms("10s"));
}






  
  
})










































client.login('TOKEN');
