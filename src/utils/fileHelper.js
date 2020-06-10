const fs = window.require('fs').promises
// eslint-disable-next-line no-unused-vars
const path = window.require('path')

const fileHelper = {
  readFile: (path) => {
    return fs.readFile(path, {
      encoding: 'utf8'
    })
  },
  writeFile: (path, content) => {
    return fs.writeFile(path, content, {
      encoding: 'utf8'
    })
  },
  renameFile: (path, newPath) => {
    return fs.rename(path, newPath)
  },
  deleteFile: (path) => {
    return fs.unlink(path)
  }
}

export default fileHelper;

//const testPath = path.join(__dirname, 'helper.js')
//const testWritePath = path.join(__dirname, 'hello.md')
//const renamePath = path.join(__dirname, 'rename.md')

/* fileHelper.readFile(testPath).then((data) => {
  console.log(data)
})
fileHelper.writeFile(testWritePath, '## hello world!').then(() => {
  console.log('input successed')
}) */

/* fileHelper.renameFile(testWritePath, renamePath).then(() => {
  console.log('rename successed')
}) */

/* fileHelper.deleteFile(renamePath).then(() => {
  console.log(`${renamePath} delete successed`)
}) */