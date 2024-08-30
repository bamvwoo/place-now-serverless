import crypto from 'crypto';
import aws from 'aws-sdk';

const s3 = new aws.S3({ region: process.env.AWS_REGION });

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { fileName, fileType } = req.body;

        // 파일명 해시화
        const hashedFileName = crypto.createHash('sha256').update(fileName + Date.now().toString()).digest('hex');

        const s3Params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: hashedFileName,
            ContentType: fileType,
            ACL: 'public-read' // 퍼블릭 접근 허용
        };

        try {
            const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params);

            // 퍼블릭 URL 생성
            const publicURL = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${hashedFileName}`;

            res.status(200).json({ uploadURL, publicURL });
        } catch (error) {
            res.status(500).json({ error: 'Error uploading file' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
