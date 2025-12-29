import {
    Card,
    CardBody,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { loginSchema, validateSchema } from "../../utils/validation";
import { authAPI } from "../../utils/api";
import { useAuthStore } from "../../contexts/AuthContext";

export default function LoginPage() {
    const navigate = useNavigate();
    const login = useAuthStore((s) => s.login);

    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = validateSchema(loginSchema, form);
        if (!result.success) {
            setErrors(result.errors);
            return;
        }

        try {
            setLoading(true);
            const res = await authAPI.login(result.data);

            login(
                res.data.user,
                res.data.accessToken,
                res.data.refreshToken
            );

            navigate("/dashboard");
        } catch {
            setErrors({ general: "Invalid email or password" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card
            color="transparent"
            shadow={false}
            className="mx-auto mt-24 w-96"
        >
            <Typography variant="h4" color="blue-gray">
                Login
            </Typography>

            <Typography color="gray" className="mt-1 font-normal">
                Welcome back! Enter your credentials.
            </Typography>

            <form onSubmit={handleSubmit} className="mt-8">
                <CardBody className="flex flex-col gap-6 p-0">
                    <Input
                        name="email"
                        label="Email"
                        size="lg"
                        onChange={handleChange}
                        error={!!errors.email}
                    />
                    {errors.email && <Typography color="red">{errors.email}</Typography>}

                    <Input
                        name="password"
                        type="password"
                        label="Password"
                        size="lg"
                        onChange={handleChange}
                        error={!!errors.password}
                    />
                    {errors.password && (
                        <Typography color="red">{errors.password}</Typography>
                    )}

                    {errors.general && (
                        <Typography color="red">{errors.general}</Typography>
                    )}

                    <Button type="submit" fullWidth loading={loading}>
                        Sign In
                    </Button>

                    <Typography color="gray" className="text-center font-normal">
                        Don’t have an account?{" "}
                        <Link to="/signup" className="font-medium text-gray-900">
                            Sign Up
                        </Link>
                    </Typography>
                </CardBody>
            </form>
        </Card>
    );
}
