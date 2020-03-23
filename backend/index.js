const express = require('express');

const app = express();

app.get('/', (request, response, next)=>{
    return response.json({
        evento: 'Semana Omministack 11.0',
        aluno: 'Alvaro Basilio'
    });
});


app.listen(3333);

