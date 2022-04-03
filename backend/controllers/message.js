/* eslint-disable import/prefer-default-export */
import { User, Message } from "../models";

export const getMessages = async (req, res) => {
  Message.findAll({
    order: ["timestamp"],
    raw: true,
    attributes: ["id", "userId", "message", "timestamp"],
  })
    .then(async (instance) => {
      const messages = await Promise.all(
        instance.map(async (e) => {
          const user = await User.findOne({
            where: {
              id: e.userId,
            },
            raw: true,
          });

          return {
            id: e.id,
            username: user.username,
            avatar: user.avatar,
            message: e.message,
            timestamp: e.timestamp,
          };
        })
      );
      res.status(200).json({ messages }).send();
    })
    .catch(() => {
      res.status(500).send();
    });
};

export const createMessage = async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.session.username,
    },
    raw: true,
  });

  await Message.create({
    // username: req.session.username,
    userId: user.id,
    message: req.body.message,
    timestamp: new Date(),
  })
    .then(() => {
      res.status(201).send();
    })
    .catch(() => {
      res.status(500).send();
    });
};

export const deleteMessage = async (req, res) => {
  Message.findOne({
    where: {
      id: req.body.id,
    },
    raw: true,
  })
    .then(async (message) => {
      const user = await User.findOne({
        where: {
          id: message.userId,
        },
        raw: true,
      });

      if (user.username === req.session.username) {
        Message.destroy({ where: { id: req.body.id } })
          .then(() => {
            res.status(202).send();
          })
          .catch(() => {
            res.status(500).send();
          });
      } else {
        res.status(403).send();
      }
    })
    .catch(() => {
      res.status(500).send();
    });
};
