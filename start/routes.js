'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('users','UserController.store')
Route.get('users/:id','UserController.show').middleware(['auth'])
Route.put('users/:id','UserController.update').middleware(['auth'])
Route.post('sessions','SessionController.store')
Route.delete('sessions','SessionController.destroy').middleware(['auth'])

Route.resource('workspace','WorkspaceController').middleware(['auth'])

Route.group(() => {
  Route.resource('workspace.tasks', 'TaskController')
  Route.resource('workspace.tasks.items', 'ItemController')
}).middleware(['auth'])
