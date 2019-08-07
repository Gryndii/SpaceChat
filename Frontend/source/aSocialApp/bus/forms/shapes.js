//Core
import { object, string, boolean } from 'yup';

export const login = {
    shape: {
        email: '',
        password: '',
        remember: false,
    },
    schema: object().shape({
        email: string()
            .email()
            .required(),
        password: string()
            .min(5)
            .required(),
        remember: boolean(),
    }),
};
