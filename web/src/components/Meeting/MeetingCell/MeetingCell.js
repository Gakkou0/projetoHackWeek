import Meeting from 'src/components/Meeting/Meeting'

export const QUERY = gql`
  query FindMeetingById($id: Int!) {
    meeting: meeting(id: $id) {
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

export const Empty = () => <div>Meeting not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ meeting }) => {
  return <Meeting meeting={meeting} />
}
