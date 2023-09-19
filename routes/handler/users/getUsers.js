const { User } = require('../../../models')

module.exports = async (req, res) => {

    // get query params
    const userIds = req.query.user_ids || []

    // make option for search data
    const queryOption = {
        attributes: ['id', 'name', 'email', 'role', 'profession', 'avatar']
    }

    // check query params
    if(userIds.length) {
        // inject params for search data
        queryOption.where = {
            id: userIds
        }
    }

    const users = await User.findAll(queryOption)

    return res.json({
        status: 'success',
        data: users
    })
}