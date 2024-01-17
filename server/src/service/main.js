const db = require('../db/controller')

exports.home = (req, res) => {
    const QUERY = req.query.cat ? 'SELECT u.user_id, user_name, profile, post_no, img_path, p.desc, title, cate FROM users u JOIN posts p USING(user_id) WHERE p.cate = (?)' : 'SELECT u.user_id, user_name, profile, post_no, img_path, p.desc, title, cate FROM users u JOIN posts p USING(user_id)'
    db.query(QUERY, req.query.cat, (err, data)=> {
        if(err) return res.status(400).json(err)
        else return res.status(200).json(data)
    })
}

exports.getLikes = (req, res) => {
    const post = req.params.id
    const QUERY = "SELECT `user_id` FROM `post_likes` WHERE post_no = (?)"
    db.query(QUERY, post, (err, data) => {
        if(err) return res.status(400).json("Error on server")
        else return res.status(200).json(data)
    })

}

exports.getProfile = (req, res) => {
    const id = req.params.id
    const QUERY = "SELECT user_name, profile FROM `users` WHERE user_id = (?)"
    db.query(QUERY, id, (err, data) => {
        if(err) return res.status(400).json("Error on server")
        else return res.status(200).json(data)
    })
}