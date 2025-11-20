export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const API_URLS = {
    createLink: `${BASE_URL}/api/links`,
    getLinks: `${BASE_URL}/api/links`,
    getLinkStats: `${BASE_URL}/api/links/:code`,
    deleteLink: `${BASE_URL}/api/links/:code`,
    redirectLink: `${BASE_URL}/:code`,
};