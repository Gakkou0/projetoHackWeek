import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@redwoodjs/web';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CardActionArea, Skeleton } from '@mui/material';
import { red, blue, green, yellow, orange, purple } from '@mui/material/colors';

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

  const colors = [red[500], blue[500], green[500], yellow[500], orange[500], purple[500]];

  const getRandomIndex = () => {
    return Math.floor(Math.random() * colors.length);
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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'content',
        width: '345px', // Largura fixa para a caixa
      }}
    >
      <Card sx={{ maxWidth: 345, margin: '10px' }}>
        <CardActionArea>
          <CardHeader
            avatar={
              advisorLoading ? (
                <Skeleton variant="circular" width={40} height={40} />
              ) : (
                <Avatar sx={{ bgcolor: colors[getRandomIndex()] }} aria-label="recipe">
                  {advisor?.charAt(0)}
                </Avatar>
              )
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={meetingLoading ? <Skeleton height={24} width="80%" /> : meetingData?.meeting?.title || 'No Meeting Title'}
            subheader={
              meetingLoading ? (
                <Skeleton height={16} width="40%" />
              ) : (
                meetingData?.meeting?.datetime ? new Date(meetingData.meeting.datetime).toLocaleString() : 'No Meeting Datetime'
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
                  <Skeleton height={16} width="80%" duration={2000}/>
                  <Skeleton height={16} width="80%" duration={2000}/>
                  <Skeleton height={16} width="80%" duration={2000}/>
                  <Skeleton height={16} width="80%" duration={2000}/>
                  <Skeleton height={16} width="80%" duration={2000}/>
                  <Skeleton height={16} width="80%" duration={2000}/>
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
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default RecipeReviewCard;
