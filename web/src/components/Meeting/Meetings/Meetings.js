import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Meeting/MeetingsCell'
import { checkboxInputTag, timeTag, truncate } from 'src/lib/formatters'

const DELETE_MEETING_MUTATION = gql`
  mutation DeleteMeetingMutation($id: Int!) {
    deleteMeeting(id: $id) {
      id
    }
  }
`

const MeetingsList = ({ meetings }) => {
  const [deleteMeeting] = useMutation(DELETE_MEETING_MUTATION, {
    onCompleted: () => {
      toast.success('Meeting deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete meeting ' + id + '?')) {
      deleteMeeting({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Datetime</th>
            <th>Observations</th>
            <th>Deliverable</th>
            <th>Cancellation reason</th>
            <th>Location</th>
            <th>Student agreement</th>
            <th>Advisor agreement</th>
            <th>Advisor id</th>
            <th>Coadvisor id</th>
            <th>Student id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {meetings.map((meeting) => (
            <tr key={meeting.id}>
              <td>{truncate(meeting.id)}</td>
              <td>{timeTag(meeting.datetime)}</td>
              <td>{truncate(meeting.observations)}</td>
              <td>{truncate(meeting.deliverable)}</td>
              <td>{truncate(meeting.cancellationReason)}</td>
              <td>{truncate(meeting.location)}</td>
              <td>{checkboxInputTag(meeting.studentAgreement)}</td>
              <td>{checkboxInputTag(meeting.advisorAgreement)}</td>
              <td>{truncate(meeting.advisorId)}</td>
              <td>{truncate(meeting.coadvisorId)}</td>
              <td>{truncate(meeting.studentId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.meeting({ id: meeting.id })}
                    title={'Show meeting ' + meeting.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editMeeting({ id: meeting.id })}
                    title={'Edit meeting ' + meeting.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete meeting ' + meeting.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(meeting.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MeetingsList
