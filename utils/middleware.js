
const validator = require('./validate');

const cwagSecurity = (req, res, next) => {
    const validationRule = {
        styleName: "required|string",
        styleImages: "required|string",
        styleDescription: "required|string",
        styleColor: "required|string",
        modelDescription: "required|string|min:3|max:300",
        stylePrice: "required|string|max:3",
        styleDetails: "required|string",
        quantiy: "required|integer",
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

module.exports = { 
    cwagSecurity
}