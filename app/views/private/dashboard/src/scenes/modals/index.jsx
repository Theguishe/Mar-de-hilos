import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material';
import Typography from '@mui/material';


export function UpdateClient() {
    return {
        <div>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-title" variant="h2" component="h2">
                        UPDATE CLIENT
                    </Typography>
                </Box>
                <Box>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                </Box>
            </Modal>
        </div>
    }
};