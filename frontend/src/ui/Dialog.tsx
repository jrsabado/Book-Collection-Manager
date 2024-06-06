import React from 'react';
import { Dialog as MuiDialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

interface DialogProps {
    open: boolean;
    title: string;
    content: string | React.ReactNode;
    actions: React.ReactNode;
    onClose: () => void;
}

const Dialog: React.FC<DialogProps> = ({ open, title, content, actions, onClose }) => (
    <MuiDialog open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            {typeof content === 'string' ? <DialogContentText>{content}</DialogContentText> : content}
        </DialogContent>
        <DialogActions>
            {actions}
        </DialogActions>
    </MuiDialog>
);

export default Dialog;
