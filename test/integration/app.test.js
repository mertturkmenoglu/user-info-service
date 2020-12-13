const request = require('supertest')
let server

describe('Server Main File Integration Tests', () => {
    before(() => {
        process.env.NODE_ENV = 'test'
    })

    beforeEach(() => {
        server = require('../../src/app')
    })

    afterEach(done => {
        server.close( () => {
           delete require.cache[require.resolve( '../../src/app' )]
           done()
        })
    })

    it('Response to /', (done) => {
        request(server)
            .get('/')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    })

    it('404', (done) => {
        request(server)
            .get('/notFouNd')
            .expect(404, done)
    })
})