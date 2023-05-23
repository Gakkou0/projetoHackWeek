import React from 'react';
import { useQuery, gql } from '@redwoodjs/web';
import MeetingCard from 'src/components/MeetingCard';

const MEETINGS_QUERY = gql`
  query FindAllMeetings {
    meetings {
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


const MeetingCardList = () => {
  const { loading, error, data } = useQuery(MEETINGS_QUERY);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const meetings = data.meetings;

  // Filtrar reuniões que ainda não ocorreram
  const currentDate = new Date();
  const upcomingMeetings = meetings.filter((meeting) => new Date(meeting.datetime) > currentDate);

  // Ordenar as reuniões pela data de reunião
  upcomingMeetings.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

  return (
    <div>
      {upcomingMeetings.map((meeting) => (
        <MeetingCard
          key={meeting.id}
          id={meeting.id}
          title={meeting.title}
          datetime={meeting.datetime}
          observations={meeting.observations}
          deliverable={meeting.deliverable}
          cancellationReason={meeting.cancellationReason}
          location={meeting.location}
          studentAgreement={meeting.studentAgreement}
          advisorAgreement={meeting.advisorAgreement}
          advisorId={meeting.advisorId}
          coadvisorId={meeting.coadvisorId}
          studentId={meeting.studentId}
        />
      ))}
    </div>
  );
};

export default MeetingCardList;
