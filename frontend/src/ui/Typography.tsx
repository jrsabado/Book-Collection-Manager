import React from 'react';
import { Typography as MuiTypography, TypographyProps as MuiTypographyProps } from '@mui/material';

interface TypographyProps extends MuiTypographyProps {
    className?: string;
    style?: React.CSSProperties;
}

const Typography: React.FC<TypographyProps> = ({ className, style, children, ...props }) => (
    <MuiTypography className={className} style={{ margin: '20px 0', ...style }} {...props}>
        {children}
    </MuiTypography>
);

export default Typography;
