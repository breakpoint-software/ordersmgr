import { FETCH_ORDERS, FETCH_ORDER_WITH_DETAILS } from "./types";
import { adalApiFetch, adalConfig, authContext } from "../adal/config";
export const fetchOrders = () => dispatch => {
  var token = authContext.getCachedToken(authContext.config.clientId);
  fetch(adalConfig.endpoints.api + "/orders/get", {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(orders =>
      dispatch({
        type: FETCH_ORDERS,
        payload: orders
      })
    )
    .catch(ex => console.log(ex));
};

export const fetchFullOrder = orderId => dispatch => {
  var token = authContext.getCachedToken(authContext.config.clientId);

  fetch(adalConfig.endpoints.api + "/orders/getFullOrder/" + orderId, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(fullOrder =>
      dispatch({
        type: FETCH_ORDER_WITH_DETAILS,
        payload: fullOrder
      })
    )
    .catch(ex => console.log(ex));
};

export const updateProductOrder = data => dispatch => {
  var token = authContext.getCachedToken(authContext.config.clientId);

  console.log(JSON.stringify(data));
  fetch(adalConfig.endpoints.api + "/orders/UpdateProductOrder", {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    },
    method: "PUT",
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(fullOrder =>
      dispatch({
        type: FETCH_ORDER_WITH_DETAILS,
        payload: fullOrder
      })
    )
    .catch(ex => console.log(ex));
};
