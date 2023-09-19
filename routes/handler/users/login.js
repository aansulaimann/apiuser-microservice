const bcrypt = require('bcrypt')
const { User } = require('../../../models')
const Validator = require('fastest-validator')
const v = new Validator()

module.exports = async (req, res) => {
    const schema = {
        email: 'email|empty:false',
        password: 'string|empty:false|min:6'
    }

    // validasi input dari user
    const validate = v.validate(req.body, schema)
    if(validate.length) {
        return res.status(409).json({
            status: 'error',
            message: validate
        })
    }

    // cari email, apakah ada?
    const user = await User.findOne({
        where: {email: req.body.email}
    })

    // jika email tidak ditemukan
    if(!user) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found'
        })
    }

    // cek hash password
    const isValidPassword = await bcrypt.compare(req.body.password, user.password)
    if(!isValidPassword) {
        return res.status(404).json({
            status: 'error',
            message: 'Password Salah'
        })
    }

    // return success
    res.json({
        status: 'success',
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            profession: user.profession
        }
    })
}