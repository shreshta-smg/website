module.exports = [
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:", "http:"],
          "img-src": ["'self'", "data:", "blob:"], // Add your CDN if using (e.g., Cloudinary)
          "media-src": ["'self'", "data:", "blob:"],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      origin: [
        "https://skym-health.netlify.app",
        "http://shreekrishnayogamandiram.in",
        "http://localhost:3000",
      ],
      headers: "*",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
    },
  },
  {
    name: "strapi::poweredBy",
    config: {
      poweredBy: "Powered by shreshtasmg.in",
    },
  },
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
