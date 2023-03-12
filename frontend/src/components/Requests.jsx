import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { setFriendsAndRequest } from "../redux";
import styles from "../style";
export default function Request({ friend }) {
  const dispatch = useDispatch();
  const { _id, name, lastname, imgPath } = friend;
  const { user, token } = useSelector((state) => state);
  // console.log(friend);
  return (
    <div className="w-full grid grid-cols-3 gap-3 items-center">
      <img
        src={`http://localhost:3000/${imgPath}`}
        alt={_id + name}
        className="object-cover w-12 h-12 rounded-full"
      />
      <div className="font-bold">
        {name}
        <div className="text-xs font-semibold">{lastname}</div>
      </div>
      <button
        className={`w-10 h-10 border-violet-400 border-2 rounded-full bg-transparent text-violet-400 ${styles.flexCenter} hover:bg-violet-400 hover:text-white justify-self-end`}
        onClick={async () => {
          let request = await fetch(
            `http://localhost:3000/user/friend-request/${user._id}/${_id}`,
            {
              method: "PATCH",
              headers: {
                Authorization: token,
                "Content-Type": "application/json",
              },
            }
          )
          let res = await request.json();
          console.log(res);
          if(request.status !== 500){
            request = await fetch(`http://localhost:3000/user/friends/${user._id}`, {
              headers: {
                Authorization: token,
              },
            })
            res = await request.json();
            console.log(res);
            dispatch(setFriendsAndRequest(res));
          }
        }}
      >
        <AiOutlineUsergroupAdd className="text-xl" />
      </button>
    </div>
  );
}
