const express = require("express");
const history = require("connect-history-api-fallback");
const path = require("path");
const app = express();

const staticFileMiddleware = express.static(path.join(__dirname, "dist"));
app.use(staticFileMiddleware);
app.use(
  history({
    disableDotRule: true,
    verbose: false
  })
);
app.use(staticFileMiddleware);

const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`Swampum listening on port ${port}!`);
});
