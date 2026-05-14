const app = require('./app');
const { PORT } = require('./config/env');

app.listen(PORT, () => {
  console.log(`
  🚀 Server ready at: http://localhost:${PORT}
  🏥 Health check: http://localhost:${PORT}/api/health
  `);
});
