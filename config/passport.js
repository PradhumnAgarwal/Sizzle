const localStrategy = require("passport-local").Strategy
const db = require("../db")
const bcrypt = require("bcrypt")

function init(passport) {
    passport.use(new localStrategy({ usernameField: 'email' }, async (email, password, done) => {
        const customer = await db.query("SELECT * FROM customers WHERE c_email = $1", [email])
        if (!customer) {
            return done(null, false, { message: 'no user found' })
        }
        bcrypt.compare(password, customer.c_password).then(match => {
            if (match) {
                return done(null, user, { message: 'Logged in Successfuly' })
            }
            return done(null, false, { message: 'Invalid Username or Password' })
        }).catch(err => {
            return done(null, false, { message: 'Something Went Wrong' })
        })
    }))

    passport.serializeUser(()=>{
        
    })
}

module.exports = init