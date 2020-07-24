exports.INIT = function(message,client,data,variable){
    if(variable=="")
    {
        throw new Error("```Инструкция:\nD.fight{упоминание пользователя}```").message
    }
    else
    {
        id2=variable.replace(/[<@!> ]/gi,'')
        if(id2!=client.user.id)
        {
            if(message.guild.members.cache.get(id2)!=null)
            {
            id1=message.member.id
            var num =random(0,2)
    
            if(num==0)
            {
                message.channel.send(`<@!${id1}>\nУбил:\n<@!${id2}>`)
                message.channel.send("Поздравляю, семпай!")
            }
            else
            {
                message.channel.send(`<@!${id2}>\nУбил:\n<@!${id1}>`)
                message.channel.send("Поздравляю, семпай!")
            }
            }
            else
            {
                throw new Error("```Инструкция:\nD.fight{упоминание пользователя}```").message
            }
        }
        else
        {
            message.channel.send("Не дерись со мной, семпай!")
        }
    }
    return 
} 

function random(low, high) 
{
  return Math.floor(Math.random() * (high - low) + low)
}