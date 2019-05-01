function generate_url(title, page) {
    return `https://jsonmock.hackerrank.com/api/movies/search/?Title=${title}&page=${page}`;
}

function generate_active_conv(num) {
    const result = [];
    for (var i=0; i<num; i++) {
        var start = Math.floor(Math.random() * 365 + 1);
        var remaining = 365 - start;
        var end = Math.floor(Math.random() * remaining + start);
        result.push({
            start_day: start,
            end_day: end
        });
    }
    return result;
}

function generate_days_array(days) {
    return new Array(days).fill(0);
}

function compute_most_active_bf(conversations) {
    var active = generate_days_array(365);
    var maxSoFar = 0;
    var maxIndex = -1;
    conversations.forEach(function(convo) {
        console.log(convo.start_day, convo.end_day);
        for (var i=convo.start_day-1; i<convo.end_day; i++) {
            active[i]++;
            found_max = (active[i] >= maxSoFar);
            maxSoFar = found_max ? active[i] : maxSoFar;
            maxIndex = found_max ? i : maxIndex;
        }
    });
    return maxIndex;
}

// Example: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// Example: {3, 6}
// hash[2]++, hash[6]--
// [0, 0, 1, 0, 0, 0, -1, 0, 0, 0]
// [0, 0, 1, 1, 1, 1, 0, 0, 0, 0]

function compute_most_active(conversations) {
    var active = generate_days_array(366);
    conversations.forEach(function(convo) {
        console.log(convo.start_day, convo.end_day);
        active[convo.start_day-1] += 1;
        active[convo.end_day] -= 1;
    });
    return most_active(active);
}

function most_active(active) {
    var maxSoFar = 0;
    var maxIndex = -1;
    var spill = 0;
    active.forEach(function (day, index) {
        spill += day;
        found_max = (spill >= maxSoFar);
        maxSoFar = found_max ? spill : maxSoFar;
        maxIndex = found_max ? index : maxIndex
    })
    return maxIndex;
}

function validate(query) {
    if (!query.hasOwnProperty('title')) {
        return {
            result: false,
            message: "title needs to be sent in the url request"
        }
    }

    return {result: true};
}

function filter_issues(data) {
    return data.map(movie => movie.Title);
}

function aggregate(data) {
    return data.sort();
}

module.exports = {
    aggregate,
    filter_issues,
    generate_url,
    validate,
    generate_active_conv,
    compute_most_active,
    compute_most_active_bf
}