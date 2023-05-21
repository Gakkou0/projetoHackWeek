import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import GoalForm from 'src/components/Goal/GoalForm'

export const QUERY = gql`
  query EditGoalById($id: Int!) {
    goal: goal(id: $id) {
      id
      description
      completionDeadline
      completionDate
      userId
      observation
    }
  }
`
const UPDATE_GOAL_MUTATION = gql`
  mutation UpdateGoalMutation($id: Int!, $input: UpdateGoalInput!) {
    updateGoal(id: $id, input: $input) {
      id
      description
      completionDeadline
      completionDate
      userId
      observation
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ goal }) => {
  const [updateGoal, { loading, error }] = useMutation(UPDATE_GOAL_MUTATION, {
    onCompleted: () => {
      toast.success('Goal updated')
      navigate(routes.goals())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateGoal({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Goal {goal?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <GoalForm goal={goal} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
