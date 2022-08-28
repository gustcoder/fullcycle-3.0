import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product service unit tests", () => {
    it("should increace the prices for all products", () => {
        const product1 = new Product("1", "Guitarra Tagima TW 55", 1000);
        const product2 = new Product("2", "Contra Baixo Cort 4 Cordas", 700);

        const products = [product1, product2];

        ProductService.increasePrices(products, 10);

        expect(product1.price).toBe(1100);
        expect(product2.price).toBe(770);
    });
});