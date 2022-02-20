# Learning GraphQL - notes
- GraphQL is a declarative query language for your API.
- It was created at Facebook and open sourced in 2015.
- GraphQL gives us a way of taking all of our data sources, REST APIs, databases, cloud services, and put it into some sort of user interface.
- GraphQL also gives us a domain specific language, in other words, a way of designing our API's types in a readable language that everybody can understand.
- [Playground](https://snowtooth.moonhighway.com/)
- `query` gets data, `mutation` change data. Both are `POST` requests
- `subscription` listens for data changes over a web socket in real time
- GraphQL Schema Definition Language is a language that defines all of our API's types. So, in order to send these queries, we need a well-defined schema.
- GraphQL Scalar Types - `Int`, `Float`, `String`, `Boolean`, `ID`
- Nullable vs Non-nullable
- GraphQL Object Types
```graphql
type Photo {
  id: ID!
  name: String!
  url: String!
  description: String
  rating: Float
  private: Boolean!
  postedPhotos: [Photo!]!
}
```
- Root queries
```graphql
type Query {
  totalUsers: Int!
}

type Mutation {
  removeUser(id: ID!): User!
}
```

- Setup
```bash
mkdir graphQL-ski-day-counter
cd graphQL-ski-day-counter
npm init -y
npm install graphql apollo-server nodemon
```
- Use triple quotes for `"""` documentation `"""`
- Examples
```graphql
query AllDays {
  totalDays
  allDays {
    id
    date
    mountain
    condition
  }
}
```

```graphql
mutation RemoveDay {
  removeDay(id: "3") {
    day {
    id
    date
  }
  removed
  totalBefore
  totalAfter
  }
}
```

```graphql
mutation AddDay {
  addDay(input: {
    date: "1/2/2023"
    mountain: "Everest"
    condition: ICE
  })
  {
    id
    date
    mountain
    condition
  }
}
```
