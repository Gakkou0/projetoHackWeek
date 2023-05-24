import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import { ThemeProvider } from '@emotion/react';
import ModalFormMeetingCreate from 'src/components/ModalFormMeeting/ModalFormMeetinigCreatt';
import defaultTheme from '../DefaultTheme/DefaultTheme';
import ModalFormProjectCreating from '../ModalFormMeeting/ModalFormProjectCreating';

export const actions = [
  { icon: <GroupOutlinedIcon />, name: 'Criar reunião' },
  { icon: <NoteAddOutlinedIcon />, name: 'Criar projeto' },
];

export default function SpeedDialTooltipOpen({ onClick }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openModal, setOpenModal] = React.useState(false);

  const handleIconClick = () => {
    setOpenModal(true);
  };

  const handleClick = (action) => {
    onClick(action.name);
    handleOpen();
  };

  const handleSave = (data) => {
    // Handle the saved data from the modal
    console.log('Saved Data:', data);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <div
        style={{
          position: 'fixed',
          bottom: '5%',
          right: '5%',
          height: 'calc(50vh - 32px)',
          width: 'calc(30vw - 32px)',
          transform: 'translateZ(0px)',
          flexGrow: 1,
        }}
      >
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
          }}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          FabProps={{
            sx: {
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'secondary.main',
              },
            },
          }}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              sx={{
                whiteSpace: 'nowrap',
              }}
              onClick={action.name === 'Criar reunião'
              ? handleIconClick : null}
            />
          ))}
        </SpeedDial>
        {openModal && (
          <ModalFormMeetingCreate handleClose={() => setOpenModal(false)} onSave={handleSave} />
        )}
      </div>
    </ThemeProvider>
  );
}
