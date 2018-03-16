import * as express from "express";
import { join } from "path";

import initializeRoutes from "./routes";

const port = 8080;
const app = express();

// include assets
app.use("/target", express.static(join(__dirname, "..", "..", "target")));

// set up template engine
app.set("views", join(__dirname, "views"));

initializeRoutes(app);

app.listen(port, ():void => {
    console.log("Now listening on port", port);
})