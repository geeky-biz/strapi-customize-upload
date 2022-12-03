module.exports = ({ env }) => ({
    // ...
    upload: {
      config: {
        provider: 'strapi-provider-upload-custom',
        providerOptions: {
            s3LocationDefault : {
                accessKeyId: env('AWS_ACCESS_KEY_ID'),
                secretAccessKey: env('AWS_ACCESS_SECRET'),
                region: env('AWS_REGION'),
                params: {
                  Bucket: env('AWS_BUCKET'),
                },      
            },
            s3Location2 : {
                accessKeyId: env('AWS_ACCESS_KEY_ID_2'),
                secretAccessKey: env('AWS_ACCESS_SECRET_2'),
                region: env('AWS_REGION_2'),
                params: {
                  Bucket: env('AWS_BUCKET_2'),
                },      
            },
        },
      },
    },
    // ...
  });