const Authentication = require("../models/authentication");

// find user ID
exports.findUser = async (name, birthday, phone) => await Authentication.findOne({
    where: {
        name: name,
        birthday: birthday,
        phone: phone
    }
})

// create authentication
exports.createAuthentication = async (name, email, bitrh, phone, sex, nation, userId) => await Authentication.create({
    name: name,
    email: email,
    birthday: bitrh,
    phone: phone,
    sex: sex,
    nation: nation,
    userId: userId
});

exports.readAuth = async (no) => await Authentication.findOne({
    where: {
        userId: no
    }
})