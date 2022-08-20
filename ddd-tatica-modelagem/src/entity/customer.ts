/* 
diferencas entre NEGOCIO X PERSISTENCIA (model)

ter 2 estruturas onde:
    - entity/customer.ts: regras de negocio (dominio) / Complexidade de Negocio, obedecendo suas regras
    - model/customer.ts: getters/setters apenas para persistencia (fala com mundo externo) / Complexidade Acidental

*/

import Address from "./address";

export default class Customer {
    _id: string;
    _name: string;
    _address!: Address; // inicializacao nao obrigatoria com "!"
    _active: boolean = false;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    validate() {
        if (this._name.length === 0) {
            throw new Error("Name is required!");
        }

        if (this._id.length === 0) {
            throw new Error("Id is required!");
        }
    }

    get id(): string {
        return this._id;
    }

    set id(id: string) {
        this._id = id;
    }

    get name(): string {
        return this._name;
    }

    // nao possui expressividade, está aqui por estar/apenas permitir mudanca
    set name(name: string) {
        this._name = name;
        this.validate(); // garantir a consistencia da entidade
    }

    // aqui expressa uma intencao/pode conter regra de negocio (semantica faz a diferenca mesmo o resultado sendo o mesmo)
    changeName(name: string) {
        this._name = name;
    }

    get address(): Address {
        return this._address;
    }

    set address(address: Address) {
        this._address = address;
    }

    // exemplo de expressar a regra, ao inves de apenas usar "getters x setters"
    activateCustomer() {
        // garantindo consistencia
        if (this._address === undefined) {
            throw new Error("Address is required to activate customer!")
        }
        this._active = true;
    }

    deactivateCustomer() {
        this._active = false;
    }
}