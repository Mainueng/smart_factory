const axios = require("axios");
const { SERV_API } = require("../constant_config");

const login = async (user) => {
  var params = new URLSearchParams();
  params.append("email", user.username);
  params.append("password", user.password);

  return await axios({
    method: "post",
    url: SERV_API + "/api/v1/auth/signin",
    data: params,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  })
    .then((res) => {
      localStorage.removeItem("login_error");
      return res.data;
    })
    .catch((err) => {
      //handle error
      console.log(err);
    });
};

const outdoor_line = async () => {
  return await axios({
    method: "get",
    url: SERV_API + "/api/v1/outdoor",
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      //handle error
      console.log(err);
    });
};

const indoor_line = async () => {
  return await axios({
    method: "get",
    url: SERV_API + "/api/v1/indoor",
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      //handle error
      console.log(err);
    });
};

const indoor_export = async () => {
  // return await axios({
  //   method: "get",
  //   url: SERV_API + "",
  // })
  //   .then((res) => {
  //     return res.data;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  let data = [
    ["Column 1", "Column 2", "Column 3", "Column 4"],
    ["  1-1", "1-2", "1-3", "1-4"],
    ["  2-1", "2-2", "2-3", "2-4"],
    ["  3-1", "3-2", "3-3", "3-4"],
    ["  4", "5", "6", "7"],
  ];

  return await data;
};

const outdoor_export = async () => {
  // return await axios({
  //   method: "get",
  //   url: SERV_API + "",
  // })
  //   .then((res) => {
  //     return res.data;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  let data = [
    ["Column 1", "Column 2", "Column 3", "Column 4"],
    ["  1-1", "1-2", "1-3", "1-4"],
    ["  2-1", "2-2", "2-3", "2-4"],
    ["  3-1", "3-2", "3-3", "3-4"],
    ["  4", "5", "6", "7"],
  ];

  return await data;
};

const import_csv = async (data) => {
  return await axios
    .post(SERV_API + "", data)
    .then((res) => {
      alert("Upload Complete!");
    })
    .catch(() => {
      alert("Upload Fail!");
      console.log(data);
    });
};

const view_indoor = async () => {
  // return await axios({
  //   method: "get",
  //   url: SERV_API + "",
  // })
  //   .then((res) => {
  //     return res.data;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  let data = [
    ["Column 1", "Column 2", "Column 3", "Column 4"],
    ["  1-1", "1-2", "1-3", "1-4"],
    ["  2-1", "2-2", "2-3", "2-4"],
    ["  3-1", "3-2", "3-3", "3-4"],
    ["  4", "5", "6", "7"],
  ];
  //data = JSON.parse(data);

  return data;
};

const view_outdoor = async () => {
  // return await axios({
  //   method: "get",
  //   url: SERV_API + "",
  // })
  //   .then((res) => {
  //     return res.data;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  let data = [
    ["Column 1", "Column 2", "Column 3", "Column 4"],
    ["  1-1", "1-2", "1-3", "1-4"],
    ["  2-1", "2-2", "2-3", "2-4"],
    ["  3-1", "3-2", "3-3", "3-4"],
    ["  4", "5", "6", "7"],
  ];

  return JSON.parse(data);
};

export {
  login,
  outdoor_line,
  indoor_line,
  indoor_export,
  outdoor_export,
  import_csv,
  view_indoor,
  view_outdoor,
};
