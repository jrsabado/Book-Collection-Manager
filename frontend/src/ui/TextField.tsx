import React from 'react';
import { TextField as MuiTextField, OutlinedTextFieldProps, StandardTextFieldProps, FilledTextFieldProps } from '@mui/material';

type TextFieldVariants = 'filled' | 'outlined' | 'standard';

type TextFieldProps<V extends TextFieldVariants = 'outlined'> = V extends 'filled'
    ? FilledTextFieldProps
    : V extends 'standard'
    ? StandardTextFieldProps
    : OutlinedTextFieldProps;

interface CustomTextFieldProps extends TextFieldProps {
    className?: string;
    style?: React.CSSProperties;
}

const TextField: React.FC<CustomTextFieldProps> = ({ className, style, ...props }) => (
    <MuiTextField className={className} style={{ margin: '10px 0', ...style }} {...props} />
);

export default TextField;
