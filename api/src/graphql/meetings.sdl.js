export const schema = gql`
  type Meeting {
    id: Int!
    title: String
    datetime: DateTime!
    advisor: User!
    coadvisor: User
    student: User!
    observations: String
    deliverable: String
    cancellationReason: String
    location: String!
    studentAgreement: Boolean!
    advisorAgreement: Boolean!
    advisorId: Int!
    coadvisorId: Int
    studentId: Int!
  }

  type Query {
    meetings: [Meeting!]! @requireAuth
    meeting(id: Int!): Meeting @requireAuth
  }

  input CreateMeetingInput {
    title: String
    datetime: DateTime!
    observations: String
    deliverable: String
    cancellationReason: String
    location: String!
    studentAgreement: Boolean!
    advisorAgreement: Boolean!
    advisorId: Int!
    coadvisorId: Int
    studentId: Int!
  }

  input UpdateMeetingInput {
    title: String
    datetime: DateTime
    observations: String
    deliverable: String
    cancellationReason: String
    location: String
    studentAgreement: Boolean
    advisorAgreement: Boolean
    advisorId: Int
    coadvisorId: Int
    studentId: Int
  }

  type Mutation {
    createMeeting(input: CreateMeetingInput!): Meeting! @requireAuth
    updateMeeting(id: Int!, input: UpdateMeetingInput!): Meeting! @requireAuth
    deleteMeeting(id: Int!): Meeting! @requireAuth
  }
`
