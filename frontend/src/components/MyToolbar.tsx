import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Container } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';

const handleMyCollectionClick = () => {
    window.location.href = "/my-collection";
};


const MyToolbar: React.FC = () => {
    return (
        <AppBar position="static" className="app-bar">
            <Container>
                <Toolbar className="toolbar">
                    <Typography variant="h6" className="title">
                        Book Collection Manager
                    </Typography>
                    <div className="nav-links">
                        <Button color="inherit" startIcon={<HomeIcon />} href="/">
                            Home
                        </Button>
                        <Button color="inherit" onClick={handleMyCollectionClick} startIcon={<CollectionsBookmarkIcon />} href="/my-collection">
                            My Collection
                        </Button>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default MyToolbar;



