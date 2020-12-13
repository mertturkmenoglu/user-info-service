const expect = require('chai').expect
const userController = require('../../../src/controllers/userController')
const data = require('../../mocks/userList.json')

describe('getUsers Unit Tests', () => {
    let req
    let res
    let db

    beforeEach(() => {
        req = {}
        res = {
            json: (obj) => obj
        }
        db = {
            find: async () => []
        }
    })

    it('Should return empty list', async () => {
        const expected = {users: []}
        const actual = await userController.getUsers(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })

    it('Should return all the users', async () => {
        const expected = {
            users: data
        }

        db.find = async () => data
        const actual = await userController.getUsers(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })
})

describe('getUserById Unit Tests', () => {
    let req, res, db
    const dbFailString = 'Wrong type'

    beforeEach(() => {
        req = {
            params: {

            }
        }
        res = {
            status_code: -1,
            json: (obj) => obj,
            status: (num) => {
                this.status_code = num
                return res
            }
        }

        db = {
            findById: async (id) => {
                if (typeof id !== 'string')
                    throw {message: dbFailString}
                return [...data].filter(it => it.id === id)
            }
        }
    })

    it('Should get testuserid1', async () => {
        const id = 'testuserid1'
        req.params.id = id

        const expected = {
            user: [ ...data.filter(it => it.id === id) ]
        }

        const actual = await userController.getUserById(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })

    it('Should fail to get testuseridnone', async () => {
        req.params.id = 'testuseridnone'

        const expected = {
            message: "User not found",
            status_code: 404
        }

        const actual = await userController.getUserById(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })

    it('Should fail to get wrong type of id', async () => {
        req.params.id = 1234

        const expected = {
            message: dbFailString,
            status_code: 400
        }

        const actual = await userController.getUserById(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })
})

describe('getUserByUsername Unit Tests', () => {
    let req, res, db
    const dbFailString = 'Wrong type'

    beforeEach(() => {
        req = {
            params: { }
        }
        res = {
            status_code: -1,
            json: (obj) => obj,
            status: (num) => {
                this.status_code = num
                return res
            }
        }

        db = {
            find: async (obj) => {
                if (typeof obj !== 'object' || typeof obj.username !== 'string')
                    throw {message: dbFailString}
                return [...data].filter(it => it.username === obj.username)
            }
        }
    })

    it('Should get testuser', async () => {
        const username = 'testuser'
        req.params.username = username

        const expected = {
            user: [ ...data.filter(it => it.username === username) ]
        }

        const actual = await userController.getUserByUsername(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })

    it('Should fail to get testusernone', async () => {
        req.params.username = 'testuseridnone'

        const expected = {
            message: "User not found",
            status_code: 404
        }

        const actual = await userController.getUserByUsername(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })

    it('Should fail to get wrong type of username', async () => {
        req.params.username = 1234

        const expected = {
            message: dbFailString,
            status_code: 400
        }

        const actual = await userController.getUserByUsername(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })
})