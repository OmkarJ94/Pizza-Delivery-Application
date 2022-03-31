import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
const CatItems = ({ ele }) => {

  const state = useSelector(state => state.cardItems);

  const [count, setCount] = useState(1)
  const [price, setPrice] = useState(ele.smallPrice)
  const dispatch = useDispatch()

  return (
    <div>
      <div class="card my-3">
        <div class="row">
          <div class="col-md-8 cart">
            <div class="title">
              <div class="row">
                <div class="col">

                </div>

              </div>
            </div>
            <div class="row border-top border-bottom">
              <div class="row main align-items-center">
                <div class="col-4"><img class="img-fluid" src={ele.pizza.image} /></div>
                <div class="col">
                  <div class="row text-muted">{ele.pizza.name}</div>

                </div>
                <div class="col">
                  <button class="btn btn-primary mx-2" onClick={() => {

                    dispatch({ type: "INC", payload: ele.pizza.id })
                  }}> + </button>
                  {ele.count}
                  <button class="btn btn-primary mx-2" onClick={() => {
         
                    dispatch({ type: "DEC", payload: ele.pizza.id })
                  }}> - </button>
                </div>
                <div class="col">Rs. {ele.pizza.smallPrice * ele.count}</div>
                <div class="col"><span class="close">&#10005;</span></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div >
  )
}

export default CatItems