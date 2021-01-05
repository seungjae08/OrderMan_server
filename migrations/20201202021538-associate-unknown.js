'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // field 추가
    
    // foreign key 연결
    await queryInterface.addConstraint('unknown_orders', {
      fields: ['userId'],
      type: 'foreign key',
      name: '2-1',
      references: {
        table: 'unknowns',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('unknown_order_items', {
      fields: ['orderId'],
      type: 'foreign key',
      name: '2-2',
      references: {
        table: 'unknown_orders',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('unknown_order_items', {
      fields: ['itemId'],
      type: 'foreign key',
      name: '2-3',
      references: {
        table: 'items',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('unknown_markets', {
      fields: ['userId'],
      type: 'foreign key',
      name: '2-4',
      references: {
        table: 'unknowns',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('unknown_markets', {
      fields: ['marketId'],
      type: 'foreign key',
      name: '2-5',
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
    await queryInterface.removeConstraint('unknown_markets', '2-5');
    await queryInterface.removeConstraint('unknown_markets', '2-4');
    await queryInterface.removeConstraint('unknown_order_items', '2-3');
    await queryInterface.removeConstraint('unknown_order_items', '2-2');
    await queryInterface.removeConstraint('unknown_orders', '2-1');
  }
};
