import axios from "axios";

// ---------- REGISTRO DE USUARIO ---------- \\
export function registerUser(payload) {
  return function (dispatch) {
    axios
      .post("http://localhost:3001/users/register", payload)
      .then((data) => {
        return dispatch({ type: "REGISTER_USER", payload: data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

// ---------- OBTENER PRODUCTOS ---------- \\
export function getProducts(payload) {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/products", payload)
      .then((data) => {
        return dispatch({ type: "GET_PRODUCTS", payload: data.data.payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

// ---------- BUSCAR POR NOMBRE DE PRODUCTO ---------- \\
export function getNameProducts(payload) {
  return async function (dispatch) {
    try {
      var data = await axios.get(
        "http://localhost:3001/products?name=" + payload
      );
      if (data.data.succes) {
        return dispatch({
          type: "GET_NAME_PRODUCT",
          payload: data.data.payload,
        });
      } else {
        alert(data.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
}

// // ---------- FILTRAR PRODUCTOS POR TIPO ---------- \\
export function filterProductsType(payload) {
  return {
    type: "FILTER_PRODUCTS_TYPE",
    payload,
  };
}

// ---------- CREACIÓN DE PRODUCTO ---------- \\
export function postProduct(payload) {
  return async function (dispatch) {
    var data = await axios
      .post("http://localhost:3001/products/add", payload)
      .then((data) => {
        return data;
      });
    return data;
  };
}

// ---------- ELIMINAR PRODUCTO ---------- \\
export function deleteProduct(payload) {
  return async function (dispatch) {
    await axios.delete(`http://localhost:3001/products/${payload}`);
    return dispatch({
      type: "DELETE_PRODUCT",
    });
  };
}

// ---------- MODIFICAR PRODUCTO ---------- \\
export function updateProduct(payload, id) {
  return async function (dispatch) {
    await axios.put(`http://localhost:3001/products/${id}`, payload);
    await axios.get("http://localhost:3001/products").then((data) => {
      return dispatch({
        type: "PUT_PRODUCT",
        payload: data.data.payload,
      });
    });
  };
}

// ---------- CREACIÓN DE COMERCIO ---------- \\
export function postCommerce(payload) {
  return async function (dispatch) {
    var data = await axios.post(
      "http://localhost:3001/commerce/register",
      payload
    );
    return data;
  };
}

export function getCommerces() {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/commerce")
      .then((data) => {
        return dispatch({ type: "GET_COMMERCES", payload: data.data.payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

// ---------- ELIMINAR COMERCIO ---------- \\
export function deleteCommerce(payload) {
  return async function (dispatch) {
    await axios.delete(`http://localhost:3001/commerce/${payload}`);
    return dispatch({
      type: "DELETE_COMMERCE",
    });
  };
}

// ---------- MODIFICAR COMERCIO ---------- \\
export function updateCommerce(payload, id) {
  return async function (dispatch) {
    await axios.put(`http://localhost:3001/commerce/${id}`, payload);
    return dispatch({
      type: "PUT_COMMERCE",
    });
  };
}

// ---------- OBTENER USUARIOS ---------- \\
export function getUsers(payload) {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/users", payload)
      .then((data) => {
        return dispatch({ type: "GET_USERS", payload: data.data.payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

// ---------- ELIMINAR USUARIOS ---------- \\
export function deleteUser(payload) {
  return async function (dispatch) {
    await axios.delete(`http://localhost:3001/users/${payload}`);
    return dispatch({
      type: "DELETE_USER",
    });
  };
}

// ---------- MODIFICAR USUARIOS ---------- \\
export function updateUsers(payload, id) {
  return async function (dispatch) {
    await axios.put(`http://localhost:3001/users/${id}`, payload);
    return dispatch({
      type: "PUT_USER",
    });
  };
}

// ---------- MODIFICAR SETTINGS ---------- \\
export function changeSettings(payload) {
  return function (dispatch) {
    return dispatch({ type: "CHANGE_SETTINGS", payload: payload });
  };
}
