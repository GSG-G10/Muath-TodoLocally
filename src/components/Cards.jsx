import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import axios from "axios";

import * as todosActions from "../redux/actions";

const Cards = () => {
  const [title, setTitle] = useState("Card");
  const [content, setContent] = useState("Card Content");
  const [refresh, setRefresh] = useState(false);
  const [localJson, setLocalJeson] = useState([]);
  // const { data } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const clear = () => {
    const title = document.querySelector("#title");
    const content = document.querySelector("#content");
    title.value = "";
    content.value = "";
    setTitle("Card");
    setContent("Card Content");
  };

  const deleteCard = (id) => {
    dispatch(todosActions.deleteCard(id));
    axios.delete(`/cards/${id}`);
    setRefresh((c) => !c);
  };
  const getCards = async (data) => {
    try {
      const response = await axios.get("/cards");
      return setLocalJeson(response.data);
    } catch (err) {
      return console.log(err);
    }
  };

  const newCard = (content) => {
    dispatch(todosActions.newCard(content));
    axios.post("/cards", content);
    setRefresh((c) => !c);
    clear();
  };
  useEffect(() => {
    setLocalJeson(getCards());
  }, [refresh]);
  return (
    <>
      <section class="px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-4 sm:pb-6 lg:pb-4 xl:pb-6 space-y-4 container mx-auto px-4">
        <header class="flex items-center justify-between">
          <h2 class="text-lg leading-6 font-medium text-black">Todo list</h2>
          <label for="my-modal-2" class="btn btn-primary modal-button">
            Add New Card
          </label>
          <input type="checkbox" id="my-modal-2" class="modal-toggle" />
          <div class="modal">
            <div class="modal-box">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Title</span>
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Type here"
                  class="input"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Card content</span>
                </label>
                <textarea
                  class="textarea h-24 textarea-bordered"
                  id="content"
                  placeholder="Type here"
                  required
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>
              <form class="modal-action">
                <label
                  for="my-modal-2"
                  class="btn btn-primary"
                  onClick={() => {
                    newCard({ id: Date.now(), title: title, content: content });
                  }}
                >
                  Submit
                </label>
                <label for="my-modal-2" class="btn">
                  Close
                </label>
              </form>
            </div>
          </div>
        </header>
        <ul class="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-1 xl:grid-cols-4 gap-4">
          {Boolean(localJson.length)
            ? localJson.map((elm) => {
                return (
                  <>
                    {console.log(elm)}
                    <li x-for="item in items" key={elm.id}>
                      <div class="hover:bg-light-blue-500 hover:border-transparent hover:shadow-lg group block rounded-lg p-4 border border-gray-200">
                        <div class="flex justify-between mb-8">
                          <article class="nav-logo prose lg:prose-xl">
                            <h3>{elm.title}</h3>
                          </article>
                          <span>{moment(elm.id).fromNow()}</span>
                        </div>
                        <p class="mb-8">{elm.content}</p>
                        <button onClick={() => deleteCard(elm.id)}>
                          Delete
                        </button>
                      </div>
                    </li>
                  </>
                );
              })
            : null}
        </ul>
      </section>
    </>
  );
};

export default Cards;
