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
}

const productDTO = new ProductDTO(); //INITIALIZE USER DTO

export default productDTO;



