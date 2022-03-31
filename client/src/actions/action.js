import React from 'react'

export const addtoCart = (data, count) => {

    // dispatch({ type: "Add to cart", payload: data })
    return {

        data,
        type: 'Add to cart',

    }
}



export const removetoCart = (data) => {
    return {
        data,
        type: 'remove to cart'
    }
}