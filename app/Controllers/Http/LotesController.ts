import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Lote from 'App/Models/Lote';

export default class LotesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theLote: Lote = await Lote.findOrFail(params.id)
            return theLote;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Lote.query().paginate(page, perPage)
            } else {
                return await Lote.query()
            }

        }

    }

    /* public async create({ request }: HttpContextContract) {
        await request.validate(LoteValidator)
        const body = request.body();
        const theLote: Lote = await Lote.create(body);
        return theLote;

    } */

    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theLote: Lote = await Lote.create(body);
        return theLote;
    }

    public async update({ params, request }: HttpContextContract) {
        const theLote: Lote = await Lote.findOrFail(params.id);
        const body = request.body();
        theLote.peso = body.peso;
        return await theLote.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theLote: Lote = await Lote.findOrFail(params.id);
            response.status(204);
            return await theLote.delete();
    }
}
