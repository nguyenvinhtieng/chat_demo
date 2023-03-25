const User = require('../models/User');
const ChatThread = require('../models/ChatThread');
const ChatContent = require('../models/ChatContent');
class MainController {
    async Login(req, res, next) {
        try {
            let { displayName, email, photoURL } = req.body;
            let user = await User.findOne({ email });
            if(!displayName || !email || !photoURL) {
                return res.json({ status: false, message: "Missing required fields" });
            }
            if (user) {
                return res.json({ status: true, message: "Login successfully", data: user });
            }
            user = new User({ displayName, email, photoURL });
            await user.save();
            return res.json({ status: true, message: "Login successfully", data: user });
        }catch(err) {
            return res.json({status: false, message: "Server Internal Error"});
        }
    }

    async sendMessage(req, res, next) {
        try {
            let { sender_email, receiver_email, content, createdAt } = req.body;  
            let receiver = await User.findOne({ email: receiver_email });
            let sender = await User.findOne({ email: sender_email });
            if (!receiver) {
                return res.json({ status: false, message: "Receiver not found" });
            }
            if (!sender) {
                return res.json({ status: false, message: "Sender not found" });
            }

            let chatThread = await ChatThread.findOne({ 
                $or: [
                        { user1: sender._id, user2: receiver._id }, 
                        { user1: receiver._id, user2: sender._id }
                    ]
                }
            ).populate('user1').populate('user2');
            if (!chatThread) {
                chatThread = new ChatThread({ user1: sender._id, user2: receiver._id, lastMessage: content, lastMessageTime: Date.now() });
                await chatThread.save();
                chatThread = await ChatThread.findById(chatThread._id).populate('user1').populate('user2');
            }

            let chatContent = new ChatContent({ sender: sender._id, receiver: receiver._id, content, createdAt });
            await chatContent.save()

            chatThread.lastMessage = content;
            chatThread.lastMessageTime = createdAt;
            await chatThread.save();
            let dataChat = await ChatContent.findOne({_id: chatContent._id}).populate('sender').populate('receiver')
            return res.json({ status: true, message: "Send message successfully" , data: dataChat , chatThread});

        }catch(err) {
            return res.json({status: false, message: "Server Internal Error"});
        }
    }


    async getAllChatThread(req, res, next) {
        try {
            let { my_email } = req.body;
            let user = await User.findOne({ email: my_email });
            if (!user) {
                return res.json({ status: false, message: "User not found" });
            }
            let chatThreads = await ChatThread.find({
                $or: [
                    { user1: user._id },
                    { user2: user._id }
                ]
            }).populate('user1').populate('user2')
            return res.json({ status: true, message: "Get all chat thread successfully", data: chatThreads });
        }catch(err) {
            return res.json({status: false, message: "Server Internal Error"});
        }
    }

    async getChatContent(req, res, next) {
        try {
            let { my_email, receiver_email } = req.body;
            let me = await User.findOne({ email: my_email });
            let receiver = await User.findOne({ email: receiver_email });
            if(!me || !receiver) {
                return res.json({ status: false, message: "User not found" });
            }

            let chats = await ChatContent.find({
                $or: [
                    { sender: me._id, receiver: receiver._id },
                    { sender: receiver._id, receiver: me._id }
                ]
            }).populate('sender').populate('receiver').sort({ createdAt: 1 })

            return res.json({ status: true, message: "Get chat content successfully", data: chats });
        }catch(err) {
            return res.json({status: false, message: "Server Internal Error"});
        }
    }

    async getUser(req, res, next) {
        try {
            let { email } = req.body;
            let userFind = await User.find({email: {$regex : email}})
            return res.json({ status: true, message: "Get user successfully", users: userFind });
        }catch(err) {
            return res.json({status: false, message: "Server Internal Error"});
        }
    }
}

module.exports = new MainController();
