import User from "../models/User.js";
import { bucket } from "../multer-gfs/index.js";
const userController = {};
userController.getById = async (req, res) => {
  try {
    let { id } = req.params;
    let user = await User.findById(id).populate("request","name _id lastname imgPath").populate("friends");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
userController.profilePhoto = async (req, res) => {
  const { filename } = req.params;
  const file = bucket
    .find({
      filename,
    })
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist",
        });
      }
      bucket.openDownloadStreamByName(filename).pipe(res);
    });
};
userController.friendRequest = async (req, res) => {
  try {
    let { id, friendId } = req.params;
    // search of user(me) and frien(future friend)
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    console.log({ user, friend });
    // we are friends
    if (user.friends.includes(friend._id)) {
      return res.status(200).json({ message: "both are friends"});
    }
    // if both wanted to be friends, we'll be
    if (user.request.includes(friend._id)) {
      // add friend relation
      user.friends.push(friend._id);
      friend.friends.push(user._id);
      // find index of the friend request
      let requestIndex = user.request.indexOf(friend._id);
      // delete the old friend request
      user.request.splice(requestIndex, 1);
      await user.save();
      await friend.save();
      return res.status(200).json({ message: "success friend added" });
    }
    // if I only want to have a friend and it wasn't requested before
    if(!friend.request.includes(user._id)){
      friend.request.push(user._id);
    }
    await friend.save();
    return res.status(200).json({ message: "success friend request" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

userController.getFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const {friends,request} = await User.findById(id).populate("friends").populate("request","name _id lastname imgPath");
    res.status(200).json({ friends,request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

userController.removeFriendship = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    let user = await User.findById(id);
    let friend = await User.findById(friendId);

    let userFriendIndex = user.friends.indexOf(friend._id);
    let friendFriendIndex = friend.friends.indexOf(user._id);

    user.friends.splice(userFriendIndex, 1);
    friend.friends.splice(friendFriendIndex, 1);

    user.save();
    friend.save();

    return res.status(200).json({ message: "success friend deleting" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
userController.findPeople = async (req, res) => {
  try {
    const { name, lastname } = req.params;
    const { id } = req.user;
    // necessary to exclude
    const user = await User.findById(id);
    // filter to find a user with same characteristics
    let filter = {
      name: { $regex: name, $options: "i" },
      // excluding all my friends
      _id: { $ne: user.friends },
      // exluding myself
      email: {$ne:user.email}
    };
    // only if the lastname is pased
    if (lastname !== undefined) {
      filter.lastname = { $regex: lastname, $options: "i" };
    }
    let match = await User.find(filter, "name lastname imgPath _id");
    if (match.length > 0) {
      return res.status(200).json(match);
    }
    return res.status(204).json(match);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
// userController.addRemoveFriend = async (req,res)=>{
//     try{
//         let {id,friendId} = req.params;
//         const user = await User.findById(id);
//         const friend = await User.findById(friendId);

//     }catch(err){
//         res.status(500).json({message:err.message})
//     }
// }
export default userController;
