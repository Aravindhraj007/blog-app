const express = require('express')
const main = require('../service/main')
const auth = require('../service/auth')
const multer = require('multer')
const jwt = require('jsonwebtoken')
const cookies = require('cookies')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, '../client/public/images/')
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const verifyToken = (req, res, next) => {
    const token = req.cookies.token
    if(!token){
        return res.status(400).json("Reload Page")
    }
    else{
        jwt.verify(token, 'blog-secret-key', (err, decode) => {
            if(err){
                res.clearCookie('token')
                return res.status(400).json("Reload Page")
            } 
            else next()
        })
    }
}

const upload = multer({storage})

const router = express.Router()

router.get('/', main.home)
router.get('/getLikes/:id', main.getLikes)
router.get('/getProfile/:id', verifyToken, main.getProfile)

router.get('/token', auth.checkToken)
router.post('/register', auth.register)
router.post('/login', auth.login)
router.get('/logout', verifyToken, auth.logout)
router.delete('/deletePost/:postNo', verifyToken, auth.deletePost)
router.post('/upload', verifyToken, auth.upload)
router.put('/edit', verifyToken, auth.editPost)
router.get('/isLiked/:id', verifyToken, auth.checkIsLiked)
router.delete('/removeLike/:postno', verifyToken, auth.removeLike)
router.post('/addLike', verifyToken, auth.addLike)
router.post('/fileUpload', verifyToken, upload.single('file'), (req, res) => {
    const file = req.file.filename
    return res.status(200).json(file.toString())
})

module.exports = router
