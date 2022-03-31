import React, { useState } from 'react'
import Admin from './Admin'
import swal from "sweetalert"
import loading from "../Loading"
const Addproduct = () => {
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    image: "",
    Small: "",
    Medium: "",
    Large: "",
    price: ""

  })

  const handleInputs = (e) => {
 
    let name, value;
    name = e.target.name;
    value = e.target.value;
    setProduct({ ...product, [name]: value });
  }
  const postData = async (e) => {
    e.preventDefault();
    const { name, description, category, image, Small, Large, price, Medium } = product;
    try {
      setLoading(true)
      const res = await fetch("/addproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          image,
          category,
          Small,
          Large,
          Medium,
          price
        }),
      });
      // eslint-disable-next-line
      const result = await res.json();

      if (res.status !== 201 || !res) {
        swal("Product with this name already exists");
        setLoading(false)

      } else {
        swal("Product Added successfully");
        setLoading(false)

      }
    }
    catch (e) {
      swal("Someyhing Went Wrong");
      setLoading(false)
    }
  }

  return (
    <div>
      <Admin />
      <div>
        <div className="container con">
          <div className="card" style={{ width: "35rem" }}>
            <h4 class="card-title mb-1 mt-1">Add product<bt /></h4>
            <div className="card-body">

              <div class="form-group">
                <label className="lab">Product Name</label>
                <input
                  name="name"
                  class="form-control"
                  placeholder="Name"
                  type="text"
                  value={product.name} onChange={handleInputs}
                />
              </div>
              <div class="form-group my-2">
                <label className="lab">Description of product</label>
                <textarea
                  name="description"
                  class="form-control"
                  placeholder="description of product"
                  type="text"
                  value={product.description} onChange={handleInputs}
                />
              </div>


              <div class="form-group my-2">
                <label className="lab">Category </label>  &nbsp;
                <input type="radio" name="category" onChange={handleInputs} value="pizza" />     &nbsp;
                <label className="lab">Pizza</label>
                &nbsp;
                <input type="radio" name="category" onChange={handleInputs} value="sauce" />    &nbsp;
                <label className="lab">Sauce</label>
                <input type="radio" name="category" onChange={handleInputs} value="cheese" />    &nbsp;
                <label className="lab">cheese</label>
                &nbsp; &nbsp;

              </div>
              {product.category === "pizza" ?
                <div class="form-group my-2">
                  <label className="lab">Small Price</label>
                  <input
                    class="form-control"
                    placeholder="******"
                    type="text"
                    name="Small"
                    value={product.Small} onChange={handleInputs}
                  />
                  <label className="lab">Medium Price</label>
                  <input
                    class="form-control"
                    placeholder="******"
                    type="text"
                    name="Medium"
                    value={product.Medium} onChange={handleInputs}
                  />
                  <label className="lab">Large Price</label>
                  <input
                    class="form-control"
                    placeholder="******"
                    type="text"
                    name="Large"
                    value={product.Large} onChange={handleInputs}
                  />
                </div> :
                <div class="form-group my-2">
                  <label className="lab">Enter Price</label>
                  <input
                    class="form-control"
                    placeholder="******"
                    type="text"
                    name="price"
                    value={product.price} onChange={handleInputs}
                  />
                </div>
              }
              <div class="form-group my-2">
                <label className="lab">Image Url</label>
                <input
                  class="form-control"
                  placeholder="******"
                  type="text"
                  name="image"
                  value={product.image} onChange={handleInputs}
                />
              </div>

              <div class="frm">
                <button type="submit" class="btn btn-primary btna" onClick={postData}>
                  {" "}
                  Submit{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Addproduct