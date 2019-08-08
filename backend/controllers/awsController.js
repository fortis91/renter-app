var aws = require('aws-sdk');
require("dotenv").config();

aws.config.update({
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const S3_BUCKET = process.env.BUCKET


module.exports = {
    sign_s3: (req, res) => {
        console.log("req.body", req.body);
        const s3 = new aws.S3();
        const fileName = req.body.fileName;
        const fileType = req.body.fileType;

        var s3Params = {
            Bucket: S3_BUCKET,
            Key: fileName,
            Expires: 500,
            ContentType: fileType,
            ACL: 'public-read'
        };
        console.log("after object");
        // Make a request to the S3 API to get a signed URL which we can use to upload our file
        s3.getSignedUrl('putObject', s3Params, (err, data) => {
            if (err) {
                console.log("err @ getSignedURL", err);
                res.json({
                    success: false,
                    error: err
                })
            }
            // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved. 
            const returnData = {
                signedRequest: data,
                url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
            };
            // Send it all back
            res.json({
                success: true,
                data: {
                    returnData
                }
            });
        });
    }
}