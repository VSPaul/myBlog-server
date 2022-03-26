// const { verifyRegister, verifyJwt } = require("../middlewares");
const controller = require("../controllers/posts.controller");

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            ("Access-Control-Allow-Origin", "*"),
            ('Access-Control-Allow-Credentials', true),
            "Access-Controll-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/getPosts",
        controller.getAllPosts
    );

    app.post("/getPostContent",
        controller.getPostContent
    );
};
