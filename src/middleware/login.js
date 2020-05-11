export const checkLogin = (req, res, next) => {
    let { body } = req

    if (body) {
        const user = body.user === 'scesi' ? true : false
        const pass = body.password === '1234' ? true : false
        console.log("step: middleware")
        if (user && pass) {
            req.body = { msg: 'autorizdo' }
            next()
        }
        else {
            body = { msg: 'no autorizdo' }
            res.status(403).send(body)
        }
    }
}
