'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Task extends Model {

  workspace () {
    return this.belongsTo('App/Models/Workspace')
  }

  items () {
    return this.hasMany('App/Models/Item')
  }

}

module.exports = Task
