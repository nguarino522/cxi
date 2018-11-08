// https://api.slack.com/web#methods
var slack = {
    message: function (channel, message, emoji) {
        emoji = emoji || ':cx:';

        var username = 'CXI DITL Bot';

        var url = '/chat.postMessage';

        var data = {
            channel: channel,
            text: message,
            username: username,
            icon_emoji: emoji,
        };
        console.log(data)
        return slack.call({
            url: url,
            data: data,
        });
    },
    call: function (config) {
        if (typeof config === 'undefined') {
            config = {};
        }

        if (typeof config.url === 'undefined') {
            console.error('url must be set');
            return;
        }

        if (typeof config.data === 'undefined') {
            config.data = {};
        }

        config.data.token = auth.slackToken;

        $.ajax({
            method: config.method || 'GET',
            url: 'https://slack.com/api' + config.url,
            data: config.data,
            contentType: 'application/x-www-form-urlencoded',
            success: config.success,
            error: config.error,
            complete: config.complete,
        });
    },
};

// Simple function to sort an array of objects
var sortObjects = function (key, objects, reverse) {
    function compare(a, b) {
        if (a[key] < b[key]) {
            return -1;
        } else if (a[key] > b[key]) {
            return 1;
        } else {
            return 0;
        }
    }

    objects.sort(compare);

    if (reverse) {
        objects.reverse();
    }
};

// Returns how many seconds ago an epoch is
var timeSince = function (epoch) {
    var secondsAgo = Math.floor(((new Date()).getTime() / 1000) - epoch);
    var number = secondsAgo;
    var label = 'second';

    if (number >= 86400) {
        number = Math.floor(secondsAgo / 60 / 60 / 24);
        label = 'day';
    } else if (number >= 3600) {
        number = Math.floor(secondsAgo / 60 / 60);
        label = 'hour';
    } else if (number >= 60) {
        number = Math.floor(secondsAgo / 60);
        label = 'minute';
    }

    if (number > 1) {
        label += 's';
    }

    return number + ' ' + label + ' ago';
};
