(function () {

    function handleSlackUsers(result) {
        // Get Users
        let users = result.members

        // Sort by updated
        sortObjects("updated", users, true)

        handledDeletedUsers(users)

        // TODO: Remove bots

        // Limit to only the top 3
        users = users.slice(0, 3)

        // Blank out list on page
        $('#recently-updated-users').html('')

        // Loop over all users
        for (let i = 0; i < users.length; i++) {
            // Get the user for this loop
            let user = users[i]

            // Add user to list
            placeUserInfo(user, "#recently-updated-users")
        }

        $("#users-error").addClass("hidden")
    }

    function handledDeletedUsers(users) {
        let deletedUsers = []
        for (let i = 0; i < users.length; i++) {
            const user = users[i]
            if (user.deleted) {
                deletedUsers.push(user)
            }
        }
        $('#recently-deleted-users').html('')

        deletedUsers = deletedUsers.slice(0, 5)
        for (let i = 0; i < deletedUsers.length; i++) {
            const user = deletedUsers[i]
            console.log(user)
            placeUserInfo(user, "#recently-deleted-users")
        }
    }

    function placeUserInfo(user, target) {
        const topHat = '\u{1F3A9}'
        const coolDude = '\u{1F60E}'
        const name = user.profile.real_name
        const image = `<img src="${user.profile.image_48}">`
        const title = `${user.profile.title}`
        const username = `${user.profile.display_name}`
        const updated = timeSince(user.updated)

        let icons = ""
        if (user.is_admin) {
            icons = icons + topHat
        }

        if (user.name == "aaron") {
            icons = icons + coolDude
        }

        let text = `
            ${image}${icons}<strong>${name}</strong> (${username}) - <i>${title} - ${updated}</i>
        `

        $(target).append(`
            <li class="list-group-item">
                <a href="slack://user?team=${user.team_id}&id=${user.id}">${text}</a>
            </li>
        `)
    }

    function handleSlackChannels(result) {
        let channels = result.channels
        sortObjects("created", channels, true)
        channels = channels.slice(0, 3)
        $('#recently-created-channels').html('')
        for (let i = 0; i < channels.length; i++) {
            let channel = channels[i]
            placeChannels(channel)
        }
        $("#channels-error").addClass("hidden")

    }

    function placeChannels(channel) {
        let text = `
            <b>${channel.name}</b> - <i>${channel.purpose.value}</i>
        `
        $('#recently-created-channels').append('<li class="list-group-item">' + text + '</li>')
    }

    function handleUsersComplete() {
        setTimeout(getUsers, 60000)
    }

    function handleChannelsComplete() {
        setTimeout(getChannels, 60000)
    }

    function handleUsersError() {
        $("#users-error").removeClass("hidden")
    }

    function handleChannelsError() {
        $("#channels-error").removeClass("hidden")
    }

    function getUsers() {
        slack.call({
            url: '/users.list',
            success: handleSlackUsers,
            error: handleUsersError,
            complete: handleUsersComplete,
        })
    }

    function getChannels() {
        slack.call({
            url: '/channels.list',
            success: handleSlackChannels,
            error: handleChannelsError,
            complete: handleChannelsComplete,
        })
    }

    getUsers()
    getChannels()

})()
