import Logger from "./logger";
const logger = Logger("util/routes");

// To add a route add it to enRoutes and frRoutes
export const routes = {
  en: {
    login: "/en/login",
    register: "/en/register",
    forgot: "/en/forgot",
    expire: "/en/expire",
    password: "/en/password",
    dashboard: "/en/dashboard",
    root: "/en",
    palette: "/en/palette",
    profile: "/en/profile",
  },
};

export const getRoute = (key, lang) => {
  const route = routes[lang] && routes[lang][key];
  if (route) {
    return route;
  } else {
    throw new Error(`Route not found for key: ${key} and lang: ${lang}`);
  }
};

export const getLangRoutes = (key) => {
  const langRoutes = [];
  Object.keys(routes).forEach((lang) => {
    const route = routes[lang][key];
    if (route) {
      langRoutes.push(route);
    } else {
      logger.warning(`Route not found for key: ${key} and lang: ${lang}`);
    }
  });

  return langRoutes;
};
