import Product from "../entity/product";
import RepositoryInterface from "./repository.interface";

export default interface ProductRepositoryInterface extends RepositoryInterface<Product> {
    // exemplo de um possivel método particular deste repository
    // findByProductId(productId: string): Promise<Product>;
}