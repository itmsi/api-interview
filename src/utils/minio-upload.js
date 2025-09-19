const path = require('path');
const fs = require('fs');
const {
  uploadToMinio,
  uploadToMinioPrivate,
  isMinioEnabled
} = require('../config/minio');
const { generateFolder } = require('./folder');
const { logger } = require('./logger');
const { logDateFormat } = require('./date');
const { addWatermark } = require('./custom');
const resizeImage = require('./image');

const generateMinioUpload = async (req, num, paths, naming, defaults = '', additional = {
  isWatermark: false, isPrivate: false, isContentType: false, fileNames: '', compressImage: false
}) => {
  const filePath = `user-upload-minio-${logDateFormat()}.txt`;

  try {
    // If MinIO is disabled, return default values
    if (!isMinioEnabled) {
      console.log('MinIO is disabled, returning default values for upload');
      return {
        pathForDatabase: defaults,
        fileNames: defaults,
        status: false
      };
    }

    // Debug logging
    console.log('DEBUG generateMinioUpload - req.files[num]:', req.files[num]);
    console.log('DEBUG generateMinioUpload - num:', num);
    
    // Handle both single file and array structure from multer
    const fileData = Array.isArray(req.files[num]) ? req.files[num][0] : req.files[num];
    
    let buffer = fileData?.buffer;
    const mime = fileData?.mimetype;
    let fileNames = fileData?.fieldname
      ? `${naming !== '' ? `${naming}-` : ''}${Date.now()}${path.extname(fileData?.originalname)}`
      : defaults;
    
    // Check if buffer exists
    if (!buffer) {
      console.error('Buffer is undefined for file:', num);
      return {
        pathForDatabase: defaults,
        fileNames: defaults,
        status: false
      };
    }

    let watermarkImage;
    if (additional.isWatermark) {
      const pathWatermarked = path.join(__dirname, `../../storages/tmp/${fileNames}`);
      watermarkImage = await addWatermark(buffer, pathWatermarked);
      buffer = fs.readFileSync(watermarkImage);
      fileNames = additional.fileNames ? `watermark-${additional.fileNames}` : `watermark-${fileNames}`;
    }

    const bucketName = additional.isPrivate
      ? process.env.MINIO_BUCKET_PRIVATE || process.env.AWS_BUCKET_PRIVATE
      : process.env.S3_BUCKET || process.env.MINIO_BUCKET || process.env.AWS_BUCKET;

    const { pathForDatabase } = generateFolder(paths);

    if (additional.compressImage && mime && mime.startsWith('image/')) {
      try {
        const resizedBuffer = await resizeImage(buffer, mime, naming);
        if (resizedBuffer) {
          buffer = resizedBuffer;
        }
      } catch (error) {
        console.warn('Image compression failed, using original buffer:', error.message);
      }
    }

    const objectName = `${pathForDatabase}${fileNames}`;
    const contentType = additional.isContentType ? mime : 'application/octet-stream';

    // Upload to MinIO
    const uploadResult = additional.isPrivate
      ? await uploadToMinioPrivate(bucketName, objectName, buffer, contentType)
      : await uploadToMinio(objectName, buffer, contentType, bucketName);

    // Remove temporary watermarked image
    if (additional.isWatermark && watermarkImage) {
      fs.unlink(watermarkImage, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }

    if (uploadResult.success) {
      logger(filePath, 'upload').write(`Success uploading file ${fileNames} to MinIO bucket ${bucketName} ${logDateFormat()}\n`);
    } else {
      logger(filePath, 'upload').write(`Error uploading file ${fileNames} to MinIO bucket ${bucketName} ${logDateFormat()}\n`);
    }

    return {
      pathForDatabase: uploadResult.success ? uploadResult.url : defaults,
      fileNames,
      status: uploadResult.success
    };
  } catch (error) {
    console.error('Error MinIO Upload : ', error);
    return {
      pathForDatabase: defaults,
      fileNames: defaults,
      status: false
    };
  }
};

const generateMinioUploadUpdated = async (req, file, row, defaults = '', additional = {
  isWatermark: false, isPrivate: false, isContentType: false, fileNames: '', compressImage: false
}) => {
  try {
    // If MinIO is disabled, return row payload as is
    if (!isMinioEnabled) {
      console.log('MinIO is disabled, returning row payload for upload update');
      return row?.payload;
    }

    const filePath = `user-upload-minio-put-${logDateFormat()}.txt`;
    
    // Handle both single file and array structure from multer
    const fileData = Array.isArray(req.files[file?.num]) ? req.files[file?.num][0] : req.files[file?.num];
    
    let fileName = fileData?.fieldname
      ? `${file?.name !== '' ? `${file?.name}-` : ''}${Date.now()}${path.extname(fileData?.originalname)}`
      : defaults;

    const bucketName = additional.isPrivate
      ? process.env.MINIO_BUCKET_PRIVATE || process.env.AWS_BUCKET_PRIVATE
      : process.env.S3_BUCKET || process.env.MINIO_BUCKET || process.env.AWS_BUCKET;

    const { pathForDatabase } = generateFolder(file?.path);
    let buffer = fileData?.buffer;
    const mime = fileData?.mimetype;

    let watermarkImage;
    if (additional.isWatermark) {
      const pathWatermarked = path.join(__dirname, `../../storages/tmp/${fileName}`);
      watermarkImage = await addWatermark(buffer, pathWatermarked);
      buffer = fs.readFileSync(watermarkImage);
      fileName = additional.fileNames ? `watermark-${additional.fileNames}` : `watermark-${fileName}`;
    }

    if (additional.compressImage && mime && mime.startsWith('image/')) {
      try {
        const resizedBuffer = await resizeImage(buffer, mime, fileName);
        if (resizedBuffer) {
          buffer = resizedBuffer;
        }
      } catch (error) {
        console.warn('Image compression failed, using original buffer:', error.message);
      }
    }

    const objectName = `${pathForDatabase}${fileName}`;
    const contentType = additional.isContentType ? mime : 'application/octet-stream';

    // Upload to MinIO
    const uploadResult = additional.isPrivate
      ? await uploadToMinioPrivate(bucketName, objectName, buffer, contentType)
      : await uploadToMinio(objectName, buffer, contentType, bucketName);

    // Remove temporary watermarked image
    if (additional.isWatermark && watermarkImage) {
      fs.unlink(watermarkImage, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }

    if (uploadResult.success) {
      logger(filePath, 'upload').write(`Success uploading file ${fileName} to MinIO bucket ${bucketName} ${logDateFormat()}\n`);
      return uploadResult.url; // Return the new URL directly
    } else {
      logger(filePath, 'upload').write(`Error uploading file ${fileName} to MinIO bucket ${bucketName} ${logDateFormat()}\n`);
      return row?.payload; // Return existing payload if upload fails
    }
  } catch (error) {
    console.error('Error MinIO Upload Put: ', error);
    return row?.payload;
  }
};

module.exports = {
  generateMinioUpload,
  generateMinioUploadUpdated
};
