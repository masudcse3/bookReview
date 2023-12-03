/** @format */

const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, "Name is required"],
      minLength: 3,
      maxLength: 15,
    },
    email: {
      type: String,
      require: [true, "Email is required"],
      unique: true,
      validate: {
        validator: function (v) {
          return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/.test(
            v
          );
        },
        message: (props) => `${props.value} is not a valid email format`,
      },
    },
    password: {
      type: String,
      require: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["admin", "publisher", "user"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "blocked", "declined"],
      default: "pending",
    },
  },
  { timestamps: true, id: true }
);

const User = model("User", userSchema);
module.exports = User;
