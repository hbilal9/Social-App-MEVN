const yup = require('yup');

const registerSchema = yup.object({
    username: yup.string().required(),
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required('Password is required'),
    confirmed_password: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
})

module.exports = registerSchema;