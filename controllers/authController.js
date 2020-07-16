const bcrypt = require('bcrypt')

const UserModel = require('../models/userModel')
const getConfirmationCode = require('../utils/getConfirmationCode.js')
const sendMail = require('../utils/sendMail.js')

exports.signup1 = async function (req, res) {
    const { email, password } = req.body

    const user = await UserModel.findOne({ email })

    if (user && user.isConfirmed) {
        return res.json({ error: { emailFeedback: 'Пользователь с таким Email уже существует' } })
    }

    if (user && !user.isConfirmed) {
        await user.remove()
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new UserModel({
        email,
        password: hashedPassword,
        isConfirmed: false,
        confirmationCode: getConfirmationCode(),
        numberConfirmationAttempts: 3,
        refreshToken: '',
        fingerprint: ''
    })
    await newUser.save()

    sendMail(email, 'Подтвердите свой Email', `Код подтверждения: ${newUser.confirmationCode}`)

    return res.json({ success: true })
}
