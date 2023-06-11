import express from 'express';
import cassandra from "cassandra-driver";

const app = express();
const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: "awesome_db"
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/api/users", async (req, res) => {
  // CQL
  const query = 'SELECT * FROM users';
  // QUERYING
  const response = await client.execute(query);
  // Response to client
  res.send(response.rows);
})

app.listen(3000, () => {
  console.log("server will be start at 3000 port")
});