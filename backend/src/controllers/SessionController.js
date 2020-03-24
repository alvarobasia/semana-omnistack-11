const connection = require('../database/connection');

module.exports = {
    async create(request, response, next) {
        const {id} = request.body;

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();

        if (!ong)
            return response.status(400)
                .json({
                    error: `No ONG found with this id: ${id}`
                });

        return response.json(ong);
    }
}