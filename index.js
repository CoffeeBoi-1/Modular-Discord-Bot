const Discord = require('discord.js');
const client = new Discord.Client();
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

var data
const fs = require('fs')
const requireNew = require('require-new')

client.on('message',message=>{
    data=requireNew('./data.json')
    if(message.content.substring(0,data.prefix.length)==data.prefix&&message.member.id!=client.user.id)
    {
        
        data = JSON.parse(fs.readFileSync('./data.json'))
        var command
        var variable=""
        if(message.content.indexOf('{')!=-1)
        {
            command=message.content.substring(data.prefix.length,message.content.indexOf('{'))

            variable=message.content.substring(message.content.indexOf('{'))
            variable=variable.replace(/[{}]/gi,'')
        }
        else
        {
            command=message.content.substring(data.prefix.length)
        }
        
        if(data.commands.indexOf(command)!=-1)
        {
           try 
           {
               if(fs.existsSync('./modules/'+command+'.js'))
               {
                   try 
                   {
                    var mod = requireNew('./modules/'+command+'.js')
                    mod.INIT(message,client,data,variable)
                   } 
                   catch (error) 
                   {
                       message.channel.send(error)
                       
                       var dataErr="Error in module  "+ Date()
                       var line = "------------------------------------------------------------------"

                       fs.appendFileSync('./LOG.txt',dataErr+'\n')
                       fs.appendFileSync('./LOG.txt',line+'\n')
                       fs.appendFileSync('./LOG.txt',message.content+'\n')
                        fs.appendFileSync('./LOG.txt',error+'\n')
                        fs.appendFileSync('./LOG.txt',line+'\n\n\n\n')
                        console.error("FIND ERROR!")
                   }
               }
               else
               {
                   throw error
               }
           } 
           catch (error) 
           {
            message.channel.send(data.config.haventCommandInModules)

            var dataErr="File wasn't found   "+ Date()
            var line = "------------------------------------------------------------------"

           fs.appendFileSync('./LOG.txt',dataErr+'\n')
           fs.appendFileSync('./LOG.txt',line+'\n')
           fs.appendFileSync('./LOG.txt',message.content+'\n')
           fs.appendFileSync('./LOG.txt',error+'\n')
           fs.appendFileSync('./LOG.txt',line+'\n\n\n\n')
           console.error("FIND ERROR!")
           } 
        }
        else
        {
            message.channel.send(data.config.wrongCommandMsg)
        }
    }

    if(message.mentions.users.size==1&&message.mentions.users.get(client.user.id)!=null&&message.content.substring(0,data.prefix.length)!=data.prefix)
    {
        try {
            var mod = requireNew('./modules/respJoke.js')
            mod.INIT(message,client,data,variable)
        } catch (error) {
            var dataErr="respJokeErr   "+ Date()
            var line = "------------------------------------------------------------------"

            message.channel.send(data.config.innerError)
           fs.appendFileSync('./LOG.txt',dataErr+'\n')
           fs.appendFileSync('./LOG.txt',line+'\n')
           fs.appendFileSync('./LOG.txt',message.content+'\n')
           fs.appendFileSync('./LOG.txt',error+'\n')
           fs.appendFileSync('./LOG.txt',line+'\n\n\n\n')
           console.error("FIND ERROR!")
        }
    }
})

client.on('ready',function(){
    rlQu()
})

function rlQu()
{
    rl.question('Command:', (answer) => {
        var data_ = JSON.parse(fs.readFileSync('./data.json'))
        var variable=""
        if(answer.indexOf('{')!=-1)
        {
            variable=answer.substring(answer.indexOf('{'))
            variable=variable.replace(/[{}]/gi,'')

            answer=answer.substring(0,answer.indexOf('{'))

            console.log(variable+"  "+answer)
        }
        if(data_.commandsCMD.indexOf(answer)!=-1)
        {
           try 
           {
               if(fs.existsSync('./modules/'+answer+'.js'))
               {
                   try 
                   {
                    var mod = requireNew('./modules/'+answer+'.js')
                    mod.INIT("",client,data,variable)
                    rlQu()
                   } 
                   catch (error) 
                   {
                        console.error("error in module")
                        var dataErr="error in module CMD   "+ Date()
                        var line = "------------------------------------------------------------------"
                       fs.appendFileSync('./LOG.txt',dataErr+'\n')
                       fs.appendFileSync('./LOG.txt',line+'\n')
                       fs.appendFileSync('./LOG.txt',answer+'\n')
                       fs.appendFileSync('./LOG.txt',error+'\n')
                       fs.appendFileSync('./LOG.txt',line+'\n\n\n\n')
                        rlQu()
                   }
               }
               else
               {
                   throw error
               }
           } 
           catch (error) 
           {
           console.error("haven't file")
           rlQu()
           } 
        }
        else
        {
            console.log("wrong command")
            rlQu()
        }
    })
}


client.login(JSON.parse(fs.readFileSync('./data.json')).botID)