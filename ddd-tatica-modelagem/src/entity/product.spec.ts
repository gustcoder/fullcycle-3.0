import Product from "./product";

describe("Product unit tests", () => {
    it("should throw exception when product id is empty", () => {
        expect(() => {
            const product = new Product("", "Console Playstation 4 Sony", 3999);
        })
        .toThrowError("Product ID is required!");
    });

    it("should throw exception when product name is empty", () => {
        expect(() => {
            const product = new Product("1", "", 3999);
        })
        .toThrowError("Product name is required!");
    });

    it("should throw exception when product price is invalid", () => {
        expect(() => {
            const product = new Product("1", "Console Playstation 4 Sony", -10);
        })
        .toThrowError("Product price is invalid!");
    });

    it("should change name of product", () => {        
        const product = new Product("1", "Console Playstation 4 Sony", 3999);
        product.changeName("Console XBox Series S");

        expect(product.name).toBe("Console XBox Series S");
    });

    it("should try to change name of product and throw error", () => {        
        expect(() => {
            const product = new Product("1", "Console Playstation 4 Sony", 3999);
            product.changeName("");
        }).toThrowError("Product name is required!");
    });    

    it("should change price of product", () => {        
        const product = new Product("1", "Console XBox Series S", 2999);
        product.changePrice(1999);

        expect(product.price).toBe(1999);
    });
});