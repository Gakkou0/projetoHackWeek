import React, { useState } from 'react';
import { Modal, TextField, Button } from '@mui/material';
import Box from '@mui/material/Box';
import defaultTheme from '../DefaultTheme/DefaultTheme';
import { ThemeProvider } from '@emotion/react';
import { gql, useMutation } from '@apollo/client';

const CREATE_PROJECT_MUTATION = gql`
  mutation CreateProjectMutation($input: CreateProjectInput!) {
    createProject(input: $input) {
      id
      name
    }
  }
`;

const ModalFormProjectCreating = ({ handleClose, onSave }) => {
  const [open, setOpen] = useState(true);
  const [newProject, setNewProject] = useState({
    name: '',
  });
  const [createProject] = useMutation(CREATE_PROJECT_MUTATION);

  const handleCloses = () => {
    setOpen(false);
    window.location.reload();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await createProject({
        variables: {
          input: {
            name: newProject.name,
          },
        },
      });
      onSave(data.createProject);
      handleCloses();
      window.location.reload();
    } catch (error) {
      console.error(error);
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
                <h2>Criar Projeto</h2>
                <form>
                  <TextField
                    name="name"
                    label="Nome"
                    value={newProject.name}
                    onChange={handleInputChange}
                    required
                    sx={{
                      width: '100%',
                      marginBottom: '10px',
                      textAlign: 'center',
                    }}
                  />
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

export default ModalFormProjectCreating;
