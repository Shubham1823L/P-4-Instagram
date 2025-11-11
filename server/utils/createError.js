const createError = (status, code, message) => {
    const err = new Error(message)
    err.status = status
    err.code = code

    return err
}
export default createError