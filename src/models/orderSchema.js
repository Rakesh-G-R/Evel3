import { Sequelize,DataTypes } from "sequelize"
//const sequelize = new Sequelize('sqlite::memory:');
import { sequelize } from "../config/sqlDB.js"

 export const Order=sequelize.define('orders',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    bookId:{
        type:DataTypes.STRING,
        require:true
    },
    userId:{
        type:DataTypes.INTEGER,
        require:true,
    },
    quantity:{
        type: DataTypes.INTEGER,
        default:1,
        require:true
    },
},{
    tableName:"orders"
})

await Order.sync({ force: false });