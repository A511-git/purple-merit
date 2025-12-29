import { Outlet } from "react-router-dom";
import AppNavbar from "../components/common/Navbar";

export default function Layout() {
    return (
        <>
            <AppNavbar />
            <Outlet />
        </>
    );
}
