const validation = (schema) => async (req, res, next) => {
    const data = req.body;
    try {
        await schema.validate(data, { abortEarly: false });
        next();
    } catch (error) {
        res.status(422).json({errors: error.inner})
    }
}

module.exports = validation;