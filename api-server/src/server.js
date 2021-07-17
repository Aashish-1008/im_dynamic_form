const express = require("express"),
  bodyParser = require("body-parser"),
  ProductRouter = require("./routes/product"),
  FormRouter = require("./routes/form"),
  handleErrors = require("./framework/handleErrors");
cors = require("cors");
const SERVER_PORT = 8080;

let app = express();

// setting up app middle ware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

// routing
app.use("/api/forms", FormRouter);
app.use("/api", ProductRouter);

// error handling
app.use(handleErrors);

app.listen(SERVER_PORT, () => {
  console.log(`Server running at the port : ${SERVER_PORT}`);
});

module.exports = app;
