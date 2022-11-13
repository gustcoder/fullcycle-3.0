import ProductFactory from "./product.factory";

describe("Product Factory Tests", () => {
    it("should create a ProductFactory", () => {
        const product = ProductFactory.create("Honda CRF 230F", 17000);
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Honda CRF 230F");
        expect(product.price).toBe(17000);
        expect(product.constructor.name).toBe("Product");
    });
});
