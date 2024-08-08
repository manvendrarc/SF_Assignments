export interface User {
    id: string;
    firstName: string,
    middleName?: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    role: string,
    address: string
}

// {
//     "firstName": "Manvendra",
//     "middleName?": "Singh",
//     "lastName": "Chauhan",
//     "email": "manvendra@gmail.com",
//     "phoneNumber": "XXXXXXXXXX",
//     "role": "Intern",
//     "address": "Gurugram"
// }