'use strict'

const Proyecto = use('App/Models/Proyecto')
const AurizacionService = use('App/Services/AutorizacionService')

class ProyectoController {
    async index({ auth }) {
        const user = await auth.getUser()
        return await user.proyectos().fetch()
    }

    async create({ auth, request }) {
        const user = await auth.getUser()
        const { nombre } = request.all()
        const project = new Proyecto()
        project.fill({
            nombre
        })
        await user.proyectos().save(project)
        return project
    }

    async destroy({ auth, params }){
        const user = await auth.getUser()
        const { id } = params
        const project = await Proyecto.find(id)
        AurizacionService.verificarPermiso(project, user)
        await project.delete()
        return project
    }
}

module.exports = ProyectoController
