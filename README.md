# image-lambda


## Overview

AWS Lambda allows writing code that is triggered in the cloud, without thinking about maintaining servers. We'll use it today to automatically run some processing on image files after they're uploaded to an S3 Bucket.

## Resources

## Feature Tasks

- Create an S3 Bucket with "open" read permissions, so that anyone can see the images/files in their browser.
- A user should be able to upload an image at any size, and update a dictionary of all images that have been uploaded so far.
- When an **image** is uploaded to your S3 bucket, it should trigger a Lambda function which must:
  - Download a file called "images.json" from the S3 Bucket if it exists.
  - The images.json should be an array of objects, each representing an image. Create an empty array if this file is not present.
  - Create a metadata object describing the image.
    - Name, Size, Type, etc.
  - Append the data for this image to the array.
    - Note: If the image is a duplicate name, update the object in the array, don't just add it.
  - Upload the images.json file back to the S3 bucket.

### Proposed File Structure

If uploading a zipped directory to Lambda, only the `index.js` and `package.json` should be zipped.

```text
├── .github
│   ├── workflows
│   │   └── publish-lambda.yml (stretch goal)
├── .eslintrc.json
├── .gitignore
├── index.js
├── lambda.test.js
├── package.json
└── README.md
```

> **NOTE** - If you setup your S3 Bucket to trigger your Lambda function on every file uploaded or modified, it will run that Lambda function every time that .json file is re-uploaded, putting you into an infinite loop. Be sure and set the event trigger to only run on files with image extensions as shown below.

## Documentation

- Function will upload image to S3 Bucket
- Lambda function is deployed to AWS

## Image

<img width="628" alt="Lambda Assets" src="https://user-images.githubusercontent.com/120413183/234515996-749f8fbc-55f7-4a58-bc67-9796f1d1e942.png">
