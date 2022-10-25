import { type } from "../../types/index"

const state = {
  name: "Henry",
  logged: true,
};

export const authReducer = (state = {}, action) => {
  switch (action.type) {

    case type.login:
      return {
        ...action.payload,
        logged: true,
      };

    case type.logout:
      return {
        logged: false,
      };
    

    default:
      return state;
  }
};
