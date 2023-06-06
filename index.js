import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';

const s3Client = new S3Client({region: 'us-west-2'});

module.exports = async (event) => {

  const bucketName = event.Records[0].s3.bucket.name;
  const fileName = event.Records[0].s3.object.key;
  const fileSize = event.Records[0].s3.object.size;

  console.log('BUCKET NAME: ' + bucketName);
  console.log('FILE NAME: ' + fileName);
  console.log('FILE SIZE: ' + fileSize);

  const getImageManifest = {
    Bucket: bucketName,
    Key: 'images.json'
  }

  let data = {
    fileName,
    fileSize,
    type: 'image',
  }

  try {
    const manifest = await s3Client.send(new GetObjectCommand(getImageManifest));
    const stringifiedManifest = await manifest.Body.transformToString();
    console.log(manifest.Body.toString());
    console.log(stringifiedManifest);

    let manifestArray= JSON.parse(stringifiedManifest);
    manifestArray.push(data);

    await s3Client.send(new PutObjectCommand({
      Bucket: bucketName,
      Key: 'images.json',
      Body: JSON.stringify(manifestArray),
      ContentType: 'application/json'
    }))
  } catch (e) {
    console.log(e);
    if (e.Code === 'NoSuchKey') {
      console.log('Creating new Manifest');
      await S3Client.send(new PutObjectCommand({
        Bucket: bucketName,
        Key: 'images.json',
        Body: JSON.stringify([data]),
        ContentType: 'application/json'
      }))
    }
  }


  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
};