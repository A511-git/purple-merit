import React from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../contexts/AuthContext";
import { NAV_LINKS } from "../../utils/navigation";

export default function AppNavbar() {
    const [openNav, setOpenNav] = React.useState(false);
    const navigate = useNavigate();

    const { user, isAuthenticated, logout } = useAuthStore();

    React.useEffect(() => {
        window.addEventListener("resize", () => {
            if (window.innerWidth >= 960) setOpenNav(false);
        });
    }, []);

    const role = user?.role; // "admin" | "user"

    const links = !isAuthenticated
        ? NAV_LINKS.public
        : role === "admin"
            ? NAV_LINKS.admin
            : NAV_LINKS.user;

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            {links.map((item) => (
                <Typography
                    key={item.to}
                    as="li"
                    variant="small"
                    color="blue-gray"
                    className="p-1 font-normal"
                >
                    <Link to={item.to} className="flex items-center">
                        {item.label}
                    </Link>
                </Typography>
            ))}
        </ul>
    );

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
            <div className="flex items-center justify-between text-blue-gray-900">
                <Typography
                    as={Link}
                    to="/"
                    className="mr-4 cursor-pointer py-1.5 font-medium"
                >
                    Purple Merit
                </Typography>

                <div className="flex items-center gap-4">
                    <div className="mr-4 hidden lg:block">{navList}</div>

                    {isAuthenticated ? (
                        <div className="flex items-center gap-2">
                            <Typography variant="small" color="blue-gray">
                                {user.fullName} ({user.role})
                            </Typography>
                            <Button size="sm" variant="outlined" onClick={handleLogout}>
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <div className="hidden lg:flex gap-2">
                            <Button
                                variant="text"
                                size="sm"
                                onClick={() => navigate("/login")}
                            >
                                Log In
                            </Button>
                            <Button
                                variant="gradient"
                                size="sm"
                                onClick={() => navigate("/signup")}
                            >
                                Sign Up
                            </Button>
                        </div>
                    )}

                    <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 lg:hidden"
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? "✕" : "☰"}
                    </IconButton>
                </div>
            </div>

            <MobileNav open={openNav}>
                {navList}

                {isAuthenticated ? (
                    <Button fullWidth size="sm" onClick={handleLogout}>
                        Logout
                    </Button>
                ) : (
                    <div className="flex gap-2">
                        <Button fullWidth variant="text" size="sm">
                            Login
                        </Button>
                        <Button fullWidth variant="gradient" size="sm">
                            Sign Up
                        </Button>
                    </div>
                )}
            </MobileNav>
        </Navbar>
    );
}
