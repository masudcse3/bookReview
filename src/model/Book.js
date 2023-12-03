/** @format */

const { model, Schema } = require("mongoose");
const bookSchema = new Schema(
  {
    title: {
      type: String,
      require: [true, "Book title is required"],
      unique: true,
      minLength: 5,
      maxLength: 100,
    },
    writter: {
      type: String,
      require: [true, "Author is required"],
      minLength: 3,
      maxLength: 15,
    },
    price: {
      type: Number,
      require: [true, "Price is required"],
      validate: {
        validator: function (v) {
          return v > 0;
        },
        message: (props) => `price must be a positive number`,
      },
    },
    publication: {
      type: String,
      require: [true, "Publication is required"],
      minLength: 5,
      maxLength: 50,
    },
    cover: {
      type: String,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    author: {
      type: Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, id: false }
);

const Book = model("Book", bookSchema);
module.exports = Book;
