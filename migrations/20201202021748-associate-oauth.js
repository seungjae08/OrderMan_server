'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // field 추가
    
    // foreign key 연결
    await queryInterface.addConstraint('oauth_orders', {
      fields: ['userId'],
      type: 'foreign key',
      name: '3-1',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('oauth_order_items', {
      fields: ['orderId'],
      type: 'foreign key',
      name: '3-2',
      references: {
        table: 'user_orders',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('oauth_order_items', {
      fields: ['itemId'],
      type: 'foreign key',
      name: '3-3',
      references: {
        table: 'items',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('oauth_markets', {
      fields: ['userId'],
      type: 'foreign key',
      name: '3-4',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('oauth_markets', {
      fields: ['marketId'],
      type: 'foreign key',
      name: '3-5',
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
    await queryInterface.removeConstraint('oauth_markets', '3-5');
    await queryInterface.removeConstraint('oauth_markets', '3-4');
    await queryInterface.removeConstraint('oauth_order_items', '3-3');
    await queryInterface.removeConstraint('oauth_order_items', '3-2');
    await queryInterface.removeConstraint('oauth_orders', '3-1');
  }
};
