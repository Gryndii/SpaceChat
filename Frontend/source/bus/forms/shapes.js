//Core
import { object, string, boolean, ref } from 'yup';

export const login = {
    shape: {
        email:    '',
        password: '',
        remember: true,
    },
    schema: object().shape({
        email: string()
            .email()
            .required(),
        password: string()
            .min(5)
            .required(),
        remember: boolean()
            .required(),
    }),
};

export const signup = {
    shape: {
        handle:          '',
        email:           '',
        password:        '',
        confirmPassword: '',
        remember:        true,
    },
    schema: object().shape({
        handle: string()
            .min(4)
            .max(15)
            .required(),
        email: string()
            .email()
            .required(),
        password: string()
            .min(5)
            .required(),
        confirmPassword: string()
            .oneOf([ ref('password'), null ], 'Passwords must match'),
        remember: boolean()
            .required(),
    }),
};

export const postCreator = {
    shape: {
        text: '',
    },
    schema: object().shape({
        text: string()
            .min(1)
            .required(),
    }),
};

export const updateUserForm = {
    schema: object().shape({
        bio:      string(),
        location: string(),
        website:  string(),
    }),
};
