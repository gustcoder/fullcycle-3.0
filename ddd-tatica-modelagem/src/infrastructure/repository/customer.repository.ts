import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {

    async create(customer: Customer): Promise<void> {
        try {
            await CustomerModel.create({
                id: customer.id,
                name: customer.name,
                street: customer.address.street,
                number: customer.address.number,
                neighborhood: customer.address.neighborhood,
                active: customer.isActive(),
                rewardPoints: customer.rewardPoints
            });
        } catch (error) {
            throw new Error("Error creating customer!" + error);
        }
    }
    
    async update(customer: Customer): Promise<void> {
        try {
            await CustomerModel.update(
                {
                    name: customer.name,
                    street: customer.address.street,
                    number: customer.address.number,
                    neighborhood: customer.address.neighborhood,
                    active: customer.isActive(),
                    rewardPoints: customer.rewardPoints
                },
                {
                    where: {
                        id: customer.id
                    }
                }
            );
        } catch (error) {
            throw new Error("Error updating customer!");
        }
    }
    
    async find(customerId: string): Promise<Customer|null> {
        try {
            const findCustomer = await CustomerModel.findOne({
                where: { 
                    id: customerId 
                },
                rejectOnEmpty: true
            });
            const customer = findCustomer ? new Customer(findCustomer.id, findCustomer.name) : null;

            return customer;
        } catch (error) {
            throw new Error("Error finding customer!");
        }
    }

    async findAll(): Promise<Customer[]|[]> {
        const customers = await CustomerModel.findAll();
        
        return customers.map((customer) => new Customer(customer.id, customer.name));
    }    

    /*
    async findByCustomerId(customerId: string): Promise<Customer> {
        throw new Error("Not implemented");
    }
    */
}
