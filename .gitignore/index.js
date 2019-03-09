const Discord = require('discord.js')
const bot = new Discord.Client()
var prefix = ("t.")
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapters  = new FileSync('database.json');
const db = low(adapters);

bot.on('ready', function () {
  console.log("Je suis connecté !")
})

bot.on("ready", async () => {

    bot.user.setStatus('hors ligne')

    bot.user.setGame('Bonjour!')

    bot.user.setGame('TiRoD' , 'https://www.twitch.tv/tirod170');

});

bot.on('message', function (message) {
  if (message.content === 'Bonjour') {
   message.reply('Salut')
  }
})

bot.on('message', function (message) {
  if (message.content === 'bonjour') {
   message.reply('Salut')
  }
})

bot.on('message', function (message) {
  if (message.content === '!pub') {
   message.reply('La PUB est interdit!!')
  }
})

bot.on('message', function (message) {
  if (message.content === '!stream') {
   message.reply('TiRoD est hors ligne sur Twitch, Youtube...')
  }
})

bot.on('message', function (message) {
  if (message.content === '!info') {
   message.reply('Pour les info discord fait t.discord')
  }
})

db.defaults({ histoire : [],xp : []}).write()
 
bot.on('message', message => {
 
  var msgauthor = message.author.id
 
  if(message.author.bot)return;
 
  if(!db.get("xp").find({user : msgauthor}).value()){
      db.get("xp").push({user : msgauthor, xp: 1}).write();
  }else{
      var userxpdb = db.get("xp").filter({user : msgauthor}).find("xp").value();
      console.log(userxpdb)
      var userxp = Object.values(userxpdb)
      console.log(userxp)
      console.log(`Nombre d'xp: ${userxp[1]}`)
 
      db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();
 
      if(message.content === prefix + "xp"){
          var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
          var xpfinal = Object.values(xp);
          var xp_embed = new Discord.RichEmbed()
              .setTitle(`Stat des XP de : ${message.author.username}`)
              .setColor('#F4D03F')
              .addField("XP", `${xpfinal[1]} xp`)
              .setFooter("Bonne Chance :p")
          message.channel.send({embed : xp_embed})
      }
  }
})

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}kick`){

    //!kick @daeshan askin for it

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Can't find user!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Tiime", message.createdAt)
    .addField("Reason", kReason);

    let kickChannel = message.guild.channels.find(`name`, "incidents");
    if(!kickChannel) return message.channel.send("Can't find incidents channel.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;
  }

  if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Can't find user!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "incidents");
    if(!incidentchannel) return message.channel.send("Can't find incidents channel.");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);


    return;
  }


  if(cmd === `${prefix}report`){

    //!report @ned this is the reason

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Couldn't find user.");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#15f153")
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", rreason);

    let reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) return message.channel.send("Couldn't find reports channel.");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
  }




  if(cmd === `${prefix}serverinfo`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);

    return message.channel.send(serverembed);
  }



  if(cmd === `${prefix}botinfo`){

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt);

    return message.channel.send(botembed);
  }

});



bot.login('NDI4MjQ0NTM5ODQ1NzcxMjY0.D2GP7A.cfENIVknkEXZh8MW2LEY39QZHBs')
