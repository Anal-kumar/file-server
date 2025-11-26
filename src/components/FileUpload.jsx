import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
    Box,
    Paper,
    Typography,
    LinearProgress,
    Chip,
    IconButton,
    Alert,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { filesAPI } from '../services/api';

const FileUpload = ({ onUploadSuccess }) => {
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (acceptedFiles) => {
            setSelectedFiles(acceptedFiles);
            setError('');
            setSuccess('');
        },
        multiple: true,
    });

    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            setError('Please select files to upload');
            return;
        }

        const formData = new FormData();
        selectedFiles.forEach((file) => {
            formData.append('files', file);
        });

        setUploading(true);
        setError('');
        setSuccess('');

        try {
            await filesAPI.upload(formData, (progressEvent) => {
                const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadProgress(progress);
            });

            setSuccess(`Successfully uploaded ${selectedFiles.length} file(s)`);
            setSelectedFiles([]);
            setUploadProgress(0);
            if (onUploadSuccess) onUploadSuccess();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to upload files');
        } finally {
            setUploading(false);
        }
    };

    const removeFile = (index) => {
        setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <Box>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            <Paper
                {...getRootProps()}
                sx={{
                    p: 4,
                    textAlign: 'center',
                    cursor: 'pointer',
                    border: '2px dashed',
                    borderColor: isDragActive ? 'primary.main' : 'grey.300',
                    backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        borderColor: 'primary.main',
                        backgroundColor: 'action.hover',
                    },
                }}
            >
                <input {...getInputProps()} />
                <CloudUploadIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                    {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    or click to select files
                </Typography>
            </Paper>

            {selectedFiles.length > 0 && (
                <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        Selected Files ({selectedFiles.length})
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        {selectedFiles.map((file, index) => (
                            <Chip
                                key={index}
                                label={`${file.name} (${formatFileSize(file.size)})`}
                                onDelete={() => removeFile(index)}
                                deleteIcon={<DeleteIcon />}
                                color="primary"
                                variant="outlined"
                            />
                        ))}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <button
                            onClick={handleUpload}
                            disabled={uploading}
                            style={{
                                padding: '10px 24px',
                                fontSize: '16px',
                                fontWeight: 600,
                                color: '#fff',
                                background: uploading ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: uploading ? 'not-allowed' : 'pointer',
                                transition: 'transform 0.2s',
                            }}
                            onMouseEnter={(e) => !uploading && (e.target.style.transform = 'scale(1.05)')}
                            onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                        >
                            {uploading ? 'Uploading...' : 'Upload Files'}
                        </button>
                        {uploading && (
                            <Box sx={{ flexGrow: 1 }}>
                                <LinearProgress variant="determinate" value={uploadProgress} />
                                <Typography variant="caption" color="text.secondary">
                                    {uploadProgress}%
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default FileUpload;
