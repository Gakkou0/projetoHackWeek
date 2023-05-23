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
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CardActionArea } from '@mui/material';

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
      }}

    >
    <Card sx={{ maxWidth: 345, margin: '10px' }}>
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {advisor?.charAt(0)}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={meetingData?.meeting?.title || 'No Meeting Title'}
          subheader={meetingData?.meeting?.datetime ? new Date(meetingData.meeting.datetime).toLocaleString() : 'No Meeting Datetime'}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary"
            sx={{
              textAlign: 'justify',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              '-webkit-line-clamp': 3,
              '-webkit-box-orient': 'vertical',
            }}
          >
            Orientador:  {advisor || 'No advisor available\n'} <br />
            Co-Orientador: {coadvisor || 'No coadvisor available\n'}<br />
            Estudante: {student || 'No student available\n'}<br />
            Local: {meetingData?.meeting?.location || 'No location available'}<br />
            Observação: {meetingData?.meeting?.observations || 'No observations available'}<br />
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
