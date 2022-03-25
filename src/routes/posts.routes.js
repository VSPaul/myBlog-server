// const { verifyRegister, verifyJwt } = require("../middlewares");
const controller = require("../controllers/posts.controller");

module.exports = (app) => {
   

    app.post("/getPosts",
        controller.getAllPosts
    );

    app.post("/getPostContent",
        controller.getPostContent
    );
};
