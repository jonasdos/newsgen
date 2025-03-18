import dotenv from "dotenv";

import app from "./app";

dotenv.config();
const DEFAULT_PORT = 3000;
app.listen(process.env.PORT || DEFAULT_PORT, () => {
  console.log(`Server is up and running.`);
});
