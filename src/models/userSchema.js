import { Sequelize,DataTypes, Model } from "sequelize"
//const sequelize = new Sequelize('sqlite::memory:');
import { sequelize } from "../config/sqlDB.js"

export const User=sequelize.define('user',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    userName:{
        type:DataTypes.STRING,
        require:true
    },
    email:{
        type:DataTypes.STRING,
        require:true
    },
    role:{
        type:DataTypes.STRING,
        enum:['Admin','user'],
        defaultValue:'user',
        require:true
        
    },
    password:{
        type:DataTypes.STRING,
        require:true
    }
},{
    tableName:'user'
});

await User.sync({ force: false });