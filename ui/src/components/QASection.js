import React, { useState } from "react";
import { BiCommentDetail, BiLike } from "react-icons/bi";
import QASection_replies from "./QASection_replies";

export function QASection() {
  const [repliesToggle, setRepliesToggle] = useState(false);
  const [seeMoreToggle, setSeeMoreToggle] = useState(false);

  const string =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.";
  const limitOfString = 100;

  return (
    <div className="QA_section ">
      <h2 className="text-2xl font-semibold mb-2">Comments</h2>
      <div className="QA_question-box flex">
        <div className="w-10 h-10 rounded-full flex-none">
          {" "}
          <img
            src="https://i.pinimg.com/736x/d4/15/95/d415956c03d9ca8783bfb3c5cc984dde.jpg"
            className="rounded-full max-w-full h-auto align-middle"
            alt=""
          ></img>
        </div>
        <div className="ml-3">
          <div className="QA_name text-slate-700 text-xs">Duong</div>
          <div className="QA_question  max-w-2xl">
            {string.length > limitOfString ? (
              <span>
                {seeMoreToggle ? string : string.substr(0, limitOfString)}
                <span
                  onClick={() => setSeeMoreToggle(true)}
                  className="cursor-pointer"
                >
                  {" "}
                  {seeMoreToggle ? "" : " ...See more"}
                </span>
              </span>
            ) : (
              string
            )}
          </div>
          <div className="flex mt-1">
            <div className="flex items-center h-5 text-violet-800 cursor-pointer">
              <BiLike />
              <span>Like</span>
            </div>
            <div
              className="ml-2 mb-1 flex items-center h-5 text-violet-800 cursor-pointer"
              onClick={() => setRepliesToggle(true)}
            >
              <BiCommentDetail />
              <span>Replies</span>
            </div>
          </div>
          {repliesToggle ? (
            <div>
              <QASection_replies />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
