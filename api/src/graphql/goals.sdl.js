export const schema = gql`
  type Goal {
    id: Int!
    description: String!
    completionDeadline: DateTime
    completionDate: DateTime
    user: User
    userId: Int
    observation: String
  }

  type Query {
    goals: [Goal!]! @requireAuth
    goal(id: Int!): Goal @requireAuth
  }

  input CreateGoalInput {
    description: String!
    completionDeadline: DateTime
    completionDate: DateTime
    userId: Int
    observation: String
  }

  input UpdateGoalInput {
    description: String
    completionDeadline: DateTime
    completionDate: DateTime
    userId: Int
    observation: String
  }

  type Mutation {
    createGoal(input: CreateGoalInput!): Goal! @requireAuth
    updateGoal(id: Int!, input: UpdateGoalInput!): Goal! @requireAuth
    deleteGoal(id: Int!): Goal! @requireAuth
  }
`
