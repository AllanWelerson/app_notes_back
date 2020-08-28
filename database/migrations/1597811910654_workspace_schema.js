'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WorkspaceSchema extends Schema {
  up () {
    this.create('workspaces', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('name', 40).notNullable()
      table.string('description', 250)
      table.timestamps()
    })
  }

  down () {
    this.drop('workspaces')
  }
}

module.exports = WorkspaceSchema
