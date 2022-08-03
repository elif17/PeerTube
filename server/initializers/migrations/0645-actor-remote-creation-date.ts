// SPDX-FileCopyrightText: 2014-2022 Pierre-Yves Gosset, <pyg@framasoft.org>, et al.
//
// SPDX-License-Identifier: GPL-3.0-only

import * as Sequelize from 'sequelize'

async function up (utils: {
  transaction: Sequelize.Transaction
  queryInterface: Sequelize.QueryInterface
  sequelize: Sequelize.Sequelize
  db: any
}): Promise<void> {
  {
    const data = {
      type: Sequelize.DATE,
      defaultValue: null,
      allowNull: true
    }
    await utils.queryInterface.addColumn('actor', 'remoteCreatedAt', data)
  }
}

function down (options) {
  throw new Error('Not implemented.')
}

export {
  up,
  down
}
