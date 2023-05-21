import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import MeetingForm from 'src/components/Meeting/MeetingForm'

export const QUERY = gql`
  query EditMeetingById($id: Int!) {
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
const UPDATE_MEETING_MUTATION = gql`
  mutation UpdateMeetingMutation($id: Int!, $input: UpdateMeetingInput!) {
    updateMeeting(id: $id, input: $input) {
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

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ meeting }) => {
  const [updateMeeting, { loading, error }] = useMutation(
    UPDATE_MEETING_MUTATION,
    {
      onCompleted: () => {
        toast.success('Meeting updated')
        navigate(routes.meetings())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateMeeting({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Meeting {meeting?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <MeetingForm
          meeting={meeting}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
