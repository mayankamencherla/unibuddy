const axios = require('axios');
const {generate_active_conv, compute_most_active, compute_most_active_bf} = require('../../helpers');

module.exports.controller = (app) => {

    /**
     * Retrieves an entity based on input parameters
     */
    app.get('/active', (req, res, next) => {
        console.log(`Request to retrieve active conversations`);
        const conversations = generate_active_conv(100);
        res.json({
            "Success": true,
            "most_active_brute_force": `Day ${compute_most_active_bf(conversations)}`,
            "most_active_optimized": `Day ${compute_most_active(conversations)}`
        });
    });
};