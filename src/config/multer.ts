import multer from 'multer'
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'

export const upload = (pathFiles: string) => multer({
  storage: multerS3({
    s3: new aws.S3(),
    bucket: `${process.env.BUCKET_NAME}/${pathFiles}`,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: function (_req:any, file:any, cb:any) {
      file.originalname = file.originalname.replace(/ /gim, '').trim()
      cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
  })
})
