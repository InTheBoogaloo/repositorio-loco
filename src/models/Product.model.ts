import { Table, Column, Model,DataType, Default} from "sequelize-typescript";
@Table({
    tableName:'products'
})

export default class Products extends Model{
    @Column({
        type:DataType.STRING(100)
    })
    name:string

    @Column({
        type:DataType.FLOAT
    })
    price:number
    @Default(true)
    @Column({
        type:DataType.BOOLEAN
    })
    availability:boolean
}