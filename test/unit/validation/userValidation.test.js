const should = require('chai').should()

describe('User Validation', () => {
    const userValidation = require('../../../src/validation/userValidation')
    let data

    beforeEach(() => {
        data = {
            username: 'test_username',
            name: 'Test User',
            email: 'text@user.com',
            isAdmin: false,
            image: 'https://github.com/mertturkmenoglu.png',
            hobbies: ['hobby1', 'hobby2'],
            features: ['feature1', 'feature2'],
            bdate: new Date(),
            followers: [],
            following: [],
            location: {},
            job: '',
            school: '',
            website: '',
            twitter: '',
            bio: '',
            gender: '',
            languages: [],
            wish_to_speak: []
        }
    })

    afterEach(() => {
        data = undefined
    })

    it('User - Base case should return true', (done) => {
        const expected = true
        const actual = userValidation(data)
        actual.should.equal(expected)
        actual.should.be.a('boolean')
        done()
    })

    it('User - Invalid email should return false', (done) => {
        data.email = 'notemail.com'
        const expected = false
        const actual = userValidation(data)
        actual.should.equal(expected)
        actual.should.be.a('boolean')
        done()
    })
})