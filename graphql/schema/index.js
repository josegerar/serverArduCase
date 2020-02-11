const {buildSchema} = require('graphql');

module.exports = buildSchema(`
type Project {
    _id: ID!
    title: String!
    description: String!
    createdDate: String!
    lastAccessDate: String!
    lastUpdateDate: String!
    image: String!
    creator: User!
    canvasJSON: String!
    especJSON: String!
    sharedUsers: [String!]
}

type User {
    _id: ID!
    name: String!
    username: String!
    password: String!
    email: String!
    createdProjects: [Project!]
    sharedProjects: [Project!]
}

type AuthData {
    token: String!
}

input ProjectInput {
    title: String!
    description: String!
    createdDate: String!
    lastAccessDate: String!
    lastUpdateDate: String!
    image: String!
    canvasJSON: String!
    especJSON: String!
}

input ProjectUpdate {
    projectId: ID!
    title: String!
    description: String!
    lastUpdateDate: String!
}

input ProjectSave {
    projectId: ID!
    canvasJSON: String!
    especJSON: String!
    lastAccessDate: String!
    lastUpdateDate: String!
    image: String!
}

input UserInput {
    name: String!
    username: String!
    password: String!
    email: String!
}

type RootQuery {
    projects: [Project!]!
    login(username: String!, password: String!): AuthData!
}

type RootMutation {
    createProject(projectInput: ProjectInput): Project
    createUser(userInput: UserInput): User
    deleteProject(projectId: ID!): User
    updateProject(projectUpdate: ProjectUpdate): Project
    addEmailsProyect(emails: [String!]! , projectId: ID!): Project
    saveProject(projectSave: ProjectSave): Project
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);