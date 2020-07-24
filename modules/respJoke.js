exports.INIT = function(message,client,data,variable){
    var botID ="<@!"+client.user.id+">"
    var msg = message.content.replace(botID,'')
    msg=msg.replace(/[`~!@#$%^№&*()_|+\-=;:'",.<>\{\}\[\]\\\/]/gi, '')
    
    if(msg.indexOf('?')!=-1&&msg.length>4)
    {
        var num =random(0,data.wQuest.length)
        message.channel.send(data.wQuest[num])
    }
    else
    {
        var num =random(0,data.woQuest.length)
        message.channel.send(data.woQuest[num])
    }


    return 
} 

function random(low, high) 
{
  return Math.floor(Math.random() * (high - low) + low)
}