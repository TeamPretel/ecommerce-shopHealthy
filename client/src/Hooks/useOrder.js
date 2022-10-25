import { useState } from "react";
import { useDispatch, } from "react-redux";
import { orderAsc, orderDesc } from "../actions/order";

export const useOrder = (setCurrentPage, defaultKey)=>{
  
  const dispatch = useDispatch();


  const [keyToOrder, setKeyToOrder] = useState('nombre');
  const [order, setOrder] = useState(true);


  const onChangeOrderKey = event => {
    if(order){
        dispatch(orderAsc(event.target.value))
    }else{
        dispatch(orderDesc(event.target.value))
    }
    setKeyToOrder(event.target.value);
    setCurrentPage(1);
  }
  const onChangeFilterType = event =>{
    return true
    setCurrentPage(1);
  }

  return {
    keyToOrder,
    setKeyToOrder,
    order,
    setOrder,
    onChangeFilterType,
    onChangeOrderKey,
  }

}