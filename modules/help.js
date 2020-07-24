exports.INIT=function(message,client,data,variable)
{
    message.channel.send(data.config.helpMsg)
    return 
}