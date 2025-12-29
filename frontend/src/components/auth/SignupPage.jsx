import {
    Card,
    CardBody,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { signupSchema, validateSchema } from "../../utils/validation";
import { authAPI } from "../../utils/api";

export default function SignupPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = validateSchema(signupSchema, form);
        if (!result.success) {
            setErrors(result.errors);
            return;
        }

        try {
            setLoading(true);
            await authAPI.signup(result.data);
            navigate("/login");
        } catch {
            setErrors({ general: "Signup failed" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card
            color="transparent"
            shadow={false}
            className="mx-auto mt-20 w-96"
        >
            <Typography variant="h4" color="blue-gray">
                Sign Up
            </Typography>

            <Typography color="gray" className="mt-1 font-normal">
                Nice to meet you! Enter your details to register.
            </Typography>

            <form onSubmit={handleSubmit} className="mt-8">
                <CardBody className="flex flex-col gap-6 p-0">
                    <Input
                        name="fullName"
                        label="Full Name"
                        size="lg"
                        onChange={handleChange}
                        error={!!errors.fullName}
                    />
                    {errors.fullName && (
                        <Typography color="red">{errors.fullName}</Typography>
                    )}

                    <Input
                        name="email"
                        label="Email"
                        size="lg"
                        onChange={handleChange}
                        error={!!errors.email}
                    />
                    {errors.email && (
                        <Typography color="red">{errors.email}</Typography>
                    )}

                    <Input
                        name="password"
                        type="password"
                        label="Password"
                        size="lg"
                        onChange={handleChange}
                        error={!!errors.password}
                    />

                    <Input
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        size="lg"
                        onChange={handleChange}
                        error={!!errors.confirmPassword}
                    />
                    {errors.confirmPassword && (
                        <Typography color="red">{errors.confirmPassword}</Typography>
                    )}

                    <Checkbox
                        label={
                            <Typography variant="small" color="gray" className="font-normal">
                                I agree to the Terms and Conditions
                            </Typography>
                        }
                    />

                    {errors.general && (
                        <Typography color="red">{errors.general}</Typography>
                    )}

                    <Button type="submit" fullWidth loading={loading}>
                        Sign Up
                    </Button>

                    <Typography color="gray" className="text-center font-normal">
                        Already have an account?{" "}
                        <Link to="/login" className="font-medium text-gray-900">
                            Sign In
                        </Link>
                    </Typography>
                </CardBody>
            </form>
        </Card>
    );
}
