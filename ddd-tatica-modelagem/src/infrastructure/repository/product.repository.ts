import Product from "../../domain/entity/product";
import ProductRepositoryInterface from "../../domain/repository/product-repository.interface";
import ProductModel from "../db/sequelize/model/product.model";

export default class ProductRepository implements ProductRepositoryInterface {

    async create(product: Product): Promise<void> {
        try {
            await ProductModel.create({
                id: product.id,
                name: product.name,
                price: product.price
            });
        } catch (error) {
            throw new Error("Error creating product!");
        }
    }
    
    async update(product: Product): Promise<void> {
        try {
            await ProductModel.update(
                {
                    name: product.name,
                    price: product.price
                },
                {
                    where: {
                        id: product.id
                    }
                }
            );
        } catch (error) {
            throw new Error("Error updating product!");
        }
    }
    
    async find(productId: string): Promise<Product|null> {
        try {
            const findProduct = await ProductModel.findOne({ where: { id: productId } });
            const product = findProduct ? new Product(findProduct.id, findProduct.name, findProduct.price) : null;

            return product;
        } catch (error) {
            throw new Error("Error finding product!");
        }
    }

    async findAll(): Promise<Product[]|[]> {
        const products = await ProductModel.findAll();
        
        return products.map((product) => new Product(product.id, product.name, product.price));
    }    

    /*
    async findByProductId(productId: string): Promise<Product> {
        throw new Error("Not implemented");
    }
    */
}
