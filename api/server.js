const express = require("express");
const server = express();

server.use(express.json());

module.exports = server;

// Endpoints Test
server.get('/', async (req, res) => {
    res
        .status(200)
        .json({ API: 'YTMND' });
});


// Games
let games = [
    {
        title: 'Dark Souls',
        genre: 'Hardcore RPG',
        releaseYear: 2011
    },
    {
        title: 'Dark Souls II',
        genre: 'You Will Die',
        releaseYear: 2014
    },
    {
        title: 'Dark Souls III',
        genre: 'More Death',
        releaseYear: 2016
    },
    {
        title: 'Sekiro: Shadows Die Twice',
        genre: 'Now with Ninjas',
        releaseYear: 2019
    }
  ];

// Get Games Endpoint
server.get('/games', (req, res) => {
    res
        .status(200)
        .json(games);
})

// Post Games Endpoint
server.post('/games', (req, res) => {
    let {title, genre} = req.body;
    if (title && genre){
        res
            .status(201).json(req.body);
    }else{
        res
            .status(422)
            .json({message : "Missing Info"});
    }
});