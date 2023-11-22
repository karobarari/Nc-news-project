const {
  selectTopics,
  readEndpoints,
  selectArticle,
  selectArticlesById,
  selectComment,
} = require("./app.models");

exports.apiDescription = (req, res, next) => {
  readEndpoints((err, endpointData) => {
    if (err) {
      console.error("Error fetching API descriptions:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.status(200).json(endpointData);
  });
};

exports.getAllTopics = (req, res, next) => {
  selectTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

exports.getArticle = (req, res, next) => {
  selectArticle()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticlesById(article_id)
    .then((article) => {
      res.status(200).send(article);
    })
    .catch(next);
};

exports.getCommentsByArticle = (req, res, next) => {
  const { article_id } = req.params;
  selectComment(article_id)
    .then((article) => {
      res.status(200).send(article);
    }).catch((err=>{
      next(err)
    }));
};
