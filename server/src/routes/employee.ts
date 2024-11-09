import { FastifyInstance } from "fastify";
import { getCompanies } from "../services/employee";

export const employeeRoutes = (server: FastifyInstance) => {
  server.get("/companies", async (req, res) => {
    const companyData = await getCompanies();

    res.send(companyData);
  });
};
