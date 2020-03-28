const connection = require("../database/connection");
const generateUniqueId = require('../utils/GenerateUniqueId');


module.exports = {
    async store(request, response, next){
     const {name, email, whatsapp, city, uf} = request.body;
     const id = generateUniqueId();
     await connection('ongs').insert({
         id,
         name,
         email,
         whatsapp,
         city,
         uf
     });
     return response.json({ id });
 },
    async index(request, response, next){
     const ongs = await connection('ongs').select('*');
     return response.json(ongs);
},
};