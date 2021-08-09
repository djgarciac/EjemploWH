const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);

let server = app.listen(process.env.PORT || 3000, () => {
  const { address, port } = server.address();
  console.log(`Webhook sender is listening at https://${address}:${port}`);
});
