const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

//Item model
const User = require('../../models/User')

//POST api/users
router.post('/', (req, res) => {
    const {name, email, password} = req.body

    //Simple validation
    if (!name || !email || !password) {
        return res.status(400).json({message: "Please enter all fields"})
    }

    //Check for existing user
    User.findOne({email: email})
        .then(user => {
            if (user) {
                return res.status(400).json({message: "User already exists"})
            }

            const newUser = new User({
                name,
                email,
                password
            })

            //Create salt and hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err
                    newUser.password = hash
                    newUser.save()
                        .then(user => {
                            res.json({
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        })
                })
            })
        })
})

module.exports = router