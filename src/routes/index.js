/** @format */
const { controllers: userController } = require("../api/v1/user");
const { controllers: bookController } = require("../api/v1/book/");
const { controllers: authController } = require("../api/v1/auth/");
const { controllers: reviewController } = require("../api/v1/review");

const authentication = require("../middleware/authentication");
const authorize = require("../middleware/authorization");
const ownership = require("../middleware/ownership");
const router = require("express").Router();

// Auth router
router
  .post("/auth/register", authController.register)
  .post("/auth/login", authController.login);

// Book router
router
  .route("/books")
  .get(bookController.findAll)
  .post(
    authentication,
    authorize(["admin", "publisher"]),
    bookController.createBook
  );

router
  .route("/books/:id")
  .get(bookController.findById)
  .put(
    authentication,
    authorize(["admin", "publisher"]),
    ownership("Book"),
    bookController.updateBook
  )
  .delete(
    authentication,
    authorize(["admin", "publisher"]),
    ownership("Book"),
    bookController.deleteBook
  );
// Review router
router
  .route("/books/:id/reviews")
  .get(reviewController.findForBook)
  .post(
    authentication,
    authorize(["admin", "user"]),
    reviewController.createReview
  );
router.get("/reviews", reviewController.findAll);
router
  .route("/reviews/:id")
  .get(reviewController.findOne)
  .put(
    authentication,
    authorize(["admin", "user"]),
    ownership("Review"),
    reviewController.updateOne
  )
  .delete(
    authentication,
    authorize(["admin", "user"]),
    ownership("Review"),
    reviewController.deleteOne
  );
// User router
router.post("/users", userController.createUser);
router.get("/users", userController.getAllUsers);

router
  .route("/users/:id")
  .get(authentication, authorize(), userController.findById)
  .patch(authentication, authorize(), userController.updateUser)
  .delete(authentication, authorize(), userController.deleteUser);

module.exports = router;
