export const schema = gql`
  type Project {
    id: Int!
    name: String!
    goals: [Goal]!
  }

  type Goal {
    id: Int!
    description: String!
  }

  type Query {
    projects: [Project!]! @requireAuth
    project(id: Int!): Project @requireAuth
  }

  input CreateProjectInput {
    name: String!
  }

  input UpdateProjectInput {
    name: String
  }

  type Mutation {
    createProject(input: CreateProjectInput!): Project! @requireAuth
    updateProject(id: Int!, input: UpdateProjectInput!): Project! @requireAuth
    deleteProject(id: Int!): Project! @requireAuth
  }
`
