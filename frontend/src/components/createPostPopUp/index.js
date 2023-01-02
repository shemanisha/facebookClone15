import { useState } from "react";
import "./style.css";

export default function CreatePostPopUp({ user }) {
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState("");
  return (
    <div>
      <div className="blur">
        <div className="postBox">
          <div className="box-header">
            <div className="small_circle">
              <i className="exit_icon"></i>
            </div>
            <span>Create Post</span>
          </div>
          <div className="box_profile">
            <img
              src="{user.profile}"
              alt="userProfile"
              className="box_profile_img"
            />
            <div className="box_col">
              <p className="box_profile_name"> Manisha Shete</p>
              {/* {user.lastname} */}
              <div className="box_privacy">
                <img src="../../../icons/public.png" alt="publicIcon" />
                <span>Public</span>
                <i className="arrowDown_icon"></i>
              </div>
            </div>
          </div>
          <div className="flex_center">
            {!showPrev && (
              <textarea
                maxlength="100"
                value={text}
                placeholder={`whats on your mind?`}
                className="post_input"
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            )}
            <div className="post_emojis_wrap">
              <div className="comment_emoji_picker rlmove"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
