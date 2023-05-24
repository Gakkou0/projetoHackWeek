import React, { useEffect, useState } from 'react';
import ModalFormMeetingData from '../ModalFormMeeting/ModalFormMeetingData';
import ModalFormMeetingEdit from '../ModalFormMeeting/ModalFormMeetingEdit';
import ModalFormMeetingCreat from '../ModalFormMeeting/ModalFormMeetinigCreatt';
import { useQuery, gql } from '@redwoodjs/web';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { CardActionArea, Skeleton } from '@mui/material';
import { red, blue, green, yellow, orange, purple } from '@mui/material/colors';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@emotion/react';
import defaultTheme from '../DefaultTheme/DefaultTheme';
import { useMutation } from '@redwoodjs/web';


const MEETING_QUERY = gql`
  query FindMeetingById($id: Int!) {
    meeting(id: $id) {
      id
      title
      datetime
      observations
      deliverable
      cancellationReason
      location
      studentAgreement
      advisorAgreement
      advisorId
      coadvisorId
      studentId
    }
  }
`;

const USER_QUERY = gql`
  query FindUserById($id: Int!) {
    user(id: $id) {
      id
      name
    }
  }
`;

const DELETE_MEETING_MUTATION = gql`
  mutation DeleteMeeting($id: Int!) {
    deleteMeeting(id: $id) {
      id
    }
  }
`;


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const RecipeReviewCard = ({ cosupervisor, viewer, id }) => {
  const [expanded, setExpanded] = useState(false);
  const [advisor, setAdvisor] = useState(null);
  const [student, setStudent] = useState(null);
  const [coadvisor, setCoadvisor] = useState(null);
  const [deleteMeeting, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_MEETING_MUTATION)
  const [cardColor, setCardColor] = useState(null);
  const [indexColor, setIndexColor] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [cardData, setCardData] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSaveMeeting = async (id, updatedMeeting) => {
    try {
      // Fazer a chamada GraphQL para atualizar a reunião
      const response = await client.mutate({
        mutation: UPDATE_MEETING_MUTATION,
        variables: {
          id: id,
          input: updatedMeeting,
        },
      });

      // Lógica adicional após a atualização da reunião
    } catch (error) {
      // Tratar erros de forma apropriada
    }
  };



  const { loading: meetingLoading, error: meetingError, data: meetingData } = useQuery(MEETING_QUERY, {
    variables: { id: id },
  });

  const { loading: advisorLoading, error: advisorError, data: advisorData } = useQuery(USER_QUERY, {
    variables: { id: meetingData?.meeting?.advisorId },
  });

  const { loading: userLoading, error: userError, data: userData } = useQuery(USER_QUERY, {
    variables: { id: meetingData?.meeting?.studentId },
  });

  const { loading: coadvisorLoading, error: coadvisorError, data: coadvisorData } = useQuery(USER_QUERY, {
    variables: { id: meetingData?.meeting?.coadvisorId },
  });

  useEffect(() => {
    if (advisorData && advisorData.user) {
      setAdvisor(advisorData.user.name);
    }
  }, [advisorData]);

  useEffect(() => {
    if (coadvisorData && coadvisorData.user) {
      setCoadvisor(coadvisorData.user.name);
    }
  }, [coadvisorData]);

  useEffect(() => {
    if (userData && userData.user) {
      setStudent(userData.user.name);
    }
  }, [userData]);

  useEffect(() => {
    if (id) {
      const hash = hashCode(String(id));
      const colorIndex = [red[500], blue[500], green[500], orange[500], purple[500]];
      const colorCards = ['#2C3E50', '#34495E', '#1F3A93', '#512E5F', '#4A235A'];

      setCardColor(colorCards[hash % colorCards.length]);
      setIndexColor(colorIndex[hash % colorIndex.length]);

    }
  }, [id]);

  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleOpenModalEdit = () => {
    setEditModalOpen(true);
  };

  const handleCloseModalEdit = () => {
    setEditModalOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    window.location.reload();
  };

  const editModalOpenFunction = () => {
    setEditModalOpen(true);
  };

  const [openModalFormMeetingData, setOpenModalFormMeetingData] = useState(false);

  const handleDateShow = () => {
    setOpenModalFormMeetingData(true);
  };

  const ConfirmationModal = styled(Modal)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const modalContentStyle = {
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  const handleDelete = async () => {
    try {
      await deleteMeeting({
        variables: { id: id },
        // Optionally, you can provide an `update` function to update the cache after successful deletion.
        // update: (cache) => {
        //   const normalizedId = cache.identify({ id: id, __typename: 'Meeting' });
        //   cache.evict({ id: normalizedId });
        //   cache.gc();
        // },
      });
      handleClose();
      window.location.reload();
      // Optionally, you can perform additional actions after successful deletion, such as showing a success message or navigating to a different page.
    } catch (error) {
      console.log(error);
      // Handle any error that occurs during deletion.
    }
  };

  // Function to calculate hash code
  const hashCode = (str) => {
    let hash = 0;
    if (str.length === 0) {
      return hash;
    }
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  };


  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'content',
        width: '345px', // Largura fixa para a caixa
      }}>
      <Card
        sx={{
          maxWidth: 345,
          margin: '10px',
          color: 'aliceblue',
          backgroundColor: cardColor,
          boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
        }}>
        <CardActionArea onClick={handleDateShow}>
          <CardHeader
            avatar={
              advisorLoading ? (
                <Skeleton variant="circular" width={40} height={40} duration="5000" />
              ) : (
                <Avatar
                  sx={{
                    bgcolor: indexColor,
                  }}
                  aria-label="recipe"
                >
                  {advisor?.charAt(0)}
                </Avatar>
              )
            }
            title={
              meetingLoading ? (
                <Skeleton height={24} width="80%" duration="5000" />
              ) : (
                meetingData?.meeting?.title || 'No Meeting Title'
              )
            }
            subheader={
              meetingLoading ? (
                <Skeleton height={16} width="40%" duration="5000" />
              ) : (
                meetingData?.meeting?.datetime
                  ? new Date(meetingData.meeting.datetime).toLocaleString()
                  : 'No Meeting Datetime'
              )
            }
          />
          <CardContent>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                textAlign: 'justify',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                '-webkit-line-clamp': 3,
                '-webkit-box-orient': 'vertical',
                wordWrap: 'break-word',
                overflowWrap: 'break-word', // Adicionado para quebrar linha
                width: '100%', // Largura completa para ocupar a caixa
              }}
            >
              {meetingLoading ? (
                <>
                  <Skeleton height={16} width="80%" duration="5000" />
                  <Skeleton height={16} width="80%" duration="5000" />
                  <Skeleton height={16} width="80%" duration="5000" />
                  <Skeleton height={16} width="80%" duration="5000" />
                  <Skeleton height={16} width="80%" duration="5000" />
                  <Skeleton height={16} width="80%" duration="5000" />
                </>
              ) : (
                <>
                  Orientador: {advisor || 'No advisor available'}
                  <br />
                  Co-Orientador: {coadvisor || 'No coadvisor available'}
                  <br />
                  Estudante: {student || 'No student available'}
                  <br />
                  Local: {meetingData?.meeting?.location || 'No location available'}
                  <br />
                  Observação: {meetingData?.meeting?.observations || 'No observations available'}
                  <br />
                </>
              )}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing>
          {showSkeleton ? (
            <Skeleton animation="wave" variant="circular" height={40} width={40} />
          ) : (
            <IconButton aria-label="Editar" onClick={handleOpenModalEdit}>
              <EditOutlinedIcon />
            </IconButton>
          )}
          {showSkeleton ? (
            <Skeleton animation="wave" variant="circular" height={40} width={40} />
          ) : (
            <IconButton aria-label="Deletar" onClick={handleOpen}>
              <DeleteOutlinedIcon />
            </IconButton>
          )}
        </CardActions>

        <ConfirmationModal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <ThemeProvider theme={defaultTheme}>
            <Box sx={modalContentStyle}
              style={{
                color: 'aliceblue',
                backgroundColor: '#272727',
                boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
                borderRadius: '5px',
              }}
            >
              <Typography id="modal-title" variant="h6" component="h2"
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',

                }}>
                Deseja deletar? <br></br>
                {meetingData?.meeting?.title}

              </Typography>
              <div style={{
                alignItems: 'center',
                alignContent: 'center',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <Box sx={{ mt: 2 }}>
                  <Button onClick={handleDelete} variant="contained" color="error" sx={{ mr: 1 }}>
                    Sim
                  </Button>
                  <Button onClick={handleClose} variant="contained" color="primary">
                    Não
                  </Button>
                </Box>
              </div>
            </Box>
          </ThemeProvider>
        </ConfirmationModal>
        {openModalFormMeetingData && (
          <ModalFormMeetingData meeting={meetingData?.meeting} handleClose={() => setOpenModalFormMeetingData(false)} />
        )}

        {editModalOpen && (


         <ModalFormMeetingEdit
          meeting={meetingData?.meeting} // Certifique-se de passar o objeto meeting com a propriedade id
          handleClose={handleClose}
          onSave={handleSaveMeeting} // Passa a função handleSaveMeeting como onSave
        />
        )}
      </Card>
    </div>
  );
};

export default RecipeReviewCard;
