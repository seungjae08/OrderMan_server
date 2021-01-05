'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {    
    // foreign key 연결
    await queryInterface.addConstraint('user_orders', {
      fields: ['userId'],
      type: 'foreign key',
      name: '1-1',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('user_order_items', {
      fields: ['orderId'],
      type: 'foreign key',
      name: '1-2',
      references: {
        table: 'user_orders',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('user_order_items', {
      fields: ['itemId'],
      type: 'foreign key',
      name: '1-3',
      references: {
        table: 'items',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('user_markets', {
      fields: ['userId'],
      type: 'foreign key',
      name: '1-4',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('user_markets', {
      fields: ['marketId'],
      type: 'foreign key',
      name: '1-5',
      references: {
        table: 'markets',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // constraint 제거
    await queryInterface.removeConstraint('user_markets', '1-5');
    await queryInterface.removeConstraint('user_markets', '1-4');
    await queryInterface.removeConstraint('user_order_items', '1-3');
    await queryInterface.removeConstraint('user_order_items', '1-2');
    await queryInterface.removeConstraint('user_orders', '1-1');    
  }
};
