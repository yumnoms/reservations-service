const server = require('./server.js');
const db = require('./database.js');

const port = 3010;
server.listen(port, () => {
  console.log(`Server up and running! Listening on port ${port}...`);
  console.log(`http://localhost:${port}`);
  db.initialize();
});
