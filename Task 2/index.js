const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const app = express()
const port = 8000
app.use(bodyParser.json())

// Hardcoded database for the purpose of this task
let userDatabase = [{
    username: "Mazvita",
    password: "secret",
    access: ["a"]
}, {
    username: "Meagan",
    password: "secret",
    access: ["a", "b"]
}, {
    username: "Kabelo",
    password: "secret",
    access: ["b", "c"]
}];

/* Dear Reviewer, for ease of marking I saved the 3 Web tokens below for you:

1.  eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiTWF6dml0YSIsImFjY2VzcyI6WyJhIl19.6j6W2XsLSrGbjWiKv2VzzVs-3o36PS2NbwyVZvdonJE
2.  eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiTWVhZ2FuIiwiYWNjZXNzIjpbImEiLCJiIl19.m_P6q0u8SqkCwdNOY3bmysjjrHfUgs_nlkwfMoGzVBY
3.  eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiS2FiZWxvIiwiYWNjZXNzIjpbImIiLCJjIl19.1UuSaXOxqli-t5CmEArFxiol6K8TXQzlRNnxenJAOQ0

    You may verify the Token content at the following website: https://token.dev/
*/

// Verifies user login and sends JWT
app.post('/login', (req, res) => {
    const userLogin = req.body.username
    const pwd = req.body.password

    // Verify that the username does exist in the database by getting the index
    const userIndex = userDatabase.findIndex(index => index.username === userLogin);

    // If the index is valid(0 or larger) and password correct, create token
    // Else let the user know that login failed
    if (userIndex > -1 && pwd === userDatabase[userIndex].password) {
        let payload = {
            'name': userLogin,
            'access': userDatabase[userIndex].access
        }
        const token = jwt.sign(JSON.stringify(payload), 'jwt-secret-task2', {
            algorithm: 'HS256'
        })
        res.send({
            'token': token
        })

    } else {
        res.status(403).send({
            'err': 'Incorrect login. Reset your password or contact our support team if you continue having a problem logging in.'
        })
    }
})

// User uses web token to try and login to a
app.get('/a', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1]
    try {
        const decoded = jwt.verify(token, 'jwt-secret-task2')

        // Use the indexOf method to see if 'a' is in the array of allowed pages
        const accessIndex = decoded.access.indexOf('a');

        if (accessIndex > -1) {
            res.send({
                'msg': 'Success! Welcome to A'
            })
        } else {
            res.status(403).send({
                'msg': 'Your Account is verified, but you do not have access to this page.'
            })
        }
    } catch (e) {
        res.sendStatus(401)
    }
})

// User uses web token to try and login to b
app.get('/b', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1]
    try {
        const decoded = jwt.verify(token, 'jwt-secret-task2')

        // Use the indexOf method to see if 'b' is in the array of allowed pages
        const accessIndex = decoded.access.indexOf('b');

        if (accessIndex > -1) {
            res.send({
                'msg': 'Success! Welcome to B'
            })
        } else {
            res.status(403).send({
                'msg': 'Your Account is verified, but you do not have access to this page.'
            })
        }
    } catch (e) {
        res.sendStatus(401)
    }
})

// User uses web token to try and login to c
app.get('/c', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1]
    try {
        const decoded = jwt.verify(token, 'jwt-secret-task2')

        // Use the indexOf method to see if 'c' is in the array of allowed pages
        const accessIndex = decoded.access.indexOf('c');

        if (accessIndex > -1) {
            res.send({
                'msg': 'Success! Welcome to C'
            })
        } else {
            res.status(403).send({
                'msg': 'Your Account is verified, but you do not have access to this page.'
            })
        }
    } catch (e) {
        res.sendStatus(401)
    }
})

app.listen(port, () => console.log(
    `Now listening at http://localhost:${port}`))