const multer = require('multer');
const path = require('path');
let randomId = require('random-id');


let len = 17;
let pattern = 'aA0';
let random = randomId(len, pattern);

const createPK = (str) => {
    let strMod = str.split(/\s/).join('');
    let pk = '';
    for (let i = 0; i < strMod.length; i++) {
        if (strMod[i] === strMod[i].toUpperCase()) {
            pk = pk + strMod[i] + random;
        } else {
            pk = strMod.toUpperCase() + random;
        }
    }
    // console.log(pk);
    return pk;
};
// let randomNum = Math.floor(1000000 + Math.random() * 9000000000)

// Random Id Generator For Images
const uuidv4 = () => {
    return 'xxxx-xxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

// Image Destination and Name
const storage = multer.diskStorage({
    destination: './src/uploads/profilepictures/',
    filename: function (req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${uuidv4()}-${Date.now()}-${file.originalname}`
        );
    },
});

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif|webp/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error');
    }
};

// Init Image Upload
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
}).single('file');


const helpers = {
    upload: upload,
    createPK: createPK,
};

module.exports = helpers;