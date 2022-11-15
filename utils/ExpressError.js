class ExpressError extends Error{
    constructor(msg, statusCode){
        super()
        this.message = this.message
        this.statusCode = statusCode
    }
}


module.exports = ExpressError