const axios = require('axios');
const {aggregate, filter_issues, generate_url, validate} = require('../../helpers');

module.exports.controller = (app) => {

    /**
     * Retrieves an entity based on input parameters
     */
    app.post('/query', async (req, res, next) => {
        const v = validate(req.body);

        if (!v.result) {
            return res.json({
                "Success": false,
                "message": v.message
            });
        }

        const title = req.body.title;

        console.log(`Request to retrieve movie titles for : ${title}`);

        const titles = [];
        var page = 1;

        // Fetch first page
        // Get total pages in the initial request
        // Use total pages to generate a map of requests from page2: page N
        // Parallely add the results to the titles array

        // Let titles array be a sorted list of titles
        // At each fetch call, use a comparative sorting algorithm to push the title in its place
        // So at the end of adding the new titles, titles array remains sorted

        // say titles contains m elements
        // After fetch, the fetched response contains n elements
        // total items = m + n
        // Sorting on these requires (m + n) log(m + n) comparisons

        while (true) {
            const url = generate_url(title, page);

            let result;
            try {
                result = await axios.get(url);
            } catch (e) {
                console.log(e);
                return res.json({"Success": false, "message": "Unable to retrieve data"});
            }

            console.log(`Pulled out ${result.data.data.length} on page ${page}`);

            if (result.data.data.length == 0) break;

            titles.push(...filter_issues(result.data.data));

            console.log(`Pulled out a total of ${titles.length} after page ${page}`);
            page++;
        }


        res.json({"Success": true, titles: aggregate(titles)});
    });
};