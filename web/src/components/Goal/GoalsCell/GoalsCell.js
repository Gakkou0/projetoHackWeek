import { Link, routes } from '@redwoodjs/router'

import Goals from 'src/components/Goal/Goals'

export const QUERY = gql`
  query FindGoals {
    goals {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No goals yet. '}
      <Link to={routes.newGoal()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ goals }) => {
  return <Goals goals={goals} />
}
