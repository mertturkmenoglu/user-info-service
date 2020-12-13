const request = require('supertest')
const chai = require('chai')
const expect = chai.expect
const mockList = require('../../mocks/allUsersMock.json')
let server

describe('User Controller Integration Tests', () => {
    before(() => {
        process.env.NODE_ENV = 'test'
    })

    beforeEach(() => {
        server = require('../../../src/app')
    })

    afterEach(done => {
        server.close( () => {
            delete require.cache[require.resolve( '../../../src/app' )]
            done()
        })
    })

    it('Should return a list of users', done => {
        request(server)
            .get('/user')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res.statusCode).to.be.a('number')
                expect(res.statusCode).to.eq(200)
                expect(res.body).to.be.deep.eq(mockList)
                done()
            })
    })
})

