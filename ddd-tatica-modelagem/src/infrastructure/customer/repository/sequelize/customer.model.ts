import { Model, Table, PrimaryKey, Column } from 'sequelize-typescript';

@Table({
    tableName: 'customers',
    timestamps: false,
})
// como estamos em um universo diferente, agora nao existe a questão de agregados/objeto de valor
// isso significa que a modelagem aqui sera normal, com todos os dados inerentes ao cliente 
// incluindo os de endereço, que nos agregados, fica em um objeto a parte
export default class CustomerModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare street: string;

    @Column({ allowNull: false })
    declare number: number;

    @Column({ allowNull: false })
    declare neighborhood: string;

    @Column({ allowNull: false })
    declare active: boolean;

    @Column({ allowNull: false })
    declare rewardPoints: number;
}
