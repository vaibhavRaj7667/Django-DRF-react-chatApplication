import React, { useState } from 'react';
import '../stylesheet/sidebar.css';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';

const SideBar = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        const token = localStorage.getItem('access_token');
        
        axios.post('http://127.0.0.1:8000/logout/', {}, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            console.log(response.data.message);
        })
        .catch(error => {
            console.error('Logout failed:', error);
        });

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        
        // Show snackbar and navigate after short delay
        setOpen(true);
        setTimeout(() => {
            navigate('/');
        }, 1500);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={1000}
                onClose={handleClose}
                message="Logout Successful"
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            />
            <div className='sidebar'>


                <div>
                    <Button variant='contained'>request</Button>
                </div>



                <div className='logout'>
                    <Button
                        size='small'
                        variant='contained'
                        color='error'
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </div>


                
            </div>
        </>
    );
};

export default SideBar;
