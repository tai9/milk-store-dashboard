// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" component={Link} href="https://milk-store-dashboard.vercel.app/" target="_blank" underline="hover">
            milk-store-dashboard.vercel.app
        </Typography>
        <Typography variant="subtitle2" component={Link} href="https://milk-store-dashboard.vercel.app/" target="_blank" underline="hover">
            &copy; NotFound Team
        </Typography>
    </Stack>
);

export default AuthFooter;
