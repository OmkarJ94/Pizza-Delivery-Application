import React from 'react'
import PizzaList from '../Components/PizzaList';
const intialState = {
    pizza: [],
    sauces: [],
    cheeses: [],
    totalPrice: 0,
    totalQuantity: 0,
    status: false

}

const reducer = (state = intialState, action) => {

    let index;
    let find;
    switch (action.type) {
        case "Add to cart":
            const { pizza, count, varient, category } = action.payload


            const check = state.pizza.find(pizza => pizza._id === action.payload.pizza._id);
            if (check) {
                return state
            }
            else {
                const Tprice = state.totalPrice + action.payload.count * action.payload.pizza[varient];
                const Tquantity = state.totalQuantity + action.payload.count
                pizza.count = count
                pizza.varient = varient
                pizza.category = category
                pizza.price = action.payload.pizza[varient]

                localStorage.setItem('pizza', JSON.stringify({
                    pizza: [...state.pizza, pizza]
                }))
                console.log(JSON.parse(localStorage.getItem('pizza')))
                return {

                    ...state,
                    pizza: [...state.pizza, pizza],
                    category,
                    totalPrice: Tprice,
                    totalQuantity: Tquantity
                }

            }

            break;
        case "INC":

            const { _id, cate } = action.payload

            const IncData = JSON.parse(localStorage.getItem('pizza')).pizza
            // console.log(IncData)

            // IncData.map((ele) => {
            //     if (ele._id === _id) {
            //         console.log(ele.count)
            //         ele.count += 1
            //         localStorage.setItem('pizza', JSON.stringify({
            //             pizza: [...state.pizza]
            //         }))
            //         console.log(JSON.parse(localStorage.getItem('pizza')).pizza)
            //     }
            // })

            if (cate === "pizza") {
                find = state.pizza.find(pizza => pizza._id === action.payload._id)

                index = state.pizza.findIndex(pizza => pizza._id === action.payload._id);

                find.count += 1

                state.pizza[index] = find
                localStorage.setItem('pizza', JSON.stringify(
                    {
                        pizza: [...state.pizza],
                        totalPrice: state.totalPrice + find.price,
                        totalQuantity: state.totalQuantity + 1
                    }))
                return {
                    ...state,
                    totalPrice: state.totalPrice + find.price,
                    totalQuantity: state.totalQuantity + 1
                }
            }
            else if (cate === "sauce") {

                find = state.sauces.find(sauce => sauce.sauce._id === action.payload._id)

                index = state.sauces.findIndex(sauce => sauce.sauce._id === action.payload._id);

                find.count += 1


                state.sauces[index] = find
                return {
                    ...state,
                    totalPrice: state.totalPrice + find.sauce.price,
                    totalQuantity: state.totalQuantity + 1
                }
            }
            else {

                find = state.cheeses.find(cheese => cheese.cheese._id === action.payload._id)

                index = state.cheeses.findIndex(cheese => cheese.cheese._id === action.payload._id);

                find.count += 1


                state.cheeses[index] = find
                return {
                    ...state,
                    totalPrice: state.totalPrice + find.cheese.price,
                    totalQuantity: state.totalQuantity + 1
                }
            }

            break;
        case "DEC":

            if (action.payload.cate === "pizza") {
                find = state.pizza.find(pizza => pizza._id === action.payload._id)
                index = state.pizza.findIndex(pizza => pizza._id === action.payload_id);

                if (find.count > 1) {

                    find.count -= 1
                    state.pizza[index] = find
                }
                else {
                    return state
                }

                return {
                    ...state,
                    totalPrice: state.totalPrice - find.price,
                    totalQuantity: state.totalQuantity - 1
                }
            }
            else if (action.payload.cate === "sauce") {
                find = state.sauces.find(sauce => sauce.sauce._id === action.payload._id)
                index = state.sauces.findIndex(sauce => sauce.sauce._id === action.payload._id);

                if (find.count > 1) {
                    find.count -= 1
                    state.sauces[index] = find
                }
                else {
                    return state
                }

                return {
                    ...state,
                    totalPrice: state.totalPrice - find.sauce.price,
                    totalQuantity: state.totalQuantity - 1
                }

            }
            else {
                find = state.cheeses.find(cheese => cheese.cheese._id === action.payload._id)
                index = state.cheeses.findIndex(cheese => cheese.cheese._id === action.payload._id);

                if (find.count > 1) {
                    find.count -= 1
                    state.cheeses[index] = find
                }
                else {
                    return state
                }

                return {
                    ...state,
                    totalPrice: state.totalPrice - find.cheese.price,
                    totalQuantity: state.totalQuantity - 1
                }
            }
            break;
        case 'REMOVE':

            if (action.payload.cate === "pizza") {
                find = state.pizza.find(pizza => pizza._id === action.payload._id);
                const filter = state.pizza.filter(pizza => pizza._id !== action.payload._id);
                return {
                    ...state,
                    pizza: filter,
                    totalPrice: state.totalPrice - find.price * find.count,
                    totalQuantity: state.totalQuantity - find.count
                }

            }
            else if (action.payload.cate === "sauce") {

                find = state.sauces.find(sauce => sauce.sauce._id === action.payload._id);
                const filter = state.sauces.filter(sauce => sauce.sauce._id !== action.payload._id);
                console.log(find);
                console.log(filter);
                return {
                    ...state,
                    sauces: filter,
                    totalPrice: state.totalPrice - find.sauce.price * find.sauce.count,
                    totalQuantity: state.totalQuantity - find.count
                }
            } else {

                find = state.cheeses.find(cheese => cheese.cheese._id === action.payload._id);
                const filter = state.cheeses.filter(cheese => cheese.cheese._id !== action.payload._id);

                return {
                    ...state,
                    cheeses: filter,
                    totalPrice: state.totalPrice - find.cheese.price * find.count,
                    totalQuantity: state.totalQuantity - find.count
                }
            }
        case "sauce":

            const checksauce = state.sauces.find(sauce => sauce.sauce._id === action.payload.sauce._id);
            action.payload.sauce.count = action.payload.count
            if (checksauce) {
                return state
            }
            else {
                const Tprice = state.totalPrice + action.payload.sauce.price * action.payload.count;
                const TQuantity = state.totalQuantity + action.payload.count
                return {
                    ...state,
                    sauces: [...state.sauces, action.payload],
                    totalQuantity: TQuantity,
                    totalPrice: Tprice,

                }

            }

        case "cheese":


            const checkcheese = state.cheeses.find(cheese => cheese.cheese.id === action.payload.cheese.id);

            action.payload.cheese.count = action.payload.count
            if (checkcheese) {
                return state
            }
            else {
                const Tprice = state.totalPrice + action.payload.cheese.price * action.payload.count;
                const TQuantity = state.totalQuantity + action.payload.count


                return {
                    ...state,
                    cheeses: [...state.cheeses, action.payload],
                    totalQuantity: TQuantity,
                    totalPrice: Tprice,

                }

            }

        case 'USER':
            console.log(action)
            return {
                ...state,
                status: action.payload,
                type: action.type
            }
        case 'ADMIN':
            console.log(action)
            return {
                ...state,
                status: action.payload,
                type: action.type
            }

        default:
            return state
    }
}

export default reducer