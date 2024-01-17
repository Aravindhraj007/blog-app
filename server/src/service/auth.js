const db = require('../db/controller')
const bycrpt = require('bcrypt')
const cookies = require('cookies')
const jwt = require('jsonwebtoken')


const checkAlreadyPresent = (QUERY, input) => {
    db.query(QUERY, input, (err, data) => {
        if(data.length > 0){
            return true
        }else return false
    })

}

// ------------ REGISTER ------------

exports.register = (req, res) => {
    const values = [
        req.body.username,
        req.body.email,
        req.body.password,
        req.body.confirm
    ]
    const QUERY = "SELECT * FROM `users` WHERE user_name = ?"
    db.query(QUERY, values[0], (err, data) => {
        if (err) return res.status(400).json("Error on server")
        else {
            if (data.length > 0) return res.status(403).json("User already exist")
            else {
                if (values[3] !== values[2]) {
                    return res.status(403).json("Password not match")
                } else {
                    bycrpt.hash(values[2], 10, (err, hash) => {
                        if (err) return res.status(400).json("Error on hash")
                        else {
                            const pass = [
                                req.body.username,
                                req.body.email,
                                hash
                            ]
                            const QUERY_REG = 'INSERT INTO `users` (`user_name`, `email`, `password`) VALUES (?)'
                            db.query(QUERY_REG, [pass], (err, data) => {
                                if (err) res.status(400).json("Error on server")
                                else return res.status(200).json(`Successfully registered ${values[0]}`)
                            })
                        }
                    })
                }

            }
        }
    })
}

// ------------ LOGIN ------------

exports.login = (req, res) => {
    const QUERY = "SELECT * FROM `users` WHERE user_name = ?"
    db.query(QUERY, req.body.username, (error, data) => {
        if(error) return res.status(400).json("Error on server")
        else if(data.length===0) return res.status(403).json("User not exit")
        else{
            bycrpt.compare(req.body.password, data[0].password, (err, result) => {
                if(error) return res.status(400).json("Error on server")
                if(!result){
                    return res.status(403).json("Password not match")
                }else{
                    const auth = {
                        id: data[0].user_id,
                        name: data[0].user_name
                    }
                    const token = jwt.sign({auth}, 'blog-secret-key', {expiresIn: '1d'})
                    res.cookie('token', token, {maxAge: 100000000, httpOnly: true, secure: true})
                    return res.status(200).json(data[0].user_name)
                }
            })    
        }
    })
}

// ------------ LOG OUT ------------

exports.logout = (req, res) => {
    res.clearCookie('token', {secure: true})
    return res.status(200).json('Successfully log out')
}

// ------------ CHECK TOKEN  ------------

exports.checkToken = (req, res) => {
    const token = req.cookies.token
    if(token){
        jwt.verify(token, 'blog-secret-key', (err, decode) => {
            if(err){
                res.clearCookie('token')
                return res.status(400).json(err)
            } 
            else if(!decode) return res.status(200).json({auth: null, isTrue: false})
            else return res.status(200).json({auth: decode.auth, isTrue: true})
        })
    }else return res.status(200).json({auth: null, isTrue: false})
}

// ------------ UPLOAD  ------------

exports.upload = (req, res) => {
    const QUERY = "INSERT INTO `posts` (`user_id`, `img_path`, `desc`, `title`, `cate`) VALUES (?); "
    const token = req.cookies.token
    const decode = jwt.decode(token)
    const value = [
        decode.auth.id,
        req.body.path,
        req.body.desc,
        req.body.title,
        req.body.cate
    ]
    db.query(QUERY, [value], (err, data) => {
        if(err) return res.status(400).json("Error on server")
        else return res.status(200).json("Image uploaded successfully")
    })
    
}

// ------------ DELETE ------------

exports.deletePost = (req, res) => {
    const token = req.cookies.token
    const postId = req.params.postNo
    const QUERY = "DELETE FROM `posts` WHERE `post_no` = (?)"
    jwt.verify(token, 'blog-secret-key', (err, decode) => {
        if(err) return res.status(400).json("Error on verification")
        if(!decode) return res.status(200).json(false)
        else {
            console.log(postId)
            db.query(QUERY, postId, (err, result) => {
                if(err) return res.status(400).json("Error on server")
                else return res.status(200).json("Deleted")
            })
        }
    }) 
    }

exports.editPost = (req, res) => {
    const token = req.cookies.token
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cate,
    ]
    const postNo = req.body.postNo
    const QUERY = "UPDATE posts SET `title` = ?, `desc` = ?, `cate` = ? WHERE post_no = ? AND user_id = ?"
    jwt.verify(token, 'blog-secret-key', (err, decode) => {
        if(err) return res.status(400).json("Error on verification")
        if(!decode) return res.status(200).json(false)
        else {
            const userId = decode.auth.id
            db.query(QUERY, [...values, postNo, userId], (err, result) => {
                if(err) return res.status(400).json("Error on server")
                else return res.status(200).json("Changes are successfully updated")
            })
        }
    })

}

exports.checkIsLiked = (req, res) => {
    const token = req.cookies.token
    const post = req.params.id
    jwt.verify(token, 'blog-secret-key', (err, decode) => {
        if(err) return res.status(400).json("Error on server")
        if(!decode) return res.status(400).json("Reload the page")
        else {
            const id = decode.auth.id
            const QUERY = "SELECT * FROM `post_likes` WHERE user_id = (?) AND post_no = (?)"
            db.query(QUERY, [id, post], (err, data) => {
                if(err) return res.status(400).json("Error on server")
                else if(data.length === 0) return res.status(200).json(false)
                else return res.status(200).json(true)
            } )
        }
    })
}


exports.removeLike = (req, res) => {
    const token = req.cookies.token
    const value = [        
        jwt.decode(token).auth.id,
        Number(req.params.postno)
    ]
    const QUERY = "DELETE FROM `post_likes` WHERE user_id = (?) AND post_no = (?)"
    db.query(QUERY, value, (err, result) => {
        if(err) return res.status(400).json("Error on server")
        else return res.status(200).json(true)
    })
}

exports.addLike = (req, res) => {
    const token = req.cookies.token
    const value = [
        req.body.postNo,
        jwt.decode(token).auth.id
    ]
    const QUERY = "INSERT INTO `post_likes` (`post_no`, `user_id`) VALUES (?)"
    db.query(QUERY, [value], (err, data) => {
        if(err) return res.status(400).json("Error on server")
        else return res.status(200).json(true)
    })
}


exports.register2 = (req, res) => {
    console.log(req.body)
    const values = [
        req.body.username,
        req.body.email,
        req.body.password,
        req.body.confirm
    ]
    const QUERY_NAME = "SELECT user_name from users where user_name = (?)"
    const QUERY_EMAIL = "SELECT user_name from users where email = (?)"
    if(checkAlreadyPresent(QUERY_NAME, values[0])){
        return res.status(403).json("User already exist")
    }else{
        return res.status(200).json("Success")
    }

}