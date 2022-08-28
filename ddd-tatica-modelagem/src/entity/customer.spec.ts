import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {
    it("should throw exception when id is empty", () => {
        expect(() => {
            const customer = new Customer("", "Miles Morales");
        })
        .toThrowError("Id is required!");
    });

    it("should throw exception when name is empty", () => {
        expect(() => {
            const customer = new Customer("1", "");
        })
        .toThrowError("Name is required!");
    });

    it("should return the id from a customer", () => {        
        const customer = new Customer("1", "Spider Man");
        const customerId = customer.id;

        expect(customerId).toBe("1");
    });

    it("should set an id for a customer", () => {        
        const customer = new Customer("1", "Spider Man");

        customer.id = "10";

        expect(customer.id).toBe("10");
    });

    it("should return the name from a customer", () => {        
        const customer = new Customer("1", "Spider Man");
        const customerName = customer.name;

        expect(customerName).toBe("Spider Man");
    });

    it("should set a name for a customer", () => {        
        const customer = new Customer("1", "Peter Parker");

        customer.name = "Miles Morales";

        expect(customer.name).toBe("Miles Morales");
    });

    it("should change the name of a customer", () => {
        // AAA - Triple A
        // Arrange
        const customer = new Customer("1", "Peter Parker");

        // Act
        customer.changeName("Miles Morales");

        // Assert
        expect(customer.name).toBe("Miles Morales");
    });

    it("should throw an error if try to change the customer's name using an empty one", () => {
        expect(() => {
            const customer = new Customer("1", "Tony Stark");
    
            customer.changeName("");
        })
        .toThrowError("Name is required!");
    });

    it("should return true when activate a customer", () => {
        const customer = new Customer("1", "Tony Stark");
        const address = new Address("Times Street", 999, "Queens")
        customer.address = address;

        customer.activateCustomer();
        expect(customer.isActive()).toBe(true);
    });      

    it("should throw an error if try to activa a customer without Address", () => {
        expect(() => {
            const customer = new Customer("1", "Tony Stark");
    
            customer.activateCustomer();
        })
        .toThrowError("Address is required to activate customer!");
    });

    it("should return false when deactivate a customer", () => {
        const customer = new Customer("1", "Tony Stark");
        const address = new Address("Times Street", 999, "Queens")
        customer.address = address;

        customer.activateCustomer();        
        customer.deactivateCustomer();

        expect(customer.isActive()).toBe(false);
    });

    it("should return 0 reward points when customer is created", () => {
        const customer = new Customer("1", "Tony Stark");
        const address = new Address("Times Street", 999, "Queens")
        customer.address = address;

        expect(customer.rewardPoints).toBe(0);
    }); 

    it("should add and return reward points correctly", () => {
        const customer = new Customer("1", "Tony Stark");
        const address = new Address("Times Street", 999, "Queens")
        customer.address = address;

        customer.addRewardPoints(1000);
        expect(customer.rewardPoints).toBe(1000);

        customer.addRewardPoints(200);
        expect(customer.rewardPoints).toBe(1200);

    }); 
});