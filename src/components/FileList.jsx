import { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Typography,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Chip,
    Alert,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { filesAPI } from '../services/api';

const FileList = ({ refreshTrigger }) => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [renameDialog, setRenameDialog] = useState({ open: false, file: null, newName: '' });
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        fetchFiles();
    }, [refreshTrigger]);

    const fetchFiles = async () => {
        try {
            setLoading(true);
            const response = await filesAPI.getFiles();
            setFiles(response.data);
            setError('');
        } catch (err) {
            setError('Failed to load files');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (file) => {
        try {
            const response = await filesAPI.downloadFile(file.id);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', file.original_name);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            setError('Failed to download file');
        }
    };

    const handleDelete = async (fileId) => {
        if (!window.confirm('Are you sure you want to delete this file?')) return;

        try {
            await filesAPI.deleteFile(fileId);
            fetchFiles();
        } catch (err) {
            setError('Failed to delete file');
        }
    };

    const handleRenameOpen = (file) => {
        setRenameDialog({ open: true, file, newName: file.original_name });
    };

    const handleRenameClose = () => {
        setRenameDialog({ open: false, file: null, newName: '' });
    };

    const handleRenameSubmit = async () => {
        try {
            await filesAPI.renameFile(renameDialog.file.id, renameDialog.newName);
            handleRenameClose();
            fetchFiles();
        } catch (err) {
            setError('Failed to rename file');
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    if (loading) {
        return <Typography>Loading files...</Typography>;
    }

    return (
        <Box>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {files.length === 0 ? (
                <Paper sx={{ p: { xs: 3, sm: 4 }, textAlign: 'center' }}>
                    <InsertDriveFileIcon sx={{ fontSize: { xs: 48, sm: 64 }, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                        No files uploaded yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Upload your first file to get started
                    </Typography>
                </Paper>
            ) : (
                <TableContainer component={Paper} sx={{ boxShadow: 3, overflowX: 'auto' }}>
                    <Table sx={{ minWidth: isMobile ? 300 : 650 }}>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'primary.main' }}>
                                <TableCell sx={{ color: 'white', fontWeight: 700 }}>File Name</TableCell>
                                {!isMobile && <TableCell sx={{ color: 'white', fontWeight: 700 }}>Size</TableCell>}
                                {!isMobile && <TableCell sx={{ color: 'white', fontWeight: 700 }}>Type</TableCell>}
                                {!isMobile && <TableCell sx={{ color: 'white', fontWeight: 700 }}>Upload Date</TableCell>}
                                <TableCell sx={{ color: 'white', fontWeight: 700 }} align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {files.map((file) => (
                                <TableRow
                                    key={file.id}
                                    sx={{
                                        '&:hover': { backgroundColor: 'action.hover' },
                                        transition: 'background-color 0.2s',
                                    }}
                                >
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <InsertDriveFileIcon color="primary" sx={{ fontSize: { xs: 20, sm: 24 } }} />
                                            <Typography variant="body2" sx={{ fontSize: { xs: '0.813rem', sm: '0.875rem' }, wordBreak: 'break-word' }}>
                                                {file.original_name}
                                            </Typography>
                                        </Box>
                                        {isMobile && (
                                            <Box sx={{ mt: 0.5, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                                <Typography variant="caption" color="text.secondary">
                                                    {formatFileSize(file.size)}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">•</Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {formatDate(file.upload_date)}
                                                </Typography>
                                            </Box>
                                        )}
                                    </TableCell>
                                    {!isMobile && <TableCell>{formatFileSize(file.size)}</TableCell>}
                                    {!isMobile && (
                                        <TableCell>
                                            <Chip label={file.mimetype || 'Unknown'} size="small" variant="outlined" />
                                        </TableCell>
                                    )}
                                    {!isMobile && <TableCell>{formatDate(file.upload_date)}</TableCell>}
                                    <TableCell align="right">
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleDownload(file)}
                                            title="Download"
                                            size={isMobile ? "small" : "medium"}
                                        >
                                            <DownloadIcon fontSize={isMobile ? "small" : "medium"} />
                                        </IconButton>
                                        <IconButton
                                            color="info"
                                            onClick={() => handleRenameOpen(file)}
                                            title="Rename"
                                            size={isMobile ? "small" : "medium"}
                                        >
                                            <EditIcon fontSize={isMobile ? "small" : "medium"} />
                                        </IconButton>
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDelete(file.id)}
                                            title="Delete"
                                            size={isMobile ? "small" : "medium"}
                                        >
                                            <DeleteIcon fontSize={isMobile ? "small" : "medium"} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Rename Dialog */}
            <Dialog open={renameDialog.open} onClose={handleRenameClose}>
                <DialogTitle>Rename File</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="New File Name"
                        fullWidth
                        value={renameDialog.newName}
                        onChange={(e) => setRenameDialog({ ...renameDialog, newName: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRenameClose}>Cancel</Button>
                    <Button onClick={handleRenameSubmit} variant="contained">
                        Rename
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default FileList;
