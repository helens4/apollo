const Order = require('../models/OrderModel')

const getOrders = (req, res) => {
    //Product.create({ name: 'Panasonic' })
    res.send('handling order routes, e.g. search for orders')
}

module.exports = {
    getOrders
}