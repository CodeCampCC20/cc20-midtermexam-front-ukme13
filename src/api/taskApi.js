import axios from "axios";

const taskApi = {};

const BASEURL =
  "http://cc20-todo-midterm-env.eba-fi9p2pds.ap-southeast-1.elasticbeanstalk.com";

taskApi.createTask = (input, token) => {
  return axios.post(`${BASEURL}/api/V2/todos`, input, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//DELETE
taskApi.deleteTask = (TaskId, token) => {
  console.log("TaskId : ", TaskId);
  console.log(`URL : , ${BASEURL}/api/V2/todos/${TaskId}`);
  return axios.delete(`${BASEURL}/api/V2/todos/${TaskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

taskApi.getAllTaskByUserID = (token) => {
  console.log(`URL : , ${BASEURL}/api/V2/todos`);
  return axios.get(`${BASEURL}/api/V2/todos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


//UPDATE
taskApi.updateTask = (TaskId,input, token) => {
  console.log("TaskId : ", TaskId);
  console.log("input : ", input);
  console.log(`URL : , ${BASEURL}/api/V2/todos/${TaskId}`);
  return axios.patch(`${BASEURL}/api/V2/todos/${TaskId}`,input, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default taskApi;
