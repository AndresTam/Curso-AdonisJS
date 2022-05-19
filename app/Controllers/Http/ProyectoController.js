'use strict'

class ProyectoController {
    async index({ auth }) {
        const user = await auth.getUser()
        return await user.proyectos().fetch()
    }
}

module.exports = ProyectoController
