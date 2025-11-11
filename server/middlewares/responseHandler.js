const successHandler = (req, res, next) => {
    res.success = (res, status, data, message) => {
        res.status(status).json({ success: true, data, message })
    }
    res.fail = (res, status, code, message) => {
        res.status(status).json({ sucess: false, code, message })
    }
}

export default successHandler