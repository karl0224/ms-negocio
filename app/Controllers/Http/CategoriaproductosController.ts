import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Categoriaproducto from 'App/Models/Categoriaproducto';

export default class CategoriaproductosController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theCategoriaproducto: Categoriaproducto = await Categoriaproducto.findOrFail(params.id)
            //await theCategoriaproducto.load("producto")
            //await theCategoriaproducto.load("categoria")
            return theCategoriaproducto;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Categoriaproducto.query().paginate(page, perPage)
            } else {
                return await Categoriaproducto.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theCategoriaproducto: Categoriaproducto = await Categoriaproducto.create(body);
        return theCategoriaproducto;
    }

    public async update({ params, request }: HttpContextContract) {
        const theCategoriaproducto: Categoriaproducto = await Categoriaproducto.findOrFail(params.id);
        const body = request.body();
        theCategoriaproducto.producto_id = body.producto_id;
        theCategoriaproducto.categoria_id = body.categoria_id;
        return await theCategoriaproducto.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theCategoriaproducto: Categoriaproducto = await Categoriaproducto.findOrFail(params.id);
            response.status(204);
            return await theCategoriaproducto.delete();
    }
}
