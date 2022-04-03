/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line max-classes-per-file
import { Sequelize, Model, DataTypes } from "sequelize";

const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable not set!");
}

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // YOU NEED THIS
    },
  },
});

export class User extends Model {}
User.init(
  {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING(5000),
  },
  { sequelize, modelName: "user" }
);

export class Message extends Model {}
Message.init(
  {
    message: DataTypes.STRING,
    timestamp: DataTypes.DATE,
  },
  { sequelize, modelName: "message" }
);
User.hasMany(Message);

User.sync();
Message.sync();
