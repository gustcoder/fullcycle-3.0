import { Sequelize } from 'sequelize-typescript';
import Product from '../../domain/entity/product';
import ProductModel from '../db/sequelize/model/product.model';
import ProductRepository from './product.repository';

describe("Product Repository unit tests", () => {

    let sequelize:  Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        // informa ao sequelize que a Model existe
        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product based on the model", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Teclado Casiotone CT-S200", 1000);
        
        await productRepository.create(product);

        const expectedProduct = await ProductModel.findOne({ where: { id: "1" } });

        expect(expectedProduct?.id).toBe("1");
        expect(expectedProduct?.name).toBe("Teclado Casiotone CT-S200");
        expect(expectedProduct?.price).toBe(1000);
    });   

    it("should update the price of a product based on the model", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Teclado Casiotone CT-S200", 1000);

        await productRepository.create(product);
        
        const expectedProduct = await ProductModel.findOne({ where: { id: "1" } });

        // valida o produto criado com as informacoes iniciais
        expect(expectedProduct?.name).toBe("Teclado Casiotone CT-S200");
        expect(expectedProduct?.price).toBe(1000);        

        // altera as informacoes
        product.changeName("Playstation 5");
        product.changePrice(4700);

        await productRepository.update(product);        

        // valida o produto atualizado com as novas informacoes
        const expectedProductAfterUpdate = await ProductModel.findOne({ where: { id: "1" } });

        expect(expectedProductAfterUpdate?.name).toBe("Playstation 5");
        expect(expectedProductAfterUpdate?.price).toBe(4700);
    });

    it("should find a product based on id", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Teclado Casiotone CT-S200", 1000);
        
        await productRepository.create(product);

        const expectedProduct = await productRepository.find(product.id);

        expect(expectedProduct?.id).toBe("1");
        expect(expectedProduct?.name).toBe("Teclado Casiotone CT-S200");
        expect(expectedProduct?.price).toBe(1000);
    });

    it("should throw an error when trying to find a non existent product id", async () => {
        expect(async () => {
            const productRepository = new ProductRepository();
            const product = new Product("1", "Teclado Casiotone CT-S200", 1000);
            
            await productRepository.create(product);
    
            await productRepository.find("10");
        }).rejects.toThrow('Error finding product!');
    });

    it("should return existent products", async () => {
        const productRepository = new ProductRepository();
        
        const product1 = new Product("1", "Teclado Casiotone CT-S200", 1000);        
        await productRepository.create(product1);

        const product2 = new Product("2", "Playstation 5", 4700);
        await productRepository.create(product2);
        
        const products = [product1, product2];
        
        const foundProducts = await productRepository.findAll();

        expect(products).toEqual(foundProducts);
    });    

    it("should return empty when have no products", async () => {
        const productRepository = new ProductRepository();
        
        const expected = await productRepository.findAll();

        expect(expected).toEqual([]);
    });

});
