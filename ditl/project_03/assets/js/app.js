(function () { 

function handleSlackUsers(result){
    let users = result.members
    sortObjects("update", users, true)
    users = users.slice(0, 3)

    $('#recently-updated-users').html("")

    for (let i = 0; i < users.length; i++){
        let user = users[i]
        $('#recently-updated-users').append('<li class="list-group-item">' + user.real_name + '</li>')
    }
}


function handleChannels(result){
    let channels = result.channels
    sortObjects("created", channels, true)
    channels = channels.slice(0, 3)

    $('#recently-created-channels').html("")

    for (let i = 0; i < channels.length; i++){
        let channel = channels[i]
        $('#recently-created-channels').append('<li class="list-group-item">' + channel.name + '</li>')
    }
}

function handleUsersComplete(){
    setTimeout(getUsers, 5000)
}

function handleChannelsComplete(){
    setTimeout(getChannels, 5000)
}

function handleUsersError(){
    console.log("error")
}

function handleChannelsError(){
    console.log("error")
}



function getUsers(){
slack.call({
    url: '/users.list',
    success: handleSlackUsers,
    error: handleUsersError
    complete: getUsers,
})
}

function getChannels(){
slack.call({
    url: '/channels.list',
    success:handleChannels,
    error: handleChannelsError
    complete: getChannels,
})
}

getUsers();
getChannels();
//setTimeout(getUsers, 10000)
//setTimeout(getChannels, 10000)

})()
