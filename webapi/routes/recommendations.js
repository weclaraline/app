const RecomendationService = require("../src/services/recomendation/RecomendationService");

module.exports = function(app) {
    app.post('/recommendations', async (req, res) => {
        const recommendations = await RecomendationService.post(req.body);
        res.send(recommendations);
    });
    app.get('/recommendations', async (req, res) => {
        RecomendationService.get()
        .then(result => res.send(result));
    });
    
    app.get('/recommendations/:key', function (req, res) {
        const key = req.params.key || undefined;
        RecomendationService.get(key)
        .then(result => res.send(result));
    });
};
