import React, { useEffect, useState } from "react";
import FlipMove from "react-flip-move";
import "./Feed.css";
import { Avatar } from "@mui/material";
import InputOption from "./InputOption";
import ImageIcon from "@mui/icons-material/Image";
import CreateIcon from "@mui/icons-material/Create";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ArticleIcon from "@mui/icons-material/Article";
import Post from "./Post";
import { db } from "../firebase";
import {
  doc,
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

function Feed({ avatar }) {
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);

  const user = useSelector(selectUser);

  useEffect(() => {
    async function updatePosts() {
      const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);

      setPosts(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    }
    updatePosts();
  }, [posts]);

  const sendPost = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "posts"), {
      name: user.displayName,
      description: user.email,
      message: input,
      photoUrl: user.photoUrl || "",
      timestamp: serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="feed">
      <div className="feed-input-container">
        <div className="feed-input">
          <Avatar className="feed-input-avatar" src={avatar} />
          <div className="feed-input-text">
            <CreateIcon />
            <form>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
              ></input>
              <button onClick={sendPost} type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
        <div className="feed-input-options">
          <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
          <InputOption Icon={SmartDisplayIcon} title="Video" color="#7FC15E" />
          <InputOption Icon={EventNoteIcon} title="Event" color="#E7A33E" />
          <InputOption
            Icon={ArticleIcon}
            title="Write article"
            color="#f84d28"
          />
        </div>
      </div>

      <FlipMove>
        {posts.map(({ id, data: { name, description, message, photoUrl } }) => {
          return (
            <Post
              key={id}
              name={name}
              description={description}
              message={message}
              photoUrl={photoUrl}
            />
          );
        })}
      </FlipMove>
    </div>
  );
}

export default Feed;
