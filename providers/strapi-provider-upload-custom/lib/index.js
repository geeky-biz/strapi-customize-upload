'use strict';

/**
 * Module dependencies
 */

/* eslint-disable no-unused-vars */
// Public node modules.
const _ = require('lodash');
const AWS = require('aws-sdk');

function assertUrlProtocol(url) {
  // Regex to test protocol like "http://", "https://"
  return /^\w*:\/\//.test(url);
}

module.exports = {
  init(config) {
    console.log(config);
    const S3LocationDefault = new AWS.S3({
      apiVersion: '2006-03-01',
      ...config.s3LocationDefault,
    });

    const S3Location2 = new AWS.S3({
      apiVersion: '2006-03-01',
      ...config.s3Location2,
    });

    const upload = (file, customParams = {}) =>
      new Promise((resolve, reject) => {
        let S3 = file.uploadDestination && file.uploadDestination === 's3Location2' ? S3Location2 : S3LocationDefault;
        file.provider_metadata = {uploadDestination: file.uploadDestination || 's3LocationDefault'};
        // upload file on S3 bucket
        const path = file.path ? `${file.path}/` : '';
        S3.upload(
          {
            Key: `${path}${file.hash}${file.ext}`,
            Body: file.stream || Buffer.from(file.buffer, 'binary'),
            ACL: 'public-read',
            ContentType: file.mime,
            ...customParams,
          },
          (err, data) => {
            if (err) {
              return reject(err);
            }

            // set the bucket file url
            if (assertUrlProtocol(data.Location)) {
              file.url = data.Location;
            } else {
              // Default protocol to https protocol
              file.url = `https://${data.Location}`;
            }

            resolve();
          }
        );
      });

    return {
      uploadStream(file, customParams = {}) {
        return upload(file, customParams);
      },
      upload(file, customParams = {}) {
        return upload(file, customParams);
      },
      delete(file, customParams = {}) {
        return new Promise((resolve, reject) => {
          let S3 = file.provider_metadata && file.provider_metadata.uploadDestination && file.provider_metadata.uploadDestination === 's3Location2' ? S3Location2 : S3LocationDefault;
          // delete file on S3 bucket
          const path = file.path ? `${file.path}/` : '';
          S3.deleteObject(
            {
              Key: `${path}${file.hash}${file.ext}`,
              ...customParams,
            },
            (err, data) => {
              if (err) {
                return reject(err);
              }

              resolve();
            }
          );
        });
      },
    };
  },
};
