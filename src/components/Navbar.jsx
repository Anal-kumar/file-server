import { AppBar, Toolbar, Typography, Button, Box, Avatar, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';
import CloudIcon from '@mui/icons-material/Cloud';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <Toolbar>
                <CloudIcon sx={{ mr: { xs: 1, sm: 2 }, fontSize: { xs: 28, sm: 32 } }} />
                <Typography
                    variant={isMobile ? "subtitle1" : "h6"}
                    component="div"
                    sx={{ flexGrow: 1, fontWeight: 700, fontSize: { xs: '1rem', sm: '1.25rem' } }}
                >
                    {isMobile ? 'File Server' : 'Secure File Server'}
                </Typography>
                {user && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
                        <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: { xs: 32, sm: 40 }, height: { xs: 32, sm: 40 } }}>
                            {user.username?.charAt(0).toUpperCase()}
                        </Avatar>
                        {!isMobile && (
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                {user.username}
                            </Typography>
                        )}
                        {isMobile ? (
                            <IconButton
                                color="inherit"
                                onClick={handleLogout}
                                size="small"
                            >
                                <LogoutIcon />
                            </IconButton>
                        ) : (
                            <Button
                                color="inherit"
                                onClick={handleLogout}
                                startIcon={<LogoutIcon />}
                                sx={{
                                    ml: 2,
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                    },
                                }}
                            >
                                Logout
                            </Button>
                        )}
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
