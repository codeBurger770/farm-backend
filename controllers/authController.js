const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

exports.signup2 = async function (req, res) {
    const { email, confirmationCode } = req.body

    const user = await UserModel.findOne({ email })

    if (!user || user.isConfirmed) {
        return res.sendStatus(400)
    }

    if (user.confirmationCode !== confirmationCode) {
        user.numberConfirmationAttempts--
        await user.save()

        if (user.numberConfirmationAttempts > 0) {
            return res.json({
                error: {
                    confirmationCodeFeedback: `Код подтверждения не верный. Осталось ${user.numberConfirmationAttempts} попыток`,
                    numberConfirmationAttempts: user.numberConfirmationAttempts
                }
            })
        } else {
            await user.remove()

            return res.json({
                error: {
                    confirmationCodeFeedback: 'У вас не осталось попыток',
                    numberConfirmationAttempts: user.numberConfirmationAttempts
                }
            })
        }
    }

    user.isConfirmed = true
    user.numberConfirmationAttempts = 0
    await user.save()

    return res.json({ success: true })
}

exports.signin = async function (req, res) {
    const { email, password } = req.body

    const user = await UserModel.findOne({ email })

    if (!user) {
        return res.json({ error: { emailFeedback: 'Пользователя с таким Email не существует' } })
    }

    if (!user.isConfirmed) {
        return res.json({ error: { emailFeedback: 'Пользователь не подтвердил свой Email' } })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.json({ error: { passwordFeedback: 'Неверный пароль' } })
    }

    user.refreshToken = jwt.sign({ id: user._id }, process.env.APP_SECRET_KEY, { expiresIn: '24h' })
    await user.save()

    return res.json({
        success: {
            accessToken: jwt.sign({ id: user._id }, process.env.APP_SECRET_KEY, { expiresIn: '24h' }),
            refreshToken: user.refreshToken
        }
    })
}

exports.signout = function (req, res) {
    return res.json({ success: 'authController signout' })
}

exports.refreshTokens = function (req, res) {
    return res.json({ success: 'authController refreshTokens' })
}
