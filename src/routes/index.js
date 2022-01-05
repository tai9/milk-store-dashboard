import { useLocation, useNavigate, useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import config from 'config';

// third party
import cookies from 'js-cookie';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const location = useLocation();
    const navigate = useNavigate();

    const isLoggedIn = Boolean(cookies.get('token'));
    const routes = isLoggedIn ? MainRoutes : AuthenticationRoutes;
    const { children } = routes;

    const isNotFound = children.findIndex((x) => location.pathname.includes(x.path)) === -1;
    if (isNotFound) navigate('/');

    return useRoutes([routes], config.basename);
}
