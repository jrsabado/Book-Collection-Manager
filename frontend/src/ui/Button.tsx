import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

interface ButtonProps extends MuiButtonProps {
    className?: string;
    style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({ className, style, children, ...props }) => (
    <MuiButton className={className} style={{ margin: '10px', ...style }} {...props}>
        {children}
    </MuiButton>
);

export default Button;
