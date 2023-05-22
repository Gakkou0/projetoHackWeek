import React, { useEffect, useState } from 'react';
import '../../meetingCard.css';

import { useQuery, gql } from '@redwoodjs/web';

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

const Card = ({ cosupervisor, viewer, id }) => {
  const [advisor, setAdvisor] = useState(null);
  const [student, setStudent] = useState(null);
  const [coadvisor, setCoadvisor] = useState(null);

  const { loading: meetingLoading, error: meetingError, data: meetingData } = useQuery(MEETING_QUERY, {
    variables: { id: id },
  });

  const { loading: advisorLoading, error: advisorError, data: advisorData } = useQuery(USER_QUERY, {
    variables: { id: meetingData?.meeting.advisorId },
  });

  const { loading: userLoading, error: userError, data: userData } = useQuery(USER_QUERY, {
    variables: { id: meetingData?.meeting.studentId },
  });

  const { loading: coadvisorLoading, error: coadvisorError, data: coadvisorData } = useQuery(USER_QUERY, {
    variables: { id: meetingData?.meeting.coadvisorId },
  });

  useEffect(() => {
    if (advisorData && advisorData.user)
      setAdvisor(advisorData.user.name);
  }, [advisorData]);

  useEffect(() => {
    if (coadvisorData && coadvisorData.user)
      setCoadvisor(coadvisorData.user.name);
  }, [coadvisorData]);

  useEffect(()=>{
    if (userData && userData.user)
    setStudent(userData.user.name);
}, [userData]);

  return (
    <div className="card">
      <div className="cardHeader">
        <h2>{meetingData?.meeting.title}</h2>
        <p>{student}</p>
      </div>

      <div className="cardIcon">
        {viewer === 'student' ? (
          <img className='iconeImage' src="https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg" alt="Student" />
        ) : (
          <img className='iconeImage' src="https://th.bing.com/th/id/OIP.YqLmPNQL0RiBdKzm8FTMbQHaIu?pid=ImgDet&rs=1" alt="Advisor" />
        )}
      </div>

      <div className="cardMid">
        {cosupervisor ? (
          <div>
            <p>Orientador: {advisor}</p>
            <p>Co-orientador: {coadvisor}</p>
          </div>
        ) : (
          <div>
            <p>Orientador: {advisor}</p>
          </div>
        )}
        <div className="meetingDate">
          <p>{meetingData?.meeting.datetime}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;