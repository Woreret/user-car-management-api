import { z } from 'zod';

const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters')
});

type RegisterUserInput = z.infer<typeof registerSchema>;

const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'Password is required')
});

type LoginUserInput = z.infer<typeof loginSchema>;

export {
    registerSchema,
    loginSchema
}
export type{
    RegisterUserInput,
    LoginUserInput
}