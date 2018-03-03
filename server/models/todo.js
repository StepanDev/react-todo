module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Todo.associate = (models) => {
    Todo.belongsTo(models.User, {
      foreignKey: 'user',
      onDelete: 'CASCADE',
    });
    Todo.hasMany(models.TodoItem, {
      foreignKey: 'todo',
      as: 'todoItems',
    });
  };

  return Todo;
};