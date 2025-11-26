import { useState } from 'react';
import { Container, Box, Typography, Paper, Grid, Divider } from '@mui/material';
import Navbar from '../components/Navbar';
import FileUpload from '../components/FileUpload';
import FileList from '../components/FileList';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const { user } = useAuth();

    const handleUploadSuccess = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
            <Navbar />

            <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 3, md: 4 }, px: { xs: 2, sm: 3 } }}>
                {/* Welcome Section */}
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 2, sm: 3, md: 4 },
                        mb: { xs: 2, sm: 3, md: 4 },
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        borderRadius: 3,
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 }, flexDirection: { xs: 'column', sm: 'row' }, textAlign: { xs: 'center', sm: 'left' } }}>
                        <CloudQueueIcon sx={{ fontSize: { xs: 40, sm: 48 } }} />
                        <Box>
                            <Typography variant="h4" fontWeight={700} gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.125rem' } }}>
                                Welcome, {user?.username}!
                            </Typography>
                            <Typography variant="body1" sx={{ opacity: 0.9, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                                Manage your files securely in the cloud
                            </Typography>
                        </Box>
                    </Box>
                </Paper>

                {/* Upload Section */}
                <Paper elevation={2} sx={{ p: { xs: 2, sm: 3, md: 4 }, mb: { xs: 2, sm: 3, md: 4 }, borderRadius: 3 }}>
                    <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: { xs: 2, sm: 3 }, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                        Upload Files
                    </Typography>
                    <FileUpload onUploadSuccess={handleUploadSuccess} />
                </Paper>

                <Divider sx={{ my: { xs: 2, sm: 3, md: 4 } }} />

                {/* Files Section */}
                <Box>
                    <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: { xs: 2, sm: 3 }, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                        My Files
                    </Typography>
                    <FileList refreshTrigger={refreshTrigger} />
                </Box>
            </Container>
        </Box>
    );
};

export default Dashboard;
