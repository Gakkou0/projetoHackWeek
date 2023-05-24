import React, { useState } from 'react';
import { Modal, TextField, Button, Select, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import defaultTheme from '../DefaultTheme/DefaultTheme';
import { ThemeProvider } from '@emotion/react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'dayjs/locale/pt-br';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';

const CREATE_MEETING_MUTATION = gql`
  mutation CreateMeetingMutation($input: CreateMeetingInput!) {
    createMeeting(input: $input) {
      id
      title
      datetime
      advisorId
      # coadvisor
      # student
      observations
      location
      studentAgreement
      advisorAgreement
    }
  }
`;

const USERS_QUERY = gql`
  query FindAllUser {
    users {
      id
      name
      userType
    }
  }
`;

const ModalFormMeetingCreate = ({ handleClose, onSave }) => {
  const [open, setOpen] = useState(true);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    datetime: '',
    advisorId: '',
    coadvisorId: '',
    studentId: '',
    observations: '',
    location: '',
    studentAgreement: false,
    advisorAgreement: false,
  });
  const [createMeeting] = useMutation(CREATE_MEETING_MUTATION);
  const { loading, error, data } = useQuery(USERS_QUERY);

  console.log(data);

  const handleCloses = () => {
    setOpen(false);
    window.location.reload();
  };

  const openModalFromFunction = () => {
    setOpen(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewMeeting((prevMeeting) => ({
      ...prevMeeting,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(newMeeting);
      const { data } = await createMeeting({
        variables: {
          input: {
            title: newMeeting.title,
            datetime: newMeeting.datetime,
            observations: newMeeting.observations,
            location: newMeeting.location,
            advisorId: newMeeting.advisorId,
            coadvisorId: newMeeting.coadvisorId,
            studentId: newMeeting.studentId,
            studentAgreement: newMeeting.studentAgreement,
            advisorAgreement: newMeeting.advisorAgreement,
          },
        },
      });
      onSave(data.createMeeting);
      handleCloses();
      window.location.reload();
    } catch (error) {
      console.error(error);
      console.log(newMeeting);
      // Handle the error appropriately
    }
  };

  const students = [];
  const advisors = [];

  if (data && data.users) {
    data.users.forEach((user) => {
      const student = {
        value: user.id,
        label: user.name,
      };

      const advisor = {
        value: user.id,
        label: user.name,
      };

      if (user.userType === 0) {
        students.push(student);
      } else if (user.userType === 1) {
        advisors.push(advisor);
      }
    });
  }

  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        {open && (
          <Modal
            open={open}
            onClose={handleCloses}
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
                <h2>Criar Reunião</h2>
                <form>
                  <TextField
                    name="title"
                    label="Título"
                    value={newMeeting.title}
                    onChange={handleInputChange}
                    required
                    sx={{
                      width: '100%',
                      marginBottom: '10px',
                      textAlign: 'center',
                    }}
                  />
                  <br />
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="pt-br"
                  >
                    <DateTimePicker
                      name="datetime"
                      ampm={false}
                      autoFocus={true}
                      label="Data e Hora da Reunião"
                      value={newMeeting.datetime}
                      onChange={(newValue) => {
                        setNewMeeting((prevMeeting) => ({
                          ...prevMeeting,
                          datetime: newValue,
                        }));
                      }}
                      required
                      view={['year', 'month', 'day', 'hours', 'minutes']}
                      sx={{
                        width: '100%',
                        marginBottom: '10px',
                        textAlign: 'center',
                      }}
                    />
                    <br />
                  </LocalizationProvider>
                  <TextField
                    name="location"
                    label="Local"
                    value={newMeeting.location}
                    onChange={handleInputChange}
                    sx={{
                      width: '100%',
                      marginBottom: '10px',
                      textAlign: 'center',
                    }}
                  />
                  <br />
                  <TextField
                    name="observations"
                    label="Observações"
                    value={newMeeting.observations}
                    onChange={handleInputChange}
                    sx={{
                      width: '100%',
                      marginBottom: '10px',
                      textAlign: 'center',
                    }}
                  />
                  <br />
                  <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Orientador</InputLabel>
                  <Select
                    labelId='demo-simple-select-autowidth-label'
                    id='demo-simple-select-autowidth'
                    name="advisorId"
                    label="Orientador"
                    validation={{
                      required: true,
                    }}
                    value={newMeeting.advisorId}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    style={{
                      marginBottom: '10px',
                      color: '#fff',
                    }}
                  >
                    {advisors.map((advisor) => (
                      <MenuItem key={advisor.value} value={advisor.value}>
                        {advisor.label}
                      </MenuItem>
                    ))}
                  </Select>
                  </FormControl>
                  <br />
                  <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Co-Orientador</InputLabel>
                  <Select
                    name="coadvisorId"
                    label="Co orientador"
                    value={newMeeting.coadvisorId}
                    onChange={handleInputChange}
                    fullWidth
                    color='primary'
                    required
                    style={{
                      marginBottom: '10px',
                      color: '#fff',
                    }}
                  >
                    {advisors.map((advisor) => (
                      <MenuItem key={advisor.value} value={advisor.value}>
                        {advisor.label}
                      </MenuItem>
                    ))}
                  </Select>
                  </FormControl>
                  <br />
                  <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Estudante</InputLabel>
                  <Select
                    name="studentId"
                    label="Estudante"
                    value={newMeeting.studentId}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    style={{
                      marginBottom: '10px',
                      color: '#fff',
                    }}
                  >
                    {students.map((student) => (
                      <MenuItem key={student.value} value={student.value}>
                        {student.label}
                      </MenuItem>
                    ))}
                  </Select>
                  </FormControl>
                  {/* ... adicione os demais campos do CREATE_MEETING_MUTATION como TextField aqui */}
                  <br />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Criar
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleCloses}
                      style={{ marginLeft: '10px' }}
                    >
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

export default ModalFormMeetingCreate;
