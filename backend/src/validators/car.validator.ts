import { z } from 'zod';

const registerCar = z.object({
    brand: z.string().min(2, 'Brand must be at least 2 characters'),
    model: z.string().min(2, 'Model must be at least 2 characters'),
    year: z.coerce
        .number()
        .int('Year must be an integer')
        .min(1980, 'Year must be 1980 or later')
        .max(new Date().getFullYear(), 'Year cannot be in the future')
});

type RegisterCarInput = z.infer<typeof registerCar>;

const updateCarScheme = registerCar.partial();

type UpdateCarInput = z.infer<typeof updateCarScheme>;

export {
    registerCar,
    updateCarScheme
};

export type {
    RegisterCarInput,
    UpdateCarInput
};