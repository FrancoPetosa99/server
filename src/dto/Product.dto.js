class ProductDTO{

    constructor(){}

    newProduct(product, user){
        const productDTO = {};
        productDTO.title = product.title,
        productDTO.description = product.description,
        productDTO.price = product.price,
        productDTO.image = product.image,
        productDTO.code = product.code,
        productDTO.stock = product.stock,
        productDTO.category = product.category,
        productDTO.available = product.available

        const { email, role } = user;
        if(role == 'Premium') productDTO.owner = email;

        return productDTO;
    }

    orderItems(cart){
        return cart.products.map(item => {
            const { title, price, amount } = item.product;
            const orderItem = {};
            orderItem.title = title;
            orderItem.unit_price = price;
            orderItem.currency_id = 'ARS';
            orderItem.quantity = amount;
            return orderItem;
        });
    }
}

const productDTO = new ProductDTO(); //INITIALIZE USER DTO

export default productDTO;



