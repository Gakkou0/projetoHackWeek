import { useState } from 'react';
import { Modal, Typography, Select, MenuItem, Checkbox, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Box from '@mui/material/Box';
import defaultTheme from '../DefaultTheme/DefaultTheme';
import { ThemeProvider } from '@emotion/react';


const ModalFormMeetingData = ({meeting, handleClose}) => {
  const [open, setOpen] = useState(true);

  const handleCloses = () => {
    setOpen(false);
  };

  const openModalFromFunction = () => {
    setOpen(true);
  };


  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        {open && (
          <Modal
            open={open}
            onClose={handleClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              style={{
                color: 'aliceblue',
                backgroundColor: '#272727',
                borderRadius: '5px',
              }}
            >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}>
            <h2>Detalhes da Reunião</h2>
            <form>
              <Typography variant="body1">
                Título: {meeting?.title}
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Typography variant="body1">
                Data e hora da reunião: {meeting?.datetime
                  ? new Date(meeting.datetime).toLocaleString()
                  : 'No Meeting Datetime'}
              </Typography>
              </LocalizationProvider>
              <Typography variant="body1">
                Local: {meeting?.location}
              </Typography>
              <Typography variant="body1">
                Projeto: {meeting?.project}
              </Typography>
              <Typography variant="body1">
                Observações: {meeting?.observations}
              </Typography>
              <div>
                <Button variant="contained" color="primary" onClick={handleClose}>
                  Fechar
                </Button>
              </div>

            </form>
          </div>
          </Box>
        </Modal>
      )}
    </ThemeProvider>
    </div>
  );
};

export default ModalFormMeetingData;
