import express from "express";
import { initRabbitMQ } from "../sharedFunction/rabbitMQ/connection.js";
import sequelize from "../sharedFunction/database/connection.js";
import router from "./router/router.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT_SERVICE || 3000;

app.use(express.json());

app.use("/api", router);

try {
  await sequelize.authenticate();
  console.log("Server: connected to Database");

  await initRabbitMQ();
  console.log("Server: connected to RabbitMQ");

  app.listen(port, () => {
    console.log(`Server: running on port ${port}`);
  });
} catch (error) {
  console.log("Failed to connect server:", error.message);
  process.exit(1);
}
