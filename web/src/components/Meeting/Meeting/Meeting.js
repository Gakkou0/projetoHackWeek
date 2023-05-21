import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { checkboxInputTag, timeTag } from 'src/lib/formatters'

const DELETE_MEETING_MUTATION = gql`
  mutation DeleteMeetingMutation($id: Int!) {
    deleteMeeting(id: $id) {
      id
    }
  }
`

const Meeting = ({ meeting }) => {
  const [deleteMeeting] = useMutation(DELETE_MEETING_MUTATION, {
    onCompleted: () => {
      toast.success('Meeting deleted')
      navigate(routes.meetings())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete meeting ' + id + '?')) {
      deleteMeeting({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Meeting {meeting.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{meeting.id}</td>
            </tr>
            <tr>
              <th>Datetime</th>
              <td>{timeTag(meeting.datetime)}</td>
            </tr>
            <tr>
              <th>Observations</th>
              <td>{meeting.observations}</td>
            </tr>
            <tr>
              <th>Deliverable</th>
              <td>{meeting.deliverable}</td>
            </tr>
            <tr>
              <th>Cancellation reason</th>
              <td>{meeting.cancellationReason}</td>
            </tr>
            <tr>
              <th>Location</th>
              <td>{meeting.location}</td>
            </tr>
            <tr>
              <th>Student agreement</th>
              <td>{checkboxInputTag(meeting.studentAgreement)}</td>
            </tr>
            <tr>
              <th>Advisor agreement</th>
              <td>{checkboxInputTag(meeting.advisorAgreement)}</td>
            </tr>
            <tr>
              <th>Advisor id</th>
              <td>{meeting.advisorId}</td>
            </tr>
            <tr>
              <th>Coadvisor id</th>
              <td>{meeting.coadvisorId}</td>
            </tr>
            <tr>
              <th>Student id</th>
              <td>{meeting.studentId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editMeeting({ id: meeting.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(meeting.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Meeting
