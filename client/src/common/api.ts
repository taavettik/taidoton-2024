export const api = {
  getCompanyData: async (id: string) => {
    const response = await fetch(`/api/employer/${id}`);
    return response.json();
  },

  getCompanies: async () => {
    const response = await fetch('/api/companies');
    return response.json();
  },
};
