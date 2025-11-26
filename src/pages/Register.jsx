import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Container,
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    Alert,
    InputAdornment,
    IconButton,
    LinearProgress,
} from '@mui/material';
import { Visibility, VisibilityOff, PersonAddOutlined } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const getPasswordStrength = (pwd) => {
        if (!pwd) return 0;
        let strength = 0;
        if (pwd.length >= 6) strength += 25;
        if (pwd.length >= 10) strength += 25;
        if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength += 25;
        if (/\d/.test(pwd)) strength += 15;
        if (/[^a-zA-Z\d]/.test(pwd)) strength += 10;
        return Math.min(strength, 100);
    };

    const passwordStrength = getPasswordStrength(password);
    const getStrengthColor = () => {
        if (passwordStrength < 40) return 'error';
        if (passwordStrength < 70) return 'warning';
        return 'success';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!username || !email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            await register(username, email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                px: { xs: 2, sm: 0 },
                py: { xs: 2, sm: 4 },
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    elevation={10}
                    sx={{
                        p: { xs: 3, sm: 4 },
                        borderRadius: 3,
                        backdropFilter: 'blur(10px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    }}
                >
                    <Box sx={{ textAlign: 'center', mb: { xs: 2, sm: 3 } }}>
                        <Box
                            sx={{
                                display: 'inline-flex',
                                p: { xs: 1.5, sm: 2 },
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                mb: 2,
                            }}
                        >
                            <PersonAddOutlined sx={{ fontSize: { xs: 32, sm: 40 }, color: 'white' }} />
                        </Box>
                        <Typography variant="h4" fontWeight={700} gutterBottom sx={{ fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>
                            Create Account
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Join our secure file server platform
                        </Typography>
                    </Box>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            margin="normal"
                            variant="outlined"
                            autoComplete="username"
                        />
                        <TextField
                            fullWidth
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                            variant="outlined"
                            autoComplete="email"
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                            variant="outlined"
                            autoComplete="new-password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {password && (
                            <Box sx={{ mt: 1 }}>
                                <LinearProgress
                                    variant="determinate"
                                    value={passwordStrength}
                                    color={getStrengthColor()}
                                    sx={{ height: 6, borderRadius: 3 }}
                                />
                                <Typography variant="caption" color="text.secondary">
                                    Password strength: {passwordStrength < 40 ? 'Weak' : passwordStrength < 70 ? 'Medium' : 'Strong'}
                                </Typography>
                            </Box>
                        )}
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            type={showPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            margin="normal"
                            variant="outlined"
                            autoComplete="new-password"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={loading}
                            sx={{
                                mt: 3,
                                mb: 2,
                                py: 1.5,
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: 6,
                                },
                                transition: 'all 0.3s ease',
                            }}
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </Button>

                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                                Already have an account?{' '}
                                <Link
                                    to="/login"
                                    style={{
                                        color: '#667eea',
                                        textDecoration: 'none',
                                        fontWeight: 600,
                                    }}
                                >
                                    Sign In
                                </Link>
                            </Typography>
                        </Box>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
};

export default Register;
