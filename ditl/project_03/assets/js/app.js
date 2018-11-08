(function () { 

function handleSlackUsers(result){
    console.log(result)
}

slack.call({
    url: '/users.list',
    success:handleSlackUsers,
})

console.log("test")


})()
