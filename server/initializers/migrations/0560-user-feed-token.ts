// SPDX-FileCopyrightText: 2014-2022 Pierre-Yves Gosset, <pyg@framasoft.org>, et al.
//
// SPDX-License-Identifier: GPL-3.0-only

import * as Sequelize from 'sequelize'
import { buildUUID } from '@shared/extra-utils'

async function up (utils: {
  transaction: Sequelize.Transaction
  queryInterface: Sequelize.QueryInterface
  sequelize: Sequelize.Sequelize
  db: any
}): Promise<void> {
  const q = utils.queryInterface

  {
    // Create uuid column for users
    const userFeedTokenUUID = {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: true
    }
    await q.addColumn('user', 'feedToken', userFeedTokenUUID)
  }

  // Set UUID to previous users
  {
    const query = 'SELECT * FROM "user" WHERE "feedToken" IS NULL'
    const options = { type: Sequelize.QueryTypes.SELECT as Sequelize.QueryTypes.SELECT }
    const users = await utils.sequelize.query<any>(query, options)

    for (const user of users) {
      const queryUpdate = `UPDATE "user" SET "feedToken" = '${buildUUID()}' WHERE id = ${user.id}`
      await utils.sequelize.query(queryUpdate)
    }
  }

  {
    const userFeedTokenUUID = {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    }
    await q.changeColumn('user', 'feedToken', userFeedTokenUUID)
  }
}

function down (options) {
  throw new Error('Not implemented.')
}

export {
  up,
  down
}
