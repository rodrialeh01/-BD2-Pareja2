import React, { useState, useEffect, useRef } from "react";
import SideBar from "../../components/Sidebar/Sidebar";
import Service from "../../Service/Service";
import { useNavigate } from "react-router-dom";

export default function Messages() {
  const [content, setContent] = useState("");

  useEffect(() => {
    textareaRefs.forEach((textareaRef) => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    });
  }, []);
  const [messages, setMessages] = useState([
    {
      content: "xd",
    },
    {
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum sadfk Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum sadfk Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum sadfk Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum sadfk Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum sadfk Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum sadfk Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum sadfk ",
    },
    {
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum sadfk Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum sadfk Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum sadfk Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum sadfk Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum sadfk Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum sadfk Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum sadfk  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum sadfk Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum sadfk Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum sadfk Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum sadfk Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum sadfk Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum sadfk Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum sadfk",
    },
  ]);
  const textareaRefs = messages.map(() => useRef(null));

  const getRows = (content) => {
    const lineCount = (content.match(/\n/g) || []).length + 1;
    const minRows = 1;
    return Math.max(lineCount, minRows);
  };

  return (
    <div className="flex bg-gray-100 h-screen">
      <SideBar />
      <div className="p-7 flex-1 flex flex-col">
        <div className="flex-5 overflow-y-scroll scrollbar-hide border-l-2 border-white bg-gray-300 h-5/6">
          {/* Content for the top section */}
          <div className="flex justify-center items-center">
            {/* Top Section Content */}
            <table className="min-w-full border border-gray-300 overflow-y-scroll scrollbar-hide h-auto bg-gray-300">
              <thead>
                <tr>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message, index) => (
                  <tr key={index}>
                    <td className={`p-4 ${index % 2 === 0 ? 'pl-24' : 'pr-24'}`}>
                      <textarea
                        className={`w-full p-2 resize-none rounded-md shadow-md ${index % 2 === 0 ? 'bg-blue-500' : 'bg-gray-100'}`}
                        value={message.content}
                        disabled
                        ref={textareaRefs[index]}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex-1 overflow-y-scroll scrollbar-hide border-l-2 border-white bg-gray-500/50 h-1/6">
          {/* Content for the bottom section */}
          <div className="flex justify-center items-center h-full">
            {/* Bottom Section Content */}
            <form className="w-full p-3">
              <div className="flex items-center justify-center">
                <div className="flex-1">
                  <textarea className="w-full p-1 rounded-md bg-white"/>
                </div>
                <button className="bg-azullog hover:bg-blue-900 transition duration-300 text-white font-bold py-2 px-4 rounded-md ml-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
