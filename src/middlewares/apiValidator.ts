import { ObjectSchema } from 'joi';

export const validate = (schemas: {
    params?: ObjectSchema,
    body?: ObjectSchema,
    query?: ObjectSchema
}) => {
    return (req: any, res: any, next: any) => {
        const validationErrors: string[] = [];

        if (schemas.params) {
            const { error } = schemas.params.validate(req.params, { abortEarly: false });
            if (error) {
                validationErrors.push(...error.details.map(err => err.message));
            }
        }

        if (schemas.query) {
            const { error } = schemas.query.validate(req.query, { abortEarly: false });
            if (error) {
                validationErrors.push(...error.details.map(err => err.message));
            }
        }

        if (schemas.body) {
            const { error } = schemas.body.validate(req.body, { abortEarly: false });
            if (error) {
                validationErrors.push(...error.details.map(err => err.message));
            }
        }

        if (validationErrors.length > 0) {
            return res.status(400).json({
                errors: validationErrors,
            });
        }

        next();
    };
};

export default validate;
