const app = require('./server/app');
const port = process.env.PORT || 3000;

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening on port ${port}`);
  /* eslint-enable no-console */
});
