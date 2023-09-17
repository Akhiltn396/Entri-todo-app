import React, { useEffect, useRef, useState } from "react";
import "./Main.css";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import newRequest from "../../../utils/newRequest";
import axios from "axios";

const Main = () => {
  const [add, setAdd] = useState(false);
  const [success, setSuccess] = useState(false);
  const [complete, setComplete] = useState(false);

  const [works, setWorks] = useState({
    task: "",
    date: "",
    time: "",
    desc: "",
  });
  const [check, setCheck] = useState(false);


  // console.log("works" + works);
  // console.log("works" + works.task);

  const { isLoading, error, data } = useQuery({
    queryKey: ["getTask"],
    queryFn: () =>
      newRequest
        .get(`/getTask`)
        .then((res) => {
          return res.data;
        })
        .catch((errorData) => {
          console.log("error" + errorData);
        }),
  });

  // console.log(data);

  const changeHandler = (e) => {
    setWorks({ ...works, [e.target.name]: e.target.value });
  };

  const mutation = useMutation({
    mutationFn: (work) => {
      return newRequest
        .post("/add", work)
        .then((res) => {
          // return res.data;
          console.log(res.data);
        })
        .catch((errorData) => {
          console.log(errorData);
        });
    },
    onSuccess: () => {
      QueryClient.invalidateQueries(["getTask"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate(works);

    if (
      works.task.length ||
      works.date.length ||
      works.date.length ||
      works.desc.length !== 0
    ) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  };

  const handleChange = () => {
    setCheck(!check);
    setComplete(!complete)
  };
  const queryClient = useQueryClient();

  const mutationUpdate = useMutation(
    ({ id, check }) => {
      return newRequest.put(`/editTask/${id}`, { check });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["getTask"]);
      },
    }
  );
  const handleEdit = (id) => {
    // mutationUpdate.mutate({id,check});
    mutationUpdate.mutate({ id, check });
  };

  const mutationDelete = useMutation((id) => {
    return newRequest.delete(`/deleteTask/${id}`);
  });
  const handleDelete = (id) => {
    // mutationUpdate.mutate({id,check});
    mutationDelete.mutate(id);
  };
  return (
    <div className="todo">
      <h1 className="todo-list">Todo List</h1>
      <div className="add">
        <h2>Add your works</h2>

        <button onClick={() => setAdd(!add)} className="btn">
          {add ? "-" : "+"}
        </button>
        {add && (
          <div className="add-todo">
            <label>Add Todo</label>
            <input
              type="text"
              placeholder="eg:Gym Time"
              name="task"
              onChange={changeHandler}
              style={{padding:"10px", outline:"none"}}
            />
            <label>Date </label>
            <input
              type="text"
              placeholder="eg:4-02-2023"
              name="date"
              onChange={changeHandler}
              style={{padding:"10px", outline:"none"}}
            />
            <label>Time </label>
            <input
              type="number"
              placeholder="eg:12:30:00"
              name="time"
              onChange={changeHandler}
              style={{padding:"10px", outline:"none"}}
            />
            <label>Desc</label>
            <textarea
              id=""
              cols="30"
              rows="10"
              name="desc"
              onChange={changeHandler}
              style={{ outline:"none"}}
            ></textarea>
            <br />
            <button onClick={handleSubmit} style={{padding:"10px", backgroundColor:"lightgreen", cursor:"pointer"}}>Submit</button>
          </div>
        )}
        {success && (
          <div className="success">
            Todo Added Successfully
            <span onClick={() => setSuccess(false)}>X</span>
          </div>
        )}
      </div>
      <br />

      <div style={{ textAlign: "center" }}>Your Todo Works</div>
      <br />
      <br />

      <div className="works">
        {isLoading
          ? "loading"
          : error
          ? "Something went wrong"
          : data.map((d) => (
              <div
                className="work"
                key={d._id}
                onClick={() => handleEdit(d._id)}
              >
                <div className="container">
                   {/* <input type="checkbox" className="check" name=""   onChange={handleChange } /> */}
                <button className="check" name="" onClick={handleChange}>
                  {d.checked?"Completed":"Pending"}
                </button>
                <img
                  src="https://png.pngtree.com/png-vector/20190420/ourmid/pngtree-delete-vector-icon-png-image_963444.jpg"
                  alt=""
                  className="img"
                  onClick={() => handleDelete(d._id)}
                />
                </div>

                <h2 className={d.checked ? "data" : ""}>{d.task}</h2>
                <h4 className={d.checked ? "data" : ""}>
                  <span>Date</span> : {d.date}
                </h4>
                <h4 className={d.checked ? "data" : ""}>
                  <span>Time</span> : {d.time}
                </h4>
                <p className={d.checked ? "data" : ""}>
                  <span>Desc</span> : {d.desc}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Main;
