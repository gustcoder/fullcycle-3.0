import RepositoryInterface from "../../@shared/repository/repository.interface";
import Product from "../entity/product";

export default interface ProductRepositoryInterface extends RepositoryInterface<Product> {
    // exemplo de um possivel método particular deste repository
    // findByProductId(productId: string): Promise<Product>;
}
