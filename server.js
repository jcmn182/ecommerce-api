const { app } = require('./app');

// Utils
const { db } = require('./utils/db.js');
const { models } = require('./utils/models.js');

db
  .authenticate()
  .then(() => console.log('Database authenticated'))
  .catch((err) => console.log(err));

// Models relations
models();

db
  .sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.log(err));

const PORT =  3000;

app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});