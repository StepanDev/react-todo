module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deadline: {
      type: DataTypes.DATE,
    },
  });

  Todo.associate = (models) => {
    Todo.belongsTo(models.User, {
      foreignKey: 'user',
      onDelete: 'CASCADE',
    });
    Todo.hasMany(models.TodoItem, {
      foreignKey: 'todoId',
      as: 'todoItems',
    });
  };

  return Todo;
};
