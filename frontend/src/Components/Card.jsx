import React, { useState } from "react";
import "./Card.css";
import moreAction from "../images/more-action.PNG";
import { useSelector } from "react-redux";
import axios from "axios";

const Card = (props) => {
  // const [allposts, setAllposts] = useState([]);

  const [commentBox, setCommentBox] = useState(false);
  const [comment, setComment] = useState("");

  const user = useSelector((state) => state.userReducer);

  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const submitComment = (postId) => {
    // console.log(comment
  };

  const likeDislikePost = async (postId, type) => {
    const request = { postId: postId };
    const response = await axios.put(
      `http://localhost:5000/${type}`,
      request,
      CONFIG_OBJ
    );
    if (response.status === 200) {
      props.getAllPosts();
    }
    // return response;
  };
  return (
    <div>
      <div className="card shadow-sm">
        <div className="card-body px-2">
          <div className="row">
            <div className="col-6 d-flex">
              <img
                className="profile-pic p-1"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZSUyMHBpY3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                alt="profile-pic"
              />
              <div className="mt-2 ms-2">
                <p className="fs-6 fw-semibold">
                  {props.postData.author.fullName}
                </p>
                <p className="location">{props.postData.location}</p>
              </div>
            </div>
            {props.postData.author._id === user.user._id ? (
              <div className="col-6 ">
                <img
                  onClick={() => props.deletePost(props.postData._id)}
                  className="float-end fs-3 p-2 mt-2"
                  src={moreAction}
                  alt="More Action"
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <img
                className="post-img py-2 px-3"
                src={props.postData.image}
                alt="Post Pic"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6 d-flex">
              <i
                onClick={() => likeDislikePost(props.postData._id, "like")}
                className="ps-3 fs-4 fa-regular fa-heart"
              ></i>
              <i
                onClick={() => likeDislikePost(props.postData._id, "unlike")}
                className="ps-3 fs-4 fa-regular fa-thumbs-down"
              ></i>
              <i
                onClick={() => setCommentBox(true)}
                className="ps-3 fs-4 fa-regular fa-comment"
              ></i>
              {/* <i className="fa-light fa-thumbs-down"></i> */}
            </div>
            <div className="col-6">
              <span className="pe-3 fs-6 fw-bold float-end">
                {props.postData.likes.length} likes
              </span>
              <br />
            </div>
            <p className="mt-2 fw-semibold">{props.postData.description}</p>
            {commentBox ? (
              <div className="row align-items-center justify-content-center ps-3 pe-3">
                <div className="col-10 ">
                  <textarea
                    onChange={(e) => setComment(e.target.value)}
                    className="form-control"
                  ></textarea>
                </div>
                <div className="col-2">
                  <i
                    onClick={() => submitComment(props.postData._id)}
                    className=" btn ps-3 fs-4 fa-regular fa-paper-plane"
                  ></i>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="row">
            <div className="col-12">
              <span className="ps-3 text-muted">2 Hours Ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
