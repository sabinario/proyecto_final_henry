import { } from "../actions/index";

const initialState = {
  signUpData: undefined,
  userToken: undefined,
  userId: undefined,
  // userName: undefined,
  products: undefined,
  productsInv: undefined,
  proveedores: undefined,
  productTypes: undefined,
  productsCopy: undefined,
  productsCopyInv: undefined,
  
  users: undefined,
  commerces: undefined,
  settings: {
    show: "generales",
  },
  mesas: undefined,
  orders: {
    salonOrders: undefined,
    takeAwayOrders: undefined,
    deliveryOrders: undefined,
  },
  totalOrders: undefined,
  kitchenOrders: {
    inProgress: undefined,
    toBeDone: undefined,
  },
};


const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "REGISTER_USER":
      // console.log("-------------signUpData: payload = ", payload);
      return {
        ...state,
        signUpData: payload,
      };
    case "LOGIN_USER":
      // console.log("reducer LOGIN_USER, payload: ", payload);
      return {
        ...state,
        userToken: payload.token,
        userId: payload.id,
      };

    case "GET_USER_ID":
      return {
        ...state,
        userId: payload,
      };

    case "GET_NAME_PRODUCT":
      const allProductsInclude = state.productsCopy.filter((e) =>
        e.name.toLocaleLowerCase().includes(payload.toLocaleLowerCase())
      );
      return {
        ...state,
        products: Array.isArray(allProductsInclude)
          ? allProductsInclude
          : [allProductsInclude],
      };

    case "GET_NAME_PRODUCT_INV":
   
      const allProductsIncludeInv = state.productsCopyInv.filter((e) =>
        e.name.toLocaleLowerCase().includes(payload.toLocaleLowerCase())
      );
      return {
        ...state,
        productsInv: Array.isArray(allProductsIncludeInv)
          ? allProductsIncludeInv
          : [allProductsIncludeInv],
      };

    case "ORDER_BY_NAME":
      const products = state.products;
      let arrayOrderName =
        payload === true
          ? products.sort(function (a, b) {
            const aName = a.name.toLocaleLowerCase();
            const bName = b.name.toLocaleLowerCase();
            if (aName > bName) return 1;
            if (bName > aName) return -1;
            return 0;
          })
          : products.sort(function (a, b) {
            const aName = a.name.toLocaleLowerCase();
            const bName = b.name.toLocaleLowerCase();
            if (aName > bName) return -1;
            if (bName < aName) return 1;
            return 0;
          });
      return {
        ...state,
        products: arrayOrderName,
      };
    //////////////////////////////////////////////////////////
    case "ORDER_BY_NAME_INV":
      const productsInv = state.productsInv;
      let arrayOrderNameInv =
        payload === true
          ? productsInv.sort(function (a, b) {
            const aName = a.name.toLocaleLowerCase();
            const bName = b.name.toLocaleLowerCase();
            if (aName > bName) return 1;
            if (bName > aName) return -1;
            return 0;
          })
          : productsInv.sort(function (a, b) {
            const aName = a.name.toLocaleLowerCase();
            const bName = b.name.toLocaleLowerCase();
            if (aName > bName) return -1;
            if (bName < aName) return 1;
            return 0;
          });
      return {
        ...state,
        productsInv: arrayOrderNameInv,
      };
    ///////////////////////////////////////////////////////////
    case "FILTER_PRODUCTS_TYPE":

      const array = [...state.productsCopy].filter(
        (e) => e.productType === payload
      );

      return {
        ...state,
        products: array,
      };

    case "FILTER_PROVEEDORES":
      console.log(state.productsCopyInv,"reducer productsC")
      const arrayP = [...state.productsCopyInv].filter((e) => e.proveeType === payload);
      console.log(payload,"reducer seleccionado")
      console.log(arrayP,"reducer array")
      return {
        ...state,
        productsInv: arrayP,
      };

    case "GET_PRODUCTS":
      return {
        ...state,
        products: payload,
        productsCopy: payload,
      };

    /////////////////////////////////////

    case "GET_PRODUCTS_INV":

      return {
        ...state,
        productsInv: payload,
        productsCopyInv: payload,
      }

    /////////////////////////////////////

    case "POST_PRODUCTS":
      return {
        ...state,
        products: payload,
      };

    ///////////////////////////////

    case "POST_PRODUCTS_INV":
      return {
        ...state,
        productsInv: payload,
      };
    ///////////////////////////////

    case "DELETE_PRODUCT":
      return {
        ...state,
      };

    /////////////////////////////////

    case "DELETE_PRODUCT_INV":
      return {
        ...state,
      };
    /////////////////////////////////

    case "DELETE_CATEGORY":
      return {
        ...state,
      };

    case "PUT_PRODUCT":
      return {
        ...state,
        products: payload,
      };

    case "PUT_PRODUCT_INV":
      return {
        ...state,
        products: payload,
      };

    case "GET_COMMERCES":
      return {
        ...state,
        commerces: payload,
      };

    case "POST_COMMERCE":
      return {
        ...state,
        commerces: payload,
      };

    case "DELETE_COMMERCE":
      return {
        ...state,
      };

    case "GET_USERS":
      return {
        ...state,
        users: payload,
      };

    case "DELETE_USER":
      return {
        ...state,
      };

    case "CHANGE_SETTINGS":
      return {
        ...state,
        settings: payload,
      };

    case "GET_ORDERS":
      return {
        ...state,
        totalOrders: payload,
      };

    case "GET_TAKE_AWAY_ORDERS":
      return {
        ...state,
        orders: {
          ...state.orders,
          takeAwayOrders: payload,
        },
      };

    case "GET_SALON_ORDERS":
      return {
        ...state,
        orders: {
          ...state.orders,
          salonOrders: payload,
        },
      };

    case "GET_DELIVERY_ORDERS":
      return {
        ...state,
        orders: {
          ...state.orders,
          deliveryOrders: payload,
        },
      };

    case "GET_MESAS":
      return {
        ...state,
        mesas: payload,
      };

    case "GET_PRODUCT_TYPES":
      return {
        ...state,
        productTypes: payload,
      };

    case "POST_ORDER":
      if (state.orders.salonOrders) {
        return {
          ...state,
          orders: {
            ...state.orders,
            salonOrders: [...state.orders.salonOrders, payload],
          },
        };
      } else {
        return {
          ...state,
          orders: { ...state.orders, salonOrders: [payload] },
        };
      }

    case "POST_ORDER_TAKE_AWAY":
      if (state.orders.takeAwayOrders) {
        return {
          ...state,
          orders: {
            ...state.orders,
            takeAwayOrders: [...state.orders.takeAwayOrders, payload],
          },
        };
      } else {
        return {
          ...state,
          orders: { ...state.orders, takeAwayOrders: [payload] },
        };
      }

    case "POST_ORDER_DELIVERY":
      if (state.orders.deliveryOrders) {
        return {
          ...state,
          orders: {
            ...state.orders,
            deliveryOrders: [...state.orders.deliveryOrders, payload],
          },
        };
      } else {
        return {
          ...state,
          orders: { ...state.orders, deliveryOrders: [payload] },
        };
      }

    case "DELETE_TOKEN":
      return {
        userToken: null,
      };

    case "GET_KITCHEN_ORDERS":
      let inProgress = [];
      let toBeDone = [];
      for (let order in payload) {
        if (payload[order].estado === 1) toBeDone.push(payload[order]);
        if (payload[order].estado === 2) inProgress.push(payload[order]);
      }
      return {
        ...state,
        kitchenOrders: {
          inProgress,
          toBeDone,
        },
      };

    default:
      return state;
  }
};
export default rootReducer;
