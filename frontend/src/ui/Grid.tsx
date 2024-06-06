import React from 'react';
import { Grid as MuiGrid, GridProps as MuiGridProps } from '@mui/material';

interface GridProps extends MuiGridProps {
    className?: string;
    style?: React.CSSProperties;
}

const Grid: React.FC<GridProps> = ({ className, style, children, ...props }) => (
    <MuiGrid className={className} style={{ padding: '10px', ...style }} {...props}>
        {children}
    </MuiGrid>
);

export default Grid;
