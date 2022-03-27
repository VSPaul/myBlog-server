const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const manage = require('../middlewares/helpers');

exports.getAllPosts = async (req, res) => {
    console.log(Date(), '\n', "CALLING GET ALL POSTS");
    try {
        const postsFolder = './src/posts';
        fs.readdir(postsFolder, (err, files) => {
            const blogs = files.filter(fn => fn.endsWith(".md"))
            // console.log('blogs', blogs);
            res.status(200).send(blogs);
        });
    } catch (err) {
        console.log(err)
    }
};

exports.getPostContent = async (req, res) => {
    console.log(Date(), '\n', "CALLING GET POST CONTENT");
    try {
        const filesPath = path.join(__dirname, '../posts')
        const str = fs.readFileSync(`${filesPath}/${req.body.post}`, 'utf8');
        res.status(200).send(matter(str));
        // res.status(200).send({content:str});
        // console.log('ceva', str)
    } catch (err) {
        console.log(err);
    }
};

exports.addPost = async (req, res) => {
    console.log(Date(), '\n', "CALLING ADD POST");
    console.log('req files', req.files)
    try {
        const filePath = manage.saveFile(req.files.file);

        res.status(200).send({ message: "Successfully updated!" });

    } catch (err) {
        console.log(err);
    }
};