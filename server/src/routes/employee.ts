import { FastifyInstance } from "fastify";
import { getCompanyInsights } from "../services/employee";

export const employeeRoutes = (server: FastifyInstance) => {
  server.get("/employees", async (req, res) => {
    const { ratioOfAfterHoursEmails } = await getCompanyInsights();
    res.send({ ratioOfAfterHoursEmails });
  });
};
