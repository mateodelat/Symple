import { registerAs } from "@nestjs/config";

export default registerAs("config", () => ({
  database: {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    cluster: process.env.DB_CLUSTER,
  },
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
}));
