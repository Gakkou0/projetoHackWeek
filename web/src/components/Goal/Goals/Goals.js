import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Goal/GoalsCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_GOAL_MUTATION = gql`
  mutation DeleteGoalMutation($id: Int!) {
    deleteGoal(id: $id) {
      id
    }
  }
`

const GoalsList = ({ goals }) => {
  const [deleteGoal] = useMutation(DELETE_GOAL_MUTATION, {
    onCompleted: () => {
      toast.success('Goal deleted')
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
    if (confirm('Are you sure you want to delete goal ' + id + '?')) {
      deleteGoal({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Description</th>
            <th>Completion deadline</th>
            <th>Completion date</th>
            <th>User id</th>
            <th>Observation</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {goals.map((goal) => (
            <tr key={goal.id}>
              <td>{truncate(goal.id)}</td>
              <td>{truncate(goal.description)}</td>
              <td>{timeTag(goal.completionDeadline)}</td>
              <td>{timeTag(goal.completionDate)}</td>
              <td>{truncate(goal.userId)}</td>
              <td>{truncate(goal.observation)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.goal({ id: goal.id })}
                    title={'Show goal ' + goal.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editGoal({ id: goal.id })}
                    title={'Edit goal ' + goal.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete goal ' + goal.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(goal.id)}
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

export default GoalsList
