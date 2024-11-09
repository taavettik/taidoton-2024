import { FastifyInstance } from "fastify";
import { getCompanyInsights } from "../services/employee";
import { getEmployeeInsights } from "../../sandrahihii/getAnalysis";

export const employeeRoutes = (server: FastifyInstance) => {
  server.get("/employees", async (req, res) => {
    const { ratioOfAfterHoursEmails } = await getCompanyInsights();

    res.send({ ratioOfAfterHoursEmails });
  });

  server.get("/analysis", async (req, res) => {
    const { analysis } = await getEmployeeInsights();

    res.send({ analysis });
  });
};
