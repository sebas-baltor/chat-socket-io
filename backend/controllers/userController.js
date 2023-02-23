import User from "../models/User.js";
import { bucket } from "../multer-gfs/index.js";
const userController = {};
userController.getById = async (req, res) => {
  try {
    let { id } = req.params;
    let user = await User.findById(id);

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
    if(user.friends.includes(friend._id)){
      return res.status(200).json({ message: "both are friends" });
    }
    // if both wanted to be friends, we'll be
    if (user.request.includes(friend._id)) {
      // add friend relation
      user.friends.push(friend._id);
      friend.friends.push(user._id);
      // find index of the friend request
      let requestIndex = user.request.indexOf(friend._id);
      // delete the old friend request
      user.request.splice(requestIndex,1);
      await user.save();
      await friend.save();
      return res.status(200).json({ message: "success friend added" });
    }
    // if I only want to have a friend
    friend.request.push(user._id);
    await friend.save();
    return res.status(200).json({ message: "success friend request"});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

userController.getFriends= async (req,res)=>{
  try{
    const {id} = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map(id=>User.findById(id,"_id name lastname imgPath phone"))
    )
    res.status(200).json({friends});

  }catch(err){
    res.status(500).json({message:err.message})
  }
}

userController.removeFriendship = async (req,res)=>{
  try{
    const {id,friendId} = req.params;
    let user = await User.findById(id);
    let friend = await User.findById(friendId);
    
    let userFriendIndex = user.friends.indexOf(friend._id);
    let friendFriendIndex = friend.friends.indexOf(user._id);

    user.friends.splice(userFriendIndex,1);
    friend.friends.splice(friendFriendIndex,1);

    user.save();
    friend.save();

    return res.status(200).json({message:"success friend deleting"});

  }catch(err){
    return res.status(500).json({message:err.message})
  }
}

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
