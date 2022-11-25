const User = require('../models/UserModel')

const getUsers = (req, res) => {
    //Product.create({ name: 'Panasonic' })
    res.send('handling user routes, e.g. search for users')
}

module.exports = {
    getUsers
}