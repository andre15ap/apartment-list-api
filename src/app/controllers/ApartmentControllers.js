import * as Yup from 'yup';
import Apartment from '../models/Apartment';
import Block from '../models/Block';
import Dweller from '../models/Dweller';

class ApartmentController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const apartmenst = await Apartment.findAll({
      attributes: ['id', 'identifier'],
      include: [
        {
          model: Block,
          as: 'block',
          attributes: [
            ['id', 'value'],
            ['identifier', 'label'],
          ],
        },
        {
          model: Dweller,
          as: 'dwellers',
          attributes: [['id', 'value'], ['name', 'label'], 'responsible'],
        },
      ],
      limit: 20,
      offset: (page - 1) * 20,
      order: ['identifier'],
    });

    return res.json(apartmenst);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      identifier: Yup.string().required(),
      block_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Verifique os campos' });
    }

    const { dwellers } = req.body;
    if (!dwellers || dwellers.length < 1) {
      return res
        .status(400)
        .json({ error: 'Necessário informar ao menos um morador' });
    }

    const exists = await Apartment.findOne({
      where: { identifier: req.body.identifier },
    });

    if (exists) {
      return res.status(400).json({ error: 'Apartamento já existe.' });
    }
    const { id, identifier, block_id } = await Apartment.create(req.body);

    const updateAll = dwellers.map(async (value, index) => {
      const dweller = await Dweller.findByPk(value);
      await dweller.update({
        apartment_id: id,
        responsible: !!(index === 0),
      });
    });

    await Promise.all(updateAll);

    return res.json({ id, identifier, block_id });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      identifier: Yup.string(),
      block_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Vefique os campos' });
    }

    const { identifier, dwellers } = req.body;
    const { id } = req.params;

    if (dwellers && dwellers.length < 1) {
      return res
        .status(400)
        .json({ error: 'Necessário informar ao menos um morador' });
    }

    if (identifier) {
      const apartmentExist = await Apartment.findOne({ where: { identifier } });
      if (apartmentExist && apartmentExist.id !== Number(id)) {
        return res.status(400).json({ error: 'Identificador já esta em uso.' });
      }
    }

    const apartment = await Apartment.findByPk(id);
    if (!apartment) {
      return res.status(400).json({ error: 'Apartamanto não encontrado' });
    }

    if (dwellers) {
      const dwellerResponsible = await Dweller.findOne({
        where: { apartment_id: id, responsible: true },
      });

      await Dweller.update(
        { apartment_id: null, responsible: false },
        { where: { apartment_id: id } }
      );

      const updateAll = dwellers.map(async (value, index) => {
        const dweller = await Dweller.findByPk(value);
        await dweller.update({
          apartment_id: id,
          responsible:
            dwellerResponsible && dwellers.includes(dwellerResponsible.id)
              ? !!(dweller.id === dwellerResponsible.id)
              : !!(index === 0),
        });
      });

      await Promise.all(updateAll);
    }

    await apartment.update(req.body);
    return res.json(apartment);
  }

  async delete(req, res) {
    const { id } = req.params;
    await Dweller.update(
      { responsible: false },
      { where: { apartment_id: id, responsible: true } }
    );
    const deleted = await Apartment.destroy({ where: { id } });
    return res.json({ deleted });
  }

  async findAll(req, res) {
    const apartments = await Apartment.findAll({
      attributes: [
        ['id', 'value'],
        ['identifier', 'label'],
      ],
      order: ['identifier'],
    });
    return res.json(apartments);
  }
}

export default new ApartmentController();
