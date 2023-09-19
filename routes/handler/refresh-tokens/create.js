const { User, RefreshToken } = require('../../../models')
const Validator = require('fastest-validator')
const v = new Validator()

module.exports = async (req, res) => {
    const userId = req.body.user_id
    const refreshToken = req.body.refresh_token

    // buat schema validasi
    const schema = {
        user_id: 'number',
        refresh_token: 'string'
    }

    const validate = v.validate(req.body, schema)
    if(validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        })
    }

    // check user id in DB
    const user = await User.findByPk(userId)
    if(!user) {
        return res.status(404).json({
            status: 'error',
            message: 'User Not Found'
        })
    }

    // add refresh token to DB
    const cretedToken = await RefreshToken.create({
        token: refreshToken,
        user_id: userId
    })

    return res.json({
        status: 'success',
        data: {
            id: cretedToken.id
        }
    })
    
}