import { useState } from 'react';
import { Modal, TextField, Button } from '@mui/material';
import Box from '@mui/material/Box';
import defaultTheme from '../DefaultTheme/DefaultTheme';
import { ThemeProvider } from '@emotion/react';
import { gql, useMutation } from '@apollo/client';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'dayjs/locale/pt-br';

const UPDATE_MEETING_MUTATION = gql`
  mutation UpdateMeetingMutation($id: Int!, $input: UpdateMeetingInput!) {
    updateMeeting(id: $id, input: $input) {
      id
      datetime
      observations
      location
    }
  }
`;

const ModalFormMeetingEdit = ({
  meeting,
  handleClose,
  onSave
}) => {
  const [open, setOpen] = useState(true);
  const [editedMeeting, setEditedMeeting] = useState(meeting);
  const [updateMeeting] = useMutation(UPDATE_MEETING_MUTATION);

  const handleCloses = () => {
    setOpen(false);
    window.location.reload();
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(editedMeeting);
      const { data } = await updateMeeting({
        variables: {
          id: editedMeeting.id,
          input: {
            title: editedMeeting.title,
            datetime: editedMeeting.datetime,
            observations: editedMeeting.observations,
            location: editedMeeting.location,
          },
        },
      });
      onSave(data.updateMeeting);
      handleCloses();
      window.location.reload();
    } catch (error) {
      // Handle the error appropriately
    }
  };

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
                <h2>Detalhes da Reunião</h2>
                <form>
                  <TextField
                    name="title"
                    label="Título"
                    value={editedMeeting.title}
                    onChange={handleInputChange}
                    required
                    sx={{
                      width: '100%',
                      marginBottom: '10px',
                      textAlign: 'center',
                    }}
                  />
                  <br></br>
                  <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale='pt-br'
                  >
                    <DateTimePicker
                      name="datetime"
                      ampm={false}
                      autoFocus = {true}
                      label="Data e hora da reunião"
                      defaultValue={dayjs(editedMeeting.datetime)}
                      localeText={editedMeeting.datetime}
                      onChange={(newValue) => {
                        setEditedMeeting((prevMeeting) => ({
                          ...prevMeeting,
                          datetime: newValue,
                        }));
                      }
                      }
                      required
                      view={['year', 'month', 'day', 'hours', 'minutes']}
                      sx={{
                        width: '100%',
                        marginBottom: '10px',
                        textAlign: 'center',
                      }}
                    />
                    <br></br>
                  </LocalizationProvider>
                  <TextField
                    name="location"
                    label="Local"
                    value={editedMeeting.location}
                    onChange={handleInputChange}
                    sx={{
                      width: '100%',
                      marginBottom: '10px',
                      textAlign: 'center',
                    }}
                  />
                  <br></br>
                  <TextField
                    name="observations"
                    label="Observações"
                    value={editedMeeting.observations}
                    onChange={handleInputChange}
                    sx={{
                      width: '100%',
                      marginBottom: '10px',
                      textAlign: 'center',
                    }}
                  />
                  <br></br>
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleCloses}
                      style={{ marginLeft: '10px' }}
                    >
                      Close
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
