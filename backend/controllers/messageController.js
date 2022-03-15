const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const Message = require("../models/messageModel");
const res = require("express/lib/response");

//@description      Send new Message
//@route            POST /api/message
//@access           Private

const sendMessage = asyncHandler(async (req, res) => {
  const { msg, chatId } = req.body;

  if (!msg || !chatId) {
    throw new Error("Invalid data pass into the request");
    return res.sendStatus(400);
  }
  var newMsg = {
    sender: req.user._id,
    content: msg,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMsg);
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");

    message = await User.populate(message, {
      path: "chat.users",
      select: "name email pic",
    });

    await Chat.findByIdAndUpdate(
      req.body.chatId,
      {
        latestMessage: message,
      },
      {
        new: true,
      }
    );

    res.json(message);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

//@description      Fetch All The Messages Of One Chat
//@route            GET /api/message/:chatId
//@access           Private

const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");

    if (!messages) {
      res.status(400);
      throw new Error("Invalid data pass into the request");
    }
    res.json(messages);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

module.exports = { sendMessage, allMessages };
