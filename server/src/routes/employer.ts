import { FastifyInstance } from "fastify";
import { getCompanies } from "../services/employee";
import { getEmployerDashboardData } from "../services/employer";

export const employerRoutes = (server: FastifyInstance) => {
  server.get("/employer/:slug", async (req, res) => {
    const { slug } = req.params as { slug: string };
    const employerData = await getEmployerDashboardData(slug);

    res.send(employerData);
  });
};
