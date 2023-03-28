const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const app = express()
const port = 8000
app.use(bodyParser.json())

// Verifies user login and sends JWT
app.post('/login', (req, res) => {
    const user = req.body.username
    const pwd = req.body.password

    if (user === 'zama' && pwd === 'secret') {
        let payload = {
            'name': user,
            'admin': true
        }
        const token = jwt.sign(JSON.stringify(payload), 'jwt-secret', {
            algorithm: 'HS256'
        })
        res.send({
            'token': token
        })

    } else {
        res.status(403).send({
            'err': 'Incorrect login!'
        })
    }
})

app.get('/resource', (req, res) => {
    const auth = req.headers['authorization']
    // Use index 1 which is the token part After the Bearer
    const token = auth.split(' ')[1]
    try {
        const decoded = jwt.verify(token, 'jwt-secret')
        res.send({
            'msg': `Hello, ${decoded.name}! Your JSON Web Token has been verified.`
        })
    } catch (err) {
        res.status(401).send({
            'err': 'Bad JWT!'
        })
    }
})


// (admin:true) - JWT for reviewer:
// Bearer eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiemFtYSIsImFkbWluIjp0cnVlfQ.758eGOxM1vRHKCqtjN-JslEooXTBfIm_8ysyQ6SBetY
app.get('/admin_resource', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1]
    try {
        const decoded = jwt.verify(token, 'jwt-secret')
        // If successfully decoded, check if "admin" property is true
        if (decoded.admin) {
            res.send({
                'msg': 'Success!'
            })
        } else {
            res.status(403).send({
                'msg': 'Your JWT was verified, but you are not an admin.'
            })
        }
    } catch (e) {
        res.sendStatus(401)
    }
})

app.listen(port, () => console.log(
    `Now listening at http://localhost:${port}`))
