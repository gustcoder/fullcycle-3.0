import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Test Find Customer Use Cases", () => {
    let sequelize:  Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        // informa ao sequelize que a Model existe
        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should not find a customer", async () => {
        expect(async () => {
            const customerRepository = new CustomerRepository();
            const usecase = new FindCustomerUseCase(customerRepository);    

            const input = {
                id: "999"
            }

            await usecase.execute(input);
        }).rejects.toThrow('Error finding customer!');
    });    

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

        const customer = new Customer("1", "New Customer");
        const address = new Address("Street", 999, "Something");
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const input = {
            id: "1"
        }

        const output = {
            id: "1",
            name: "New Customer",
            address: {
                street: "Street", 
                number: 999, 
                neighborhood: "Something"
            }
        }

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });
});
