* FLIPKART APP *

//page 1 
> list of categories
* http://localhost:9120/categories
* 

> list of all products
* http://localhost:9120/products
* 

// page 2
> list of brands
* http://localhost:9120/brands
* 

> list of brands wrt category
* http://localhost:9120/brands?catId=2
* 

> product with respect to brand
* http://localhost:9120/products?brandId=2
* 

// page 3
> product detail
* http://localhost:9120/details/2
* 
> product list wrt category
* http://localhost:9120/products?catId=1
* 

// page 4
> details of those products which we selected 
* 
* 
> place order
* http://localhost:9120/placeOrder 
   {
        "product_id": 3,
        "name" : "Tanu",
        "email" : "tanu@gmail.com",
        "phone" : "1234567890",
        "cost": 150,
        "cat_id" : "1",
        "brand_id" : "1"
    }

// page 5
> list of all orders
* http://localhost:9120/orders
* 

> update orders details
* http://localhost:9120/updateOrder
* 

> delete the order
* http://localhost:9120/deleteOrder
* 