const contentful = require('contentful-management')

const client = contentful.createClient({
  accessToken: 'mO4uNGr0cDRYDx2ZJ9nSHG6N6v0Dom9fnkcye_KqRF8'
})

client.getSpace('o9cqnq1nb15j')
.then((space) => space.getEnvironment('master'))
.then((environment) => environment.getUpload('<upload_id>'))
.then((upload) => upload.delete())
.then(() => console.log('Upload deleted.'))
.catch(console.error)
