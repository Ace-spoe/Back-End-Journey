const path = require('path')

const folder = path.dirname('/users/john/file.txt')
console.log(folder) // /users/john

const file = path.basename('/users/john/file.txt')
console.log(file) // file.txt

const ext = path.extname('/users/john/file.txt')
console.log(ext) // .txt

const fullPath = path.join('users', 'john', 'docs', 'file.txt')
console.log(fullPath)
//users\john\docs\file.txt
// differs in mac and linux

const parsed = path.parse('/users/john/file.txt')
console.log(parsed)
// {
//   root: '/',
//   dir: '/users/john',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file'
// }
