const expect = require('chai').expect;
const User = require('../../../src/models/User');

describe('User Model', function() {
    it('Should be invalid if parameter is undefined', (done) => {
        const user = new User()

        user.validate((err) => {
            expect(err.errors.name).to.exist;
            done();
        });
    });

    it('Should be valid for all correct cases', (done) => {
        const user = new User({
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
        })

        user.validate(err => {
            expect(err).to.not.exist
            done()
        })
    })
});