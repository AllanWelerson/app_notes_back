'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Workspace = use('App/Models/Workspace')

/**
 * Resourceful controller for interacting with workspaces
 */
class WorkspaceController {
  /**
   * Show a list of all workspaces.
   * GET workspaces
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ auth }) {
    const workspace = await Workspace
                            .query()
                            .where('user_id', auth.user.id)
                            .with('tasks')
                            .fetch()

    return workspace
  }

  /**
   * Create/save a new workspace.
   * POST workspaces
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const data = request.only(['name','description'])

    const workspace = await Workspace.create({ ...data, user_id: auth.user.id})

    return workspace
  }

  /**
   * Display a single workspace.
   * GET workspaces/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const workspace = await Workspace.findOrFail(params.id)

    return workspace
  }

  /**
   * Update workspace details.
   * PUT or PATCH workspaces/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const workspace = await Workspace.findOrFail(params.id)

    const data = request.only(['name','description'])

    workspace.merge(data)

    await workspace.save()

    return workspace
  }

  /**
   * Delete a workspace with id.
   * DELETE workspaces/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params }) {
    const workspace = await Workspace.findOrFail(params.id)

    workspace.delete()
  }
}

module.exports = WorkspaceController
