const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response) {
        // buscar todos devs em um raio de 10km
        // busca por tecnologias

        const { latitude, longitude, techs } = request.query;
        console.log(request.query);
        
        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [latitude, longitude]
                    },
                    $maxDistance: 10000
                }
            }
        })

        return response.json({ devs });
    }
}