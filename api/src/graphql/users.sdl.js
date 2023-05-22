export const schema = gql`
  type User {
    id: Int!
    name: String!
    userType: Int
    email: String!
    password: String!
    meetingsAsAdvisor: [Meeting]!
    meetingsAsCoadvisor: [Meeting]!
    meetingsAsStudent: [Meeting]!
    Projects: [Project]
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    name: String!
    userType: Int
    email: String!
    password: String!
  }

  input UpdateUserInput {
    name: String
    userType: Int
    email: String
    password: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
