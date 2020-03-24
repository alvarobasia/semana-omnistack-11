const connection = require('../database/connection');

module.exports = {
    async index(request, response, next){
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select("*");

        if(incidents.length === 0)
            return response.json({
                info: "There is not incidents to this ONG"
            });


        return response.json(incidents);
    }
}