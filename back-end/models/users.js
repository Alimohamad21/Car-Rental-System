module.exports=(sequelize,DataTypes)=>{
    const Users=sequelize.define(
        "Users",{
                name:{
                    type:DataTypes.STRING,
                    allowNUll:false
                }
    })
    return Users;
}
