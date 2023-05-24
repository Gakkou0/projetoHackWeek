import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import defaultTheme from '../DefaultTheme/DefaultTheme';
import { ThemeProvider } from '@emotion/react';
import { color } from 'framer-motion';
import ModalFormMeetingCreate from '../ModalFormMeeting/ModalFormMeetinigCreatt';

export const actions = [
  { icon: <GroupOutlinedIcon />, name: 'Criar reunião', component: <ModalFormMeetingCreate/> },
  { icon: <NoteAddOutlinedIcon />, name: 'Criar projeto' },
];

export default function SpeedDialTooltipOpen({ onClick }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleClick = (action) => {
    onClick(action.name);
    handleOpen();
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
          flexGrow: 1
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
              }
            }
          }}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              onClick={() => handleClick(action)}
              tooltipTitle={action.name}
              tooltipOpen
              sx={{
                whiteSpace: 'nowrap',
              }}
            />
          ))}
        </SpeedDial>
      </div>
    </ThemeProvider>
  );
}
