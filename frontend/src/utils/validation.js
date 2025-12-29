import { z } from 'zod';

// Shared field schemas
const emailSchema = z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format');

const passwordSchema = z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number');

const fullNameSchema = z
    .string()
    .min(1, 'Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name must not exceed 50 characters');

// Auth Schemas
export const loginSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, 'Password is required'),
});

export const signupSchema = z
    .object({
        fullName: fullNameSchema,
        email: emailSchema,
        password: passwordSchema,
        confirmPassword: z.string().min(1, 'Confirm password is required'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export const changePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, 'Current password is required'),
        newPassword: passwordSchema,
        confirmPassword: z.string().min(1, 'Confirm password is required'),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

// Profile Schemas
export const updateProfileSchema = z.object({
    fullName: fullNameSchema,
    email: emailSchema,
});

// Helper function to validate and get errors
export const validateSchema = (schema, data) => {
    try {
        const validated = schema.parse(data);
        return { success: true, data: validated, errors: {} };
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errors = {};
            error.errors.forEach((err) => {
                const path = err.path[0];
                errors[path] = err.message;
            });
            return { success: false, data: null, errors };
        }
        return { success: false, data: null, errors: { general: 'Validation failed' } };
    }
};
