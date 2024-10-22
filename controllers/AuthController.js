const User = require('../models/User')

const bcrypt = require('bcryptjs')



module.exports = class AutController {
    static showLogin(req, res) {
        res.render('login')
    }
    static showRegister(req, res) {
        res.render('register')
    }

    static async login(req, res) {
        const {
            email,
            password
        } = req.body

        const user = await User.findOne({where: {email: email}})

        const invalidMessage ='Invalid data. Verify your email or password.'

        if(!user) {
            req.flash('message', invalidMessage)
            res.render('login')
            return;
        }

        const passwordsMatch = bcrypt.compareSync(password, user.password)

        if(!passwordsMatch) {
            req.flash('message', invalidMessage)
            res.render('login')
            return;
        }

        req.session.userid = user.id

        req.flash('message', 'Successfully authenticated user!')

        req.session.save(() => {
            res.redirect('/')
        })
    }

    static async register(req, res) {
        const {
            name,
            email,
            password,
            password_confirm
        } = req.body

        if(password != password_confirm) {
            req.flash('message', 'The password is different from confirmation password, try again.')
            res.render('register')
            return;
        }

        const userExists = await User.findOne({where: {email: email}})

        if(userExists) {
            req.flash('message', 'This email is already in use!')
            res.render('register')
            return;
        }

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            password: hashedPassword
        }

        try{
            const createdUser = await User.create(user)

            req.session.userid = createdUser.id

            req.flash('message', 'Successfully registered user.')

            req.session.save(() => {
                res.redirect('/')
            })
        } catch(err){
            console.log(err)
            req.flash('message', 'Internal Error while registering user.')
            res.render('register')
        }
    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }
}