import { Sequelize } from 'sequelize-typescript';
import Address from '../../domain/entity/address';
import Customer from '../../domain/entity/customer';
import CustomerModel from '../db/sequelize/model/customer.model';
import CustomerRepository from './customer.repository';

describe("Customer Repository unit tests", () => {

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

    it("should create a customer based on the model", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Amazon");

        const address = new Address('Times Square', 199, 'Manhattan');
        customer.address = address;
        
        await customerRepository.create(customer);

        const expectedCustomer = await CustomerModel.findOne({ where: { id: "1" } });

        expect(expectedCustomer?.id).toBe("1");
        expect(expectedCustomer?.name).toBe("Amazon");
    });

    it("should update a customer by activating it", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Amazon");

        const address = new Address('Times Square', 199, 'Manhattan');
        customer.address = address;
        
        await customerRepository.create(customer);
        
        let expectedCustomer = await CustomerModel.findOne({ where: { id: "1" } });

        expect(expectedCustomer?.active).toBe(false);

        customer.activateCustomer();
        
        await customerRepository.update(customer);

        expectedCustomer = await CustomerModel.findOne({ where: { id: "1" } });

        expect(expectedCustomer?.active).toBe(true);
    });    

    it("should find a customer based on id", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Netflix");

        const address = new Address('Silicon Valley', 200, 'Palo Alto');
        customer.address = address;
        
        await customerRepository.create(customer);

        const expectedCustomer = await customerRepository.find(customer.id);

        expect(expectedCustomer?.id).toBe("1");
        expect(expectedCustomer?.name).toBe("Netflix");
    });

    it("should throw an error when trying to find a non existent customer id", async () => {
        expect(async () => {
            const customerRepository = new CustomerRepository();
            const customer = new Customer("1", "Amazon");
            
            const address = new Address('Times Square', 199, 'Manhattan');
            customer.address = address;
            
            await customerRepository.create(customer);
            
            await customerRepository.find("10");
        }).rejects.toThrow('Error finding customer!');
    });  

    it("should return empty when have no customers", async () => {
        const customerRepository = new CustomerRepository();
        
        const expected = await customerRepository.findAll();

        expect(expected).toEqual([]);
    });
});
