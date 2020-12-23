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

describe('getUserFollowers Unit Tests', () => {
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
            findById: async (id) => {
                if (typeof id !== 'string')
                    throw {message: dbFailString}
                return [...data].filter(it => it.id === id)[0]
            }
        }
    })

    it('Should get followers', async() => {
        const id = 'testuserid1'
        req.params.id = id

        const expectedUser = [ ...data.filter(it => it.id === id) ]
        const expected = {
            followers: expectedUser[0].followers
        }

        const actual = await userController.getUserFollowers(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })

    it('Should fail to get nousername', async() => {
        req.params.id = 'testuseridnone'

        const expected = {
            message: "User not found",
            status_code: 404
        }

        const actual = await userController.getUserFollowers(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })

    it('Should fail to get wrong type of username', async () => {
        req.params.username = 1234

        const expected = {
            message: dbFailString,
            status_code: 400
        }

        const actual = await userController.getUserFollowers(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })
})

describe('getUserFollowing Unit Tests', () => {
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
            findById: async (id) => {
                if (typeof id !== 'string')
                    throw {message: dbFailString}
                return [...data].filter(it => it.id === id)[0]
            }
        }
    })

    it('Should get following', async() => {
        const id = 'testuserid1'
        req.params.id = id

        const expectedUser = [ ...data.filter(it => it.id === id) ]
        const expected = {
            following: expectedUser[0].following
        }

        const actual = await userController.getUserFollowing(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })

    it('Should fail to get nousername', async() => {
        req.params.id = 'testuseridnone'

        const expected = {
            message: "User not found",
            status_code: 404
        }

        const actual = await userController.getUserFollowing(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })

    it('Should fail to get wrong type of username', async () => {
        req.params.username = 1234

        const expected = {
            message: dbFailString,
            status_code: 400
        }

        const actual = await userController.getUserFollowing(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })
})

describe('getUserHobbies Unit Tests', () => {
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
            findById: async (id) => {
                if (typeof id !== 'string')
                    throw {message: dbFailString}
                return [...data].filter(it => it.id === id)[0]
            }
        }
    })

    it('Should get hobbies', async() => {
        const id = 'testuserid1'
        req.params.id = id

        const expectedUser = [ ...data.filter(it => it.id === id) ]
        const expected = {
            hobbies: expectedUser[0].hobbies
        }

        const actual = await userController.getUserHobbies(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })

    it('Should fail to get nousername', async() => {
        req.params.id = 'testuseridnone'

        const expected = {
            message: "User not found",
            status_code: 404
        }

        const actual = await userController.getUserHobbies(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })

    it('Should fail to get wrong type of username', async () => {
        req.params.username = 1234

        const expected = {
            message: dbFailString,
            status_code: 400
        }

        const actual = await userController.getUserHobbies(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })
})

describe('getUserFeatures Unit Tests', () => {
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
            findById: async (id) => {
                if (typeof id !== 'string')
                    throw {message: dbFailString}
                return [...data].filter(it => it.id === id)[0]
            }
        }
    })

    it('Should get features', async() => {
        const id = 'testuserid1'
        req.params.id = id

        const expectedUser = [ ...data.filter(it => it.id === id) ]
        const expected = {
            features: expectedUser[0].features
        }

        const actual = await userController.getUserFeatures(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })

    it('Should fail to get nousername', async() => {
        req.params.id = 'testuseridnone'

        const expected = {
            message: "User not found",
            status_code: 404
        }

        const actual = await userController.getUserFeatures(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })

    it('Should fail to get wrong type of username', async () => {
        req.params.username = 1234

        const expected = {
            message: dbFailString,
            status_code: 400
        }

        const actual = await userController.getUserFeatures(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })
})

describe('getUserLanguages Unit Tests', () => {
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
            findById: async (id) => {
                if (typeof id !== 'string')
                    throw {message: dbFailString}
                return [...data].filter(it => it.id === id)[0]
            }
        }
    })

    it('Should get languages', async() => {
        const id = 'testuserid1'
        req.params.id = id

        const expectedUser = [ ...data.filter(it => it.id === id) ]
        const expected = {
            languages: expectedUser[0].languages
        }

        const actual = await userController.getUserLanguages(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })

    it('Should fail to get nousername', async() => {
        req.params.id = 'testuseridnone'

        const expected = {
            message: "User not found",
            status_code: 404
        }

        const actual = await userController.getUserLanguages(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })

    it('Should fail to get wrong type of username', async () => {
        req.params.username = 1234

        const expected = {
            message: dbFailString,
            status_code: 400
        }

        const actual = await userController.getUserLanguages(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })
})

describe('getUserWishToSpeak Unit Tests', () => {
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
            findById: async (id) => {
                if (typeof id !== 'string')
                    throw {message: dbFailString}
                return [...data].filter(it => it.id === id)[0]
            }
        }
    })

    it('Should get wish to speak', async() => {
        const id = 'testuserid1'
        req.params.id = id

        const expectedUser = [ ...data.filter(it => it.id === id) ]
        const expected = {
            wish_to_speak: expectedUser[0].wish_to_speak
        }

        const actual = await userController.getUserWishToSpeak(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })

    it('Should fail to get nousername', async() => {
        req.params.id = 'testuseridnone'

        const expected = {
            message: "User not found",
            status_code: 404
        }

        const actual = await userController.getUserWishToSpeak(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })

    it('Should fail to get wrong type of username', async () => {
        req.params.username = 1234

        const expected = {
            message: dbFailString,
            status_code: 400
        }

        const actual = await userController.getUserWishToSpeak(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })
})

describe('followUser Unit Tests', () => {
    let req, res, db
    const dbFailString = 'Wrong type'

    beforeEach(() => {
        req = {
            body: {
                thisUsername: '',
                otherUsername: ''
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
            findOne: async (obj) => {
                if (typeof obj !== 'object' || typeof obj.username !== 'string')
                    throw {message: dbFailString}

                const userData = [...data].filter(it => it.username === obj.username)[0]

                if (!userData) return undefined
                return {
                    ...userData,
                    save: async () => {}
                }
            },
        }
    })

    it('Should follow', async() => {
        req.body = {
            thisUsername: 'testuser',
            otherUsername: 'testuser2'
        }

        const expected = {
            message: `${req.body.thisUsername} follows ${req.body.otherUsername}`
        }

        const actual = await userController.followUser(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })

    it('Should fail to follow already following', async() => {
        req.body = {
            thisUsername: 'testuser2',
            otherUsername: 'testuser'
        }

        const expected = {
            message: 'Already following',
            status_code: 400
        }

        const actual = await userController.followUser(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })

    it('Should fail to follow wrong type of username', async() => {
        req.body = {
            thisUsername: 1234,
            otherUsername: 5678
        }

        const expected = {
            message: dbFailString,
            status_code: 400
        }

        const actual = await userController.followUser(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })

    it('Should fail to follow invalid username', async() => {
        req.body = {
            thisUsername: 'testuser',
            otherUsername: 'testusernone'
        }

        const expected = {
            message: 'User(s) not found',
            status_code: 404
        }

        const actual = await userController.followUser(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })
})

describe('unfollowUser Unit Tests', () => {
    let req, res, db
    const dbFailString = 'Wrong type'

    beforeEach(() => {
        req = {
            body: {
                thisUsername: '',
                otherUsername: ''
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
            findOne: async (obj) => {
                if (typeof obj !== 'object' || typeof obj.username !== 'string')
                    throw {message: dbFailString}

                const userData = [...data].filter(it => it.username === obj.username)[0]

                if (!userData) return undefined
                return {
                    ...userData,
                    save: async () => {}
                }
            },
        }
    })

    it('Should unfollow', async() => {
        req.body = {
            thisUsername: 'testuser2',
            otherUsername: 'testuser'
        }

        const expected = {
            message: `${req.body.thisUsername} unfollowed ${req.body.otherUsername}`
        }

        const actual = await userController.unfollowUser(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })

    it('Should fail to follow wrong type of username', async() => {
        req.body = {
            thisUsername: 1234,
            otherUsername: 5678
        }

        const expected = {
            message: dbFailString,
            status_code: 400
        }

        const actual = await userController.unfollowUser(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })

    it('Should fail to follow invalid username', async() => {
        req.body = {
            thisUsername: 'testuser',
            otherUsername: 'testusernone'
        }

        const expected = {
            message: 'User(s) not found',
            status_code: 404
        }

        const actual = await userController.unfollowUser(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })
})

describe('deleteUser Unit Tests', () => {
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
            findById: async (id) => {
                if (typeof id !== 'string')
                    throw {message: dbFailString}
                const userData = [...data].filter(it => it.id === id)[0]

                if (!userData)
                    return undefined

                return {
                    ...userData,
                    remove: async() => {
                        return userData
                    }
                }
            }
        }
    })

    it('Should delete user', async() => {
        const id = 'testuserid1'
        req.params.id = id

        const expected = { user: [...data].filter(it => it.id === id)[0] }

        const actual = await userController.deleteUser(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })

    it('Should fail to delete nousername', async() => {
        req.params.id = 'testuseridnone'

        const expected = {
            message: "User not found",
            status_code: 404
        }

        const actual = await userController.deleteUser(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })

    it('Should fail to get wrong type of username', async () => {
        req.params.username = 1234

        const expected = {
            message: dbFailString,
            status_code: 400
        }

        const actual = await userController.deleteUser(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })
})

describe('getManyUsersById Unit Tests', () => {
    let req, res, db
    const dbFailString = 'Wrong type'

    beforeEach(() => {
        req = {
            body: {
                id_list: []
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
                const userData = [...data].filter(it => it.id === id)[0]

                if (!userData)
                    return undefined

                return {
                    ...userData,
                }
            }
        }
    })

    it('Should get all the users', async() => {
        req.body = {
            id_list: [...data].map(it => it.id)
        }

        const expected = {
            users: [...data]
        }

        const actual = await userController.getManyUsersById(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })

    it('Should fail no id_list', async() => {
        req.body =  {
            id_list: undefined
        }

        const expected = {
            message: 'User id(s) not valid',
            status_code: 400
        }

        const actual = await userController.getManyUsersById(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })

    it('Should fail id_list length greater than max capacity', async() => {
        const list = []
        const MAX_CAPACITY = 100
        for (let i = 0; i < MAX_CAPACITY + 1; i++)
            list.push(i)

        req.body = {
            id_list: list
        }

        const expected = {
            message: `Max request capacity is ${MAX_CAPACITY}`,
            status_code: 400
        }

        const actual = await userController.getManyUsersById(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })

    it('Should fail id_list contains not right type id', async() => {
        req.body = {
            id_list: ['testuserid1', 1234]
        }

        const expected = {
            message: dbFailString,
            status_code: 400
        }

        const actual = await userController.getManyUsersById(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })

    it('Should fail id_list contains not valid id', async() => {
        req.body = {
            id_list: ['testuserid1', 'testuseridnone']
        }

        const expected = {
            message: "User not found",
            status_code: 404
        }

        const actual = await userController.getManyUsersById(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })
})

describe('getManyUsersByUsername Unit Tests', () => {
    let req, res, db
    const dbFailString = 'Wrong type'

    beforeEach(() => {
        req = {
            body: {
                list: []
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
            findOne: async (obj) => {
                if (typeof obj !== 'object' || typeof obj.username !== 'string')
                    throw {message: dbFailString}
                const userData = [...data].filter(it => it.username === obj.username)[0]

                if (!userData)
                    return undefined

                return {
                    ...userData,
                }
            }
        }
    })

    it('Should get all the users', async() => {
        req.body = {
            list: [...data].map(it => it.username)
        }

        const expected = {
            users: [...data]
        }

        const actual = await userController.getManyUsersByUsername(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })

    it('Should fail no list', async() => {
        req.body =  {
            list: undefined
        }

        const expected = {
            message: 'Username(s) not valid',
            status_code: 400
        }

        const actual = await userController.getManyUsersByUsername(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })

    it('Should fail list length greater than max capacity', async() => {
        const list = []
        const MAX_CAPACITY = 100
        for (let i = 0; i < MAX_CAPACITY + 1; i++)
            list.push(i)

        req.body = {
            list
        }

        const expected = {
            message: `Max request capacity is ${MAX_CAPACITY}`,
            status_code: 400
        }

        const actual = await userController.getManyUsersByUsername(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })

    it('Should fail list contains not right type username', async() => {
        req.body = {
            list: ['testuser', 1234]
        }

        const expected = {
            message: dbFailString,
            status_code: 400
        }

        const actual = await userController.getManyUsersByUsername(req, res, db)
        expect(actual).to.be.deep.equal(expected)
    })
})