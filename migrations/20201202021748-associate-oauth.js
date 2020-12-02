'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // field 추가
    await queryInterface.addColumn('oauth_orders', 'user_id', Sequelize.INTEGER);
    await queryInterface.addColumn('oauth_order_items', 'order_id', Sequelize.INTEGER);
    await queryInterface.addColumn('oauth_order_items', 'item_id', Sequelize.INTEGER);
    await queryInterface.addColumn('oauth_markets', 'user_id', Sequelize.INTEGER);
    await queryInterface.addColumn('oauth_markets', 'market_id', Sequelize.INTEGER);
    // foreign key 연결
    await queryInterface.addConstraint('oauth_orders', {
      fields: ['user_id'],
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
      fields: ['order_id'],
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
      fields: ['item_id'],
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
      fields: ['user_id'],
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
      fields: ['market_id'],
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
    // field 제거
    await queryInterface.removeColumn('oauth_markets', 'market_id');
    await queryInterface.removeColumn('oauth_markets', 'user_id');
    await queryInterface.removeColumn('oauth_order_items', 'item_id');
    await queryInterface.removeColumn('oauth_order_items', 'order_id');
    await queryInterface.removeColumn('oauth_orders', 'user_id');
  }
};
