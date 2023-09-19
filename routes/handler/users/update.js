const bcrypt = require('bcrypt')
const { User } = require('../../../models')
const Validator = require('fastest-validator')
const v = new Validator()

module.exports = async (req, res) => {
    const schema = {
        name: 'string|empty:false',
        email: 'email|empty:false',
        password: 'string|min:6',
        profession: 'string|optional',
        avatar: 'string|optional'
    }

    // validasi input dari user
    const validate = v.validate(req.body, schema)
    if(validate.length) {
        return res.status(409).json({
            status: 'error',
            message: validate
        })
    }

    // cek user by id
    const id = req.params.id
    const user = await User.findByPk(id)

    if(!user) {
        return res.status(404).json({
            status: 'error',
            message: 'User Not Found'
        })
    }

    const email = req.body.email
    if(email) {
        const checkEmail = await User.findOne({
            where: {email}
        })

        // email tidak boleh duplikat
        if(checkEmail && email !== user.email) {
            return res.status(409).json({
                status: 'error',
                message: 'Email already exitst'
            })
        }
    }

    // hash new password
    const password = await bcrypt.hash(req.body.password, 10)

    // get data body
    const { name, profession, avatar } = req.body

    // update to DB
    await user.update({
        email,
        password,
        name,
        profession,
        avatar
    })

    return res.json({
        status: 'success',
        data: {
            id: user.id,
            name,
            email,
            profession,
            avatar
        }
    })
}