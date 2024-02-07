export const validateRequired = (requiredFields) => {
    requiredFields.forEach((field) => {
        const inputField = document.getElementById(field);
        if (inputField.value === '') {
            inputField.classList.add('is-invalid');
        } else {
            inputField.classList.remove('is-invalid');
        }
    });
}

export const validatePhone = (phoneInput, phoneValue) => {
    if (!/^[6-9]\d{9}$/.test(phoneValue)) {
        phoneInput.classList.add('is-invalid');
    } else {
        phoneInput.classList.remove('is-invalid');
    }
}

// export const removeValidation = () => {
//     const inValid = document.querySelectorAll('.is-invalid');
//     inValid.forEach(element => {
//         element.classList.remove('is-invalid');
//     });
// }   