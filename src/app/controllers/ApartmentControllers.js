import * as Yup from 'yup';
import Apartment from '../models/Apartment';
import Dweller from '../models/Dweller';

class ApartmentController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const apartmenst = await Apartment.findAll({
      attributes: ['id', 'identifier'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(apartmenst);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      identifier: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Verifique os campos' });
    }

    const exists = await Apartment.findOne({
      where: { identifier: req.body.identifier },
    });

    if (exists) {
      return res.status(400).json({ error: 'Apartamento já existe.' });
    }
    const { id, identifier } = await Apartment.create(req.body);

    return res.json({ id, identifier });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      identifier: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Vefique os campos' });
    }

    const { identifier } = req.body;
    const { id } = req.params;

    const apartmentExist = await Apartment.findOne({ where: { identifier } });

    if (apartmentExist && apartmentExist.id !== Number(id)) {
      return res.status(400).json({ error: 'Identificador já esta em uso.' });
    }

    const apartment = await Apartment.findByPk(id);
    if (!apartment) {
      return res.status(400).json({ error: 'Apartamanto não encontrado' });
    }
    await apartment.update(req.body);
    return res.json(apartment);
  }

  async delete(req, res) {
    const { id } = req.params;
    const dwellers = await Dweller.findAll({ where: { apartment_id: id } });

    if (dwellers.length > 0) {
      return res
        .status(400)
        .json({ error: 'Existem Moradores cadastrados neste Apartamento' });
    }
    const result = await Apartment.destroy({ where: { id } });
    return res.json({ delete: result });
  }
}

export default new ApartmentController();
