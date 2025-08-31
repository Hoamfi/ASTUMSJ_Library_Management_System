import app from "./app";
import { ENV } from "./config/env";

const PORT = process.env.PORT || 3000;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

if (ENV.JWT_SECRET_KEY === "dev_secret_key") {
  console.log("FATAL: JWT SECRETE KEY IS NOT FOUND!")
  process.exit(1)
}

app.listen(ENV.PORT, () => {
  console.log(`Server running on http://localhost:${ENV.PORT}`);
});
