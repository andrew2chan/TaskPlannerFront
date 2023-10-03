export function IsValidEmail(email) {
    let reg = /^[A-Z0-9+_.-]+@[A-Z0-9-]+[.][A-Z]+$/ig;
    let validEmail = reg.test(email);

    return validEmail;
}

export function CreateDateFormatArray(dateObj) {
    let d = [
        dateObj.getFullYear(),
        ('0' + (dateObj.getMonth() + 1)).slice(-2),
        ('0' + (dateObj.getDate() )).slice(-2)
    ]

    return d;
}