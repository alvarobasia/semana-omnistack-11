const connection = require('../database/connection');


module.exports = {
    async store(request, response, next){
        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id });
    },

    async index(request, response, next){
        const { page = 1 } = request.query;

        const  [count] = await connection('incidents')
            .count();

        console.log(count);

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(["incidents.*", 'ongs.name', 'ongs.email', 'ongs.city', 'ongs.whatsapp']);

        response.header('X-total-count', count['count(*)']);
        return response.json(incidents);
    },

    async delete(request, response, next){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        if(ong_id === undefined)
            return response.status(404).json({
                error: 'Fatal error'
            });

        const incident = await connection('incidents')
            .where("id", id)
            .select('ong_id')
            .first();

        if(incident === undefined)
            return response.status(404).json({
                error: 'Incident does not exist'
            });

        if(incident.ong_id !== ong_id)
            return response.status(404).json({
                error: 'Operation not allowed'
            });

        await connection('incidents')
            .where('id', id)
            .delete();

        return response.status(204).send();
    }
};