const Category = require('../models/CategoryModel')

const getCategories = async (req, res, next) => {

    try {
        const categories = await Category.find({}).sort({ name: 'asc' }).orFail()
        res.json(categories)
    } catch (error) {
        next(error)
    }
}

const newCategory = async (req, res, next) => {
    try {
        const { category } = req.body

        if (!category) {
            res.status(400).send('category input is required')
        }
        const categoryExists = await Category.findOne({ name: category })
        if (categoryExists) {
            res.status(400).send('category already exists')
        } else {
            const categoryCreated = await Category.create({
                name: category
            })
            res.status(201).send({ categoryCreated })
        }

    } catch (error) {
        console.log(error)
    }
}

const deleteCategory = async (req, res) => {

    try {
        if (req.params.category !== 'Choose category') {
            const categoryExists = await Category.findOne({
                name: decodeURIComponent(req.params.category)
            }).orFail()

            await categoryExists.remove()
            res.json({
                categoryDeleted: true
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            categoryDeleted: false
        })
    }
}


const saveAttr = async (req, res) => {
    const { key, val, categoryChoosen } = req.body

    if (!key || !val || !categoryChoosen) {
        return res.status(400).send('all inputs are required')
    }

    try {

        const category = categoryChoosen.split('/')[0]
        const categoryExists = await Category.findOne({ name: category }).orFail()


        if (categoryExists.attrs.length > 0) {
            const result = categoryExists.attrs.find(attr => attr.key == key)

            if (result) {

                categoryExists.attrs = categoryExists.attrs.map((attr => {
                    if (attr.key === key) {
                        const x = attr.value.find(item => item === val)
                        if (!x) {
                            return {
                                key,
                                value: [...attr.value, val]
                            }
                        } else {
                            return attr
                        }
                    } else {
                        return attr
                    }

                }))
            } else {
                categoryExists.attrs.push({ key: key, value: [val] })
            }
        } else {
            categoryExists.attrs.push({ key: key, value: [val] })
        }

        await categoryExists.save()
        let cat = await Category.find({}).sort({ name: 'asc' })

        return res.status(201).json({ categoriesUpdated: cat })

    } catch (error) {
        res.json({
            error
        })
    }
}

module.exports = {
    getCategories,
    newCategory,
    deleteCategory,
    saveAttr
}