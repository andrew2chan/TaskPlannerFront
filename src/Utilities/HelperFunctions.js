// checks if the email is valid
export function IsValidEmail(email) {
    let reg = /^[A-Z0-9+_.-]+@[A-Z0-9-]+[.][A-Z]+$/ig;
    let validEmail = reg.test(email);

    return validEmail;
}

// creates the date array to be converted to UTC time
export function CreateDateFormatArray(dateObj) {
    let d = [
        dateObj.getFullYear(),
        ('0' + (dateObj.getMonth() + 1)).slice(-2),
        ('0' + (dateObj.getDate() )).slice(-2)
    ]

    return d;
}