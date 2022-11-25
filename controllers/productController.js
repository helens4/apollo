const Product = require('../models/ProductModel')
const recordsPerPage = require('../config/pagination')

const getProducts = async (req, res) => {

    try {
        const pageNum = Number(req.query.pageNum) || 1

        const products = await Product.find({}).sort({ name: 1 }).limit(recordsPerPage)
        res.json({
            products
        })
    } catch (error) {
        res.json({
            error
        })
    }

}

module.exports = {
    getProducts
}