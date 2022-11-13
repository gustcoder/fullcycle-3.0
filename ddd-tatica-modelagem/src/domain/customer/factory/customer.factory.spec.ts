import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer Factory Tests", () => {
    it("should create a customer", () => {
        const customer = CustomerFactory.create("Customer Test");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Customer Test");
        expect(customer.address).toBeUndefined();
        expect(customer.constructor.name).toBe("Customer");
    });

    it("should create a customer with address", () => {
        const address = new Address("Some Street", 99, "Brooklyn");
        const customer = CustomerFactory.createWithAddress("Customer Test With Address", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Customer Test With Address");
        expect(customer.address).toEqual(address);
        expect(customer.constructor.name).toBe("Customer");
    });    
});
