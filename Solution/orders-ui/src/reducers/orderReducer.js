import {
  FETCH_ORDERS,
  FETCH_ORDER_WITH_DETAILS,
  UPDATE_PRODUCT_ORDER
} from "../actions/types";

const initialState = {
  items: [],
  selectedOrder: {}
};
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ORDERS:
      return {
        ...state,
        items: action.payload
      };
    case FETCH_ORDER_WITH_DETAILS:
      return {
        ...state,
        selectedOrder: action.payload
      };

      break;
    case UPDATE_PRODUCT_ORDER:
      return {
        ...state,
        selectedOrder: action.payload
      };
      break;
    default:
      return state;
  }
}
