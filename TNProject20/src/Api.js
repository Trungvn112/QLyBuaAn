export const apiGetMonAnTheoLoai = async req => {
  let res = {};
  await fetch(`http://192.168.1.9/Server/GetMonAnTheoLoai.php?data=${req}`)
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      res = responseJson;
    })
    .catch(error => {
      console.error(error);
    });
  return res;
};

export const apiGetLoai = async req => {
  let res = {};
  // console.log("req:",req)
  await fetch(`http://192.168.1.9/Server/GetPhanLoai.php?data=${req}`)
    .then(response => {
      // console.log("check reponse:",response)
      return response.json();
    })
    .then(responseJson => {
      // console.log("check:",responseJson)
      res = responseJson;
      // console.log("data",res)
    })
    .catch(error => {
      console.error(error);
    });
  return res;
};

export const apiGetMonAnTheoMa = async req => {
  let res = {};
  await fetch(`http://192.168.1.9/Server/GetMonAnTheoMa.php?data=${req}`)
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      res = responseJson;
    })
    .catch(error => {
      console.error(error);
    });
  return res;
};

export const apiGetBinhLuan = async req => {
  let res = {};
  await fetch(`http://192.168.1.9/Server/GetBinhLuan.php?data=${req.IdMonAn}`)
    .then(response => {
      console.log("object:",response)
      return response.json();
    })
    .then(responseJson => {
      res = responseJson;
    })
    .catch(error => {
      console.error(error);
    });
  return res;
};

// export const apiGetLoaiMonAn = async req => {
//   let res = {};
//   await fetch(`http://192.168.1.9/Server/GetLoaiMonAn.php`)
//     .then(response => {
//       // console.log("object:",response)
//       return response.json();
//     })
//     .then(responseJson => {
//       res = responseJson;
//       console.log("ressss",responseJson)
//     })
//     .catch(error => {
//       console.error(error);
//     });
//   return res;
// };

export const apiGetBaiViet = async req => {
  let res = {};
  await fetch(`http://192.168.1.9/Server/GetBaiViet.php`)
    .then(response => {
      // console.log("object:",response)
      return response.json();
    })
    .then(responseJson => {
      res = responseJson;
      console.log("ressss",responseJson)
    })
    .catch(error => {
      console.error(error);
    });
  return res;
};

// export const apiLogin = async (TenDN, MatKhau) => {
//   const query = await fetch(`http://192.168.1.9/Server/Login.php?TenDN=${TenDN}&MatKhau=${MatKhau}`)
//   // const data = query.json()
//   console.log("user",query)
//   return query
// }

export const apiLogin = async req => {
  let resData = {};
  const reddata = req; 
  console.log("req", reddata)
  await fetch(`http://192.168.1.9/Server/Login.php?TenDN=${reddata.TenDN}&MatKhau=${reddata.MatKhau}`)
    .then(response => {
      resData = response;
      return response.json();
    })
    .then(responseJson => {
      resData = responseJson;
      console.log("resdata",resData)
    })
    .catch(error => {
      console.error(error);
    });
  return resData;
  
};


// export const apiGetGoodFoodDays = async req => {
//   let res = {};
//   await fetch(`http://10.0.2.2:5000/goodFoodDays`)
//     .then(response => response.json())
//     .then(responseJson => {
//       res = responseJson.recordset;
//     })
//     .catch(error => {
//       console.error(error);
//     });
//   return res;
// };
// //API creat new meal
// export const apiCrateNewMeal = async req => {
//   let res = {};
//   await fetch(`http://10.0.2.2:5000/newMeal`)
//     .then(response => response.json())
//     .then(responseJson => {})
//     .catch(error => {
//       console.error(error);
//     });
// };
// // API get dish suggestions
// export const apiGetDishSuggestions = async req => {
//   let res = {};
//   await fetch(`http://10.0.2.2:5000/getDishSuggestions`)
//     .then(response => {
//       return response.json();
//     })
//     .then(responseJson => {
//       res = responseJson.recordset;
//     })
//     .catch(error => {
//       console.error(error);
//     });
//   return res;
// };
// // API get dish session
// export const apiGetDishSession = async req => {
//   let res = {};
//   await fetch(`http://10.0.2.2:5000/getDishSession`)
//     .then(response => {
//       return response.json();
//     })
//     .then(responseJson => {
//       res = responseJson.recordset;
//     })
//     .catch(error => {
//       console.error(error);
//     });
//   return res;
// };
