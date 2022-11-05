import Address from "./address";

describe("Address unit tests", () => {
    it("should be able to create address", () => {
        const street = "My street";
        const number = 999;
        const neighborhood = "Queens";

        const address = new Address(street, number, neighborhood);

        expect(address).toBeDefined();
    });

    it("should throw an error when creating address with empty street", () => {
        expect(() => {
            const street = "";
            const number = 999;
            const neighborhood = "Queens";
    
            const address = new Address(street, number, neighborhood);
        })
        .toThrowError("Street is required!");
    });

    it("should throw an error when creating address with invalid number", () => {
        expect(() => {
            const street = "My street";
            const number = -10;
            const neighborhood = "Queens";
    
            const address = new Address(street, number, neighborhood);
        })
        .toThrowError("Number must be greater than 0!");
    }); 
    
    it("should throw an error when creating address with empty neighborhood", () => {
        expect(() => {
            const street = "My street";
            const number = 999;
            const neighborhood = "";
    
            const address = new Address(street, number, neighborhood);
        })
        .toThrowError("Neighborhood is required!");
    });

    it("should return an address in a string format", () => {        
        const street = "My street";
        const number = 999;
        const neighborhood = "Queens";

        const address = new Address(street, number, neighborhood);
        const addressToString = address.toString();

        expect(addressToString).toBe("My street, 999 - Queens");
    });  
});