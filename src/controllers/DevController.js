const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

// index(ListAll), show(FindOne), store(Create), update(Alterar), destroy(Deletar)
// TODO: Update para o objeto 'Dev'
module.exports = {
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },
    async show(request, response) {
        const dev = await Dev.findOne({
            github_username: {
                $eq: request.params.github_username
            }
        });
        return response.json(dev);
    },
    async update(request, response) {},
    async destroy(request, response) {
        const dev = await Dev.deleteOne({
            github_username: {
                $eq: request.params.github_username
            }
        });
        return response.json(dev);
    },
    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {

            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        
            const { name = login, avatar_url, bio } = apiResponse.data;
            
            const techsArray = parseStringAsArray(techs);
            
            const location = {
                type: 'Point',
                coordinates: [latitude, longitude]
            };
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });
        }

        return response.json(dev);
    }
}