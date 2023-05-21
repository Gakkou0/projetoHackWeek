import { Link, routes } from '@redwoodjs/router'

import Meetings from 'src/components/Meeting/Meetings'

export const QUERY = gql`
  query FindMeetings {
    meetings {
      id
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
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No meetings yet. '}
      <Link to={routes.newMeeting()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ meetings }) => {
  return <Meetings meetings={meetings} />
}
