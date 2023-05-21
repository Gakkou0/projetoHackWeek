import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import GoalForm from 'src/components/Goal/GoalForm'

const CREATE_GOAL_MUTATION = gql`
  mutation CreateGoalMutation($input: CreateGoalInput!) {
    createGoal(input: $input) {
      id
    }
  }
`

const NewGoal = () => {
  const [createGoal, { loading, error }] = useMutation(CREATE_GOAL_MUTATION, {
    onCompleted: () => {
      toast.success('Goal created')
      navigate(routes.goals())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createGoal({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Goal</h2>
      </header>
      <div className="rw-segment-main">
        <GoalForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewGoal
