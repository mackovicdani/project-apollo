import {
  DocumentType,
  getModelForClass,
  modelOptions,
  post,
  pre,
  prop,
  Severity,
} from "@typegoose/typegoose";
import ErrorResponse from "../lib/errorResponse";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
@pre<User>("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  return;
})
@post<User>("save", async function (error: any, doc: any, next: any) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new ErrorResponse("Email must be unique", 400));
  } else {
    next(error);
  }
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class User {
  @prop({ required: [true, "Please provide a name"] })
  public name?: string;

  @prop({
    required: [true, "Please provide a email"],
    unique: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  })
  public email?: string;

  @prop({
    required: [true, "Please provide a password"],
    select: false,
    minlength: 6,
  })
  public password: string;

  @prop()
  public profilepic: string;

  @prop({ default: 0 })
  public pentaltypoints: number;

  @prop({ default: true })
  public atHouse: boolean;

  public async matchPasswords(this: DocumentType<User>, password: string) {
    return await bcrypt.compare(password, this.password);
  }

  public getSignToken(this: DocumentType<User>) {
    return jwt.sign({ id: this._id, name: this.name }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  }
}

const UserModel = getModelForClass(User);

export default UserModel;
