import { Model, Table, PrimaryKey, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import CustomerModel from './customer.model';
import OrderModel from './order.model';
import ProductModel from './product.model';

@Table({
    tableName: 'order_itens',
    timestamps: false,
})

export default class OrderItemModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare price: number;
    
    @Column({ allowNull: false })
    declare quantity: number;    

    @Column({ allowNull: false })
    @ForeignKey(() => ProductModel)
    declare product_id: string;

    @BelongsTo(() => ProductModel)
    declare product: ProductModel;

    @Column({ allowNull: false })
    @ForeignKey(() => OrderModel)
    declare order_id: string;

    @BelongsTo(() => OrderModel)
    declare order: OrderModel;    
}
