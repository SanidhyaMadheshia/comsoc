import { Link, Outlet } from "react-router-dom";

export function RootLayout() {
      return(
        <div>
            <Link to='/booking-session'>book session</Link>
            <Outlet />
        </div>
    );
}