import React, { useState, useEffect, useRef } from "react";
import SideBar from "../../components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import Service from "../../Service/Service";
import { useNavigate } from "react-router-dom";

export default function Messages() {
  const idFrom = localStorage.getItem("id_user");
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const textareaRefs = useRef([]);
  const [otroDoc, setOtroDoc] = useState([]);
  const [enviado, setEnviado] = useState(false);
  useEffect(() => {
    getChatActual();
    getOtroDoc();
  }, [enviado]);

  const getChatActual = async () => {
    try {
      console.log(id);
      let data = {
        id: id,
      };
      console.log(data);
      const response = await Service.getChat(idFrom, data);
      const mensajes = Object.keys(response.data)
        .filter((key) => key.startsWith("message"))
        .sort((a, b) => {
          const indexA = parseInt(a.replace("message", ""));
          const indexB = parseInt(b.replace("message", ""));
          return indexA - indexB;
        })
        .map((key) => response.data[key]);

      setMessages(mensajes);
    } catch (error) {
      console.log(error);
    }
  };

  const getOtroDoc = async () => {
    try {
      let res = await Service.getDoctor(id);
      let temp = res.data;
      //obtener imagen
      let res2 = await Service.getProfilePhoto(id);
      let temp2 = res2.data;
      temp.image = temp2.image;

      setOtroDoc(temp);
    } catch (error) {
      console.log(error);
    }
  };

  const [mensajeEnviar, setMensajeEnviar] = useState({
    docFrom: idFrom,
    docTo: id,
    mensaje: "",
  });

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (mensajeEnviar.mensaje === "") {
      return;
    }
    try {
      let res = await Service.insertMessage(mensajeEnviar);
      console.log(res);

      if (res.status === 200) {
        setEnviado(true);
        getChatActual();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }

    setMensajeEnviar({
      docFrom: idFrom,
      docTo: id,
      mensaje: "",
    });
  };

  return (
    <div className="flex bg-gray-100 h-screen">
      <SideBar />
      <h1 className="ml-2 text-2xl text-center mt-4 flex flex-col items-center  justify-center">
        <img
          className="w-10 h-10 rounded-full mb-2"
          alt="photo"
          src={otroDoc.image}
        />
        <span>
          {otroDoc.nombre} {otroDoc.apellido}
        </span>
      </h1>
      <div className="p-7 flex-1 flex flex-col">
        <div className="flex-5 overflow-y-scroll scrollbar-hide border-l-2 border-white bg-gray-300 h-5/6">
          <div className="flex justify-center items-center">
            <table className="min-w-full border border-gray-300 overflow-y-scroll scrollbar-hide h-auto bg-gray-300">
              <thead>
                <tr>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message, index) => (
                  <tr key={index}>
                    <td
                      className={`p-2 ${
                        message[0] === idFrom ? "pl-24" : "pr-24"
                      }`}
                    >
                      <textarea
                        className={`w-full p-2 resize-none rounded-md shadow-md ${
                          message[0] === idFrom ? "bg-blue-500" : "bg-gray-100"
                        }`}
                        value={message[1]}
                        disabled
                        wrap="hard"
                        rows={Math.ceil(message[1].length / 116)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex-1 overflow-y-scroll scrollbar-hide border-l-2 border-white bg-gray-500/50 h-1/6">
          <div className="flex justify-center items-center h-full">
            <form className="w-full p-3">
              <div className="flex items-center justify-center">
                <div className="flex-1">
                  <textarea
                    className="w-full p-1 rounded-md bg-white"
                    name="mensaje"
                    required
                    onChange={(e) => {
                      setMensajeEnviar({
                        ...mensajeEnviar,
                        mensaje: e.target.value,
                      });
                    }}
                  />
                </div>
                <button
                  className="bg-azullog hover:bg-blue-900 transition duration-300 text-white font-bold py-2 px-4 rounded-md ml-2"
                  onClick={(e) => handleSendMessage(e)}
                >
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
