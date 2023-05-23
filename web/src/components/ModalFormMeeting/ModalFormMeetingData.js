import { useState } from 'react';
import { Modal, Typography, Select, MenuItem, Checkbox, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import '../../modal.css';

const ModalFormMeetingData = ({meeting}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const openModalFromFunction = () => {
    setOpen(true);
  };

  return (
    <div
    >
      {open && (
        <Modal open={open} onClose={handleClose}>
          <div className="modal">
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
        </Modal>
      )}
      <Button variant="contained" color="primary" onClick={openModalFromFunction}>
        Abrir Modal
      </Button>
    </div>
  );
};

export default ModalFormMeetingData;
