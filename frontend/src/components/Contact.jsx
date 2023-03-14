import { useDispatch } from "react-redux";
import { setActiveChat } from "../redux";
export default function Contact({ friend, refFriendSection }) {
  const dispatch = useDispatch();
  return (
    <div
      className="w-full rounded-lg bg-slate-200 flex gap-3 items-center px-3 py-1 cursor-pointer"
      onClick={() => {
        refFriendSection.current.classList.remove("translate-x-full");
        dispatch(setActiveChat({friendId:friend._id}))
      }}
    >
      <img
        src={`http://localhost:3000/${friend.imgPath}`}
        alt={`${friend.name}`}
        className="object-cover w-12 h-12 rounded-full"
      />
      <div>
        <h5 className="font-black">{friend.name}</h5>
        <p>last mssg</p>
      </div>
    </div>
  );
}
