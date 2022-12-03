module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', process.env.AWS_BUCKET + ".s3." + process.env.AWS_REGION + ".amazonaws.com", process.env.AWS_BUCKET + ".s3.amazonaws.com",  process.env.AWS_BUCKET_2 + ".s3." + process.env.AWS_REGION_2 + ".amazonaws.com", process.env.AWS_BUCKET_2 + ".s3.amazonaws.com"],
          'media-src': ["'self'", 'data:', 'blob:', process.env.AWS_BUCKET + ".s3." + process.env.AWS_REGION + ".amazonaws.com", process.env.AWS_BUCKET + ".s3.amazonaws.com", process.env.AWS_BUCKET_2 + ".s3." + process.env.AWS_REGION_2 + ".amazonaws.com", process.env.AWS_BUCKET_2 + ".s3.amazonaws.com"],
          upgradeInsecureRequests: null,
        }
      }
    }
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
