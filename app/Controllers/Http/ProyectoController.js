'use strict'

const Proyecto = use('App/Models/Proyecto')

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

    async destroy({ auth, response, params }){
        const user = await auth.getUser()
        const { id } = params
        const project = await Proyecto.find(id)
        if(project.user_id !== user.id){
            return response,status(403).json({
                mensaje: 'No puedes eliminar un proyecto del cual eres dueño'
            })
        }
        await project.delete()
        return project
    }
}

module.exports = ProyectoController
