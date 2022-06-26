exports.ValidateEmail = async (email) => {

    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validRegex)) {
        return true;
    }
    return false;
}

exports.ValidatePhoneNo = async (phoneNo) => {
    console.log("phone", phoneNo)
    let validRegex = /^[6-9]\d{9}$/;
    phoneNo = phoneNo.toString();
    if (phoneNo.match(validRegex)) {
        return true;
    }
    return false;
}

exports.validateAddress = async (address) => {
    console.log("address")
    let validRegex = /^[a-zA-Z0-9\s,'-]*$/;
    if (address.match(validRegex)) {
        return true;
    }
    return false;
}
