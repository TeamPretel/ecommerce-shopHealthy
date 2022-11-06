import { TYPES } from '../actions/ShoppingCartActions'
const initialState = {
  products: [],
  filteredProducts: [],
  nestedFilter: [],
  allProducts: [],
  isLoading: null,
  order: true,
  orderKey: 'nombre',
  error: null,
  categ: null,
  categName: ['TENTACION SALUDABLE', 'ALACENA SALUDABLE', 'ESTILO DE VIDA', 'BEBIDAS'],
  setBanner: true,
  cart: [],
  subtotal: 0
};
export const catalogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_INIT_PRODUCTS':
      return {
        ...state,
        isLoading: true,
      };
    case 'SUCCESS_FETCH_INIT_PRODUCTS':
      return {
        ...state,
        products: action.payload.data,
        allProducts: action.payload.data,
        isLoading: false,
        categ: action.payload.cat,
        setBanner: true,
      };

    case 'ERROR_FETCH_INIT_PRODUCTS':
      return {
        ...state,
        error: action.payload,
        products: [],
        isLoading: false,
      };
    case 'SET_ISLOADING_TRUE':
      return {
        ...state,
        isLoading: true,
      };
    case 'SET_ISLOADING_FALSE':
      return {
        ...state,
        isLoading: false,
      };
    case 'FILTER_BY_CATEGORY':
      return {
        ...state,
        products: action.payload.data,
        filteredProducts: action.payload.data,
        categ: action.payload.cat,
        setBanner: false,
      };
    case 'ADD':
      return {
        ...state,
        filteredProducts: state.products,
      };
    case 'ADD_NESTED_FILTER':
      return {
        ...state,
        products: action.payload.data,
        nestedFilter: action.payload.data,
        categ: action.payload.cat,
        setBanner: false,
      };
    case 'REMOVE_FILTER':
      return {
        ...state,
        products: action.payload.data,
        nestedFilter: action.payload.newNested,
        categ: action.payload.cat,
        setBanner: false,
      };
    case 'RESET_CATALOG':
      return {
        ...state,
        products: state.allProducts,
        nestedFilter: [],
        filteredProducts: [],
        setBanner: true,
      };
    case 'ORDER_ASC':
      return {
        ...state,
        products: action.payload.orderedProducts,
        allProducts: action.payload.orderedAllProducts,
      };
    case 'ORDER_DESC':
      return {
        ...state,
        products: action.payload.orderedProducts,
        allProducts: action.payload.orderedAllProducts,
      };
    case 'SEARCH':
      return {
        ...state,
        products: action.payload.data,
        categ: action.payload.search,
        setBanner: false,
      };
    case 'SET_ORDER':
      return {
        ...state,
        order: action.payload,
      };
    case 'SET_ORDER_KEY':
      return {
        ...state,
        orderKey: action.payload,
      };

    case 'CREATE_PRODUCT':
      return {
        ...state,
      };

      case 'CREATE_REVIEW':
      return {
        ...state,
      };

    case TYPES.ADD_TO_CART: {
      let newItem = state.allProducts.find((product) => product.id === action.payload.id);
      // console.log(newItem, 'En el reducer.')
      let itemInCart = state.cart.find((item) => item.id === newItem.id);
      return itemInCart
        ? {
            ...state,
            cart: state.cart.map((item) => (item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item)),
            // subtotal: state.subtotal + action.payload.precio
          }
        : {
            ...state,
            cart: [...state.cart, { ...newItem, quantity: 1 }],
            // subtotal: state.subtotal + action.payload.precio
          };
    }

    case TYPES.REMOVE_ONE_FROM_CART: {
      let itemToDelete = state.cart.find((item) => item.id === action.payload);

      return itemToDelete.quantity > 1
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
            ),
          }
        : {
            ...state,
            cart: state.cart.filter((item) => item.id !== action.payload),
          };
    }

    case TYPES.REMOVE_ALL_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    }

    case TYPES.CLEAR_CART: {
      return shoppingInitialState;
    }

    case TYPES.TOTAL_AMOUNT:{
      return {
          ...state,
          subtotal:state.cart.reduce( (a,b)=> a + (b.precio * b.quantity),0 )
      }
    }

    default:
      return state;
  }
};
