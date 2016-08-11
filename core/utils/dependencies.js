import path from 'path';
let pkgpath = path.join(__dirname, '../../package.json');

export default require(pkgpath).dependencies;