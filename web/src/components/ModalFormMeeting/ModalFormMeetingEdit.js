import { useState } from 'react';
import { Modal, TextField, Select, MenuItem, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Box from '@mui/material/Box';
import defaultTheme from '../DefaultTheme/DefaultTheme';
import { ThemeProvider } from '@emotion/react';

import { useMutation, gql } from '@apollo/client';

const UPDATE_MEETING_MUTATION = gql`
  mutation UpdateMeeting($id: ID!, $input: MeetingInput!) {
    updateMeeting(id: $id, input: $input) {
      id
      title
      datetime
      location
      project
      observations
    }
  }
`;

const ModalFormMeetingEdit = ({ meeting, handleClose }) => {
  const [open, setOpen] = useState(true);
  const [editedMeeting, setEditedMeeting] = useState({
    title: meeting.title,
    datetime: meeting.datetime,
    location: meeting.location,
    project: meeting.project,
    observations: meeting.observations,
  });

  const projects = [
    { value: '1', label: 'Projeto 1' },
    { value: '2', label: 'Projeto 2' },
  ];

  const handleCloses = () => {
    setOpen(false);
  };

  const openModalFromFunction = () => {
    setOpen(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedMeeting((prevMeeting) => ({
      ...prevMeeting,
      [name]: value,
    }));
  };

  const [updateMeeting] = useMutation(UPDATE_MEETING_MUTATION);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateMeeting({
        variables: {
          id: meeting.id,
          input: editedMeeting,
        },
      });

      handleClose();
    } catch (error) {
      console.error('Erro ao atualizar o encontro:', error);
    }
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
                }}
              >
                <h2>Detalhes da Reunião</h2>
                <form onSubmit={handleSubmit}>
                  <TextField
                    name="title"
                    label="Título"
                    value={editedMeeting.title}
                    onChange={handleInputChange}
                    required
                  />
                  <br />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TextField
                      name="datetime"
                      label="Data e hora da reunião"
                      value={
                        editedMeeting.datetime
                          ? new Date(editedMeeting.datetime).toLocaleString()
                          : 'No Meeting Datetime'
                      }
                      onChange={handleInputChange}
                    />
                    <br />
                  </LocalizationProvider>
                  <TextField
                    name="location"
                    label="Local"
                    value={editedMeeting.location}
                    onChange={handleInputChange}
                  />
                  <br />
                  <Select
                    name="project"
                    label="Projeto"
                    value={editedMeeting.project}
                    onChange={handleInputChange}
                  >
                    {projects.map((project) => (
                      <MenuItem key={project.value} value={project.value}>
                        {project.label}
                      </MenuItem>
                    ))}
                  </Select>
                  <br />
                  <TextField
                    name="observations"
                    label="Observações"
                    value={editedMeeting.observations}
                    onChange={handleInputChange}
                  />
                  <br />
                  <div>
                    <Button type="submit" variant="contained" color="primary">
                      Atualizar
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleClose}>
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

export default ModalFormMeetingEdit;
