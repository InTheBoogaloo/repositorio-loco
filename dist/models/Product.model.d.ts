import { Model } from "sequelize-typescript";
export default class Products extends Model {
    name: string;
    price: number;
    availability: boolean;
}
