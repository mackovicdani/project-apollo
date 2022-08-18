import type { Ref } from "@typegoose/typegoose";
import {
  DocumentType,
  getModelForClass,
  modelOptions,
  pre,
  prop,
  Severity,
} from "@typegoose/typegoose";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export class Wallet {
  @prop({ default: 0 })
  money: number;

  @prop({ ref: () => User })
  public sharedUsers?: Ref<User>[];
}

@pre<User>("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  return;
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

  @prop({ default: new Wallet() })
  public wallet: Wallet;

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

  public async addMoney(this: DocumentType<User>, amount: number) {
    this.wallet.money += amount;
    await this.save();
  }
}

const UserModel = getModelForClass(User);

export default UserModel;
