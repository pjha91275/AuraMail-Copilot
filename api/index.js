const app = require('../server/src/index');

module.exports = async (req, res) => {
  if (app.ensureInit) {
    try {
      await app.ensureInit();
    } catch (e) {
      console.warn('Vercel serverless init warning:', e.message);
    }
  }
  return app(req, res);
};
