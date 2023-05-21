import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import MeetingForm from 'src/components/Meeting/MeetingForm'

const CREATE_MEETING_MUTATION = gql`
  mutation CreateMeetingMutation($input: CreateMeetingInput!) {
    createMeeting(input: $input) {
      id
    }
  }
`

const NewMeeting = () => {
  const [createMeeting, { loading, error }] = useMutation(
    CREATE_MEETING_MUTATION,
    {
      onCompleted: () => {
        toast.success('Meeting created')
        navigate(routes.meetings())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createMeeting({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Meeting</h2>
      </header>
      <div className="rw-segment-main">
        <MeetingForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewMeeting
