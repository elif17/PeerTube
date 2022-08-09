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
  const { transaction } = utils

  {
    const data = {
      type: Sequelize.INTEGER,
      defaultValue: null,
      allowNull: true
    }
    await utils.queryInterface.addColumn('userNotificationSetting', 'myVideoStudioEditionFinished', data, { transaction })
  }

  {
    const query = 'UPDATE "userNotificationSetting" SET "myVideoStudioEditionFinished" = 1'
    await utils.sequelize.query(query, { transaction })
  }

  {
    const data = {
      type: Sequelize.INTEGER,
      defaultValue: null,
      allowNull: false
    }
    await utils.queryInterface.changeColumn('userNotificationSetting', 'myVideoStudioEditionFinished', data, { transaction })
  }
}

function down () {
  throw new Error('Not implemented.')
}

export {
  up,
  down
}
