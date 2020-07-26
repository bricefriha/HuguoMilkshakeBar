import multer from 'multer';


 var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './ressources/uploads/');
    },
    filename: (req, file, cb) => {
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});

export const upload = multer({storage: storage});