import crypto from 'crypto';
import aws from 'aws-sdk';

const s3 = new aws.S3({ region: process.env.AWS_REGION });

const uploadPlaceImages = (files) => {
    
};

export { upload };