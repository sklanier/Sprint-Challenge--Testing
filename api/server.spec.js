const server = require('./server.js');

const request = require('supertest');

describe('testing module', () => {

    describe('Tests GET/games functions', () => {
        // TESTING STATUS CODE
        test('should return status code 200', async () => {
            const res = await request(server).get('/games')

            expect(res.status).toBe(200);
        });
        // TESTING BODY DATA TYPE
        test('should return JSON', async () => {
            const res = await request(server).get('/games');

            expect(res.type).toBe('application/json');
        });
        // TESTING RETURN DATA
        test('should return the array', async () => {
            const res = await request(server).get('/games');

            const expected = [
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

            expect(res.body).toEqual(expected);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe('Tests POST/games functions', () => {
        // TESTING STATUS CODE
        test('should return a 422 status code if information is incomplete', async () => {
            const incompleteGame = 
                {
                    title: "Dark Souls",
                    releaseYear: ""
                }

            const res = await request(server)
            .post('/games')
            .send(incompleteGame);

            expect(res.status).toBe(422);
        });
        // TESTING DATA TYPE
        test('should return JSON', async () => {
            const newGame = 
                {
                    title: 'Demon Souls',
                    genre: 'Action RPG',
                    releaseYear: 2009
                }

            const res = await request(server).post('/games').send(newGame);
            expect(res.type).toBe('application/json');
        });
        // TESTING CORRECT RESPONSE
        test('should return status 201 if information is right', async () => {
            const body = 
                    {
                        title: 'Sekiro: Shadows Die Twice',
                        genre: 'Now with Ninjas',
                        releaseYear: 2019
                    }
            const res = await request(server).post('/games').send(body);

            expect(res.status).toBe(201);
        });
    });
});