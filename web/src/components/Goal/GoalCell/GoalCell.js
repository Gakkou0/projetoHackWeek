import Goal from 'src/components/Goal/Goal'

export const QUERY = gql`
  query FindGoalById($id: Int!) {
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Goal not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ goal }) => {
  return <Goal goal={goal} />
}
