import crypto from 'crypto';
import aws from 'aws-sdk';
import fs from 'fs';
import axios from 'axios';

const s3 = new aws.S3({ region: process.env.AWS_REGION });

const getURL = async (file) => {
    try {

        const fileName = file.originalFilename;
        const fileType = file.mimetype;
    
        // 파일명 해시화
        const hashedFileName = crypto.createHash('sha256').update(fileName + Date.now().toString()).digest('hex');
    
        // 오늘 날짜를 기준으로 폴더 경로 생성
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
    
        const filePath = `${year}/${month}/${day}/${hashedFileName}`;
    
        const s3Params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: filePath,
            ContentType: fileType,
            ACL: 'public-read' // 퍼블릭 접근 허용
        };
    
        // 업로드 URL 생성
        const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params);
    
        // 퍼블릭 URL 생성
        const publicURL = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${filePath}`;
    
        return { uploadURL, publicURL };
    } catch (error) {
        console.error('Failed to get URL', error);
    }
}

const upload = async (files) => {
    const results = [];
    for (const file of files) {
        const filePath = file.filepath;
        const fileName = file.originalFilename;
        const fileType = file.mimetype;
        const fileContent = fs.readFileSync(filePath);

        const { uploadURL, publicURL } = await getURL(file);

        // S3에 파일 업로드
        const response = await axios.put(uploadURL, fileContent, {
            headers: {
                'Content-Type': fileType,
            },
        });
        
        if (response.status === 200) {
            await fs.promises.unlink(filePath);
        } else {
            throw new Error('Failed to upload file');
        }

        results.push({
            fileName,
            url: publicURL
        });
    }

    return results;
};

export { upload };