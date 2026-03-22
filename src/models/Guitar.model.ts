import { Table, Column, Model, DataType, Default } from 'sequelize-typescript'

@Table({
    tableName: 'guitars'
})

class Guitar extends Model {
    @Column({
        type: DataType.STRING(100)
    })
    declare name: string

    @Column({
        type: DataType.STRING(100)
    })
    declare image: string

    @Column({
        type: DataType.TEXT
    })
    declare description: string

    @Column({
        type: DataType.FLOAT
    })
    declare price: number

    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    declare availability: boolean

    @Default(false)
    @Column({
        type: DataType.BOOLEAN
    })
    declare deleted: boolean
}

export default Guitar