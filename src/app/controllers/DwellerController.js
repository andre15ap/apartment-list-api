import * as Yup from 'yup';
import Sequelize from 'sequelize';
import Dweller from '../models/Dweller';
import Apartment from '../models/Apartment';

class DwellerController {
  async index(req, res) {
    const { Op } = Sequelize;
    const { page = 1, name = '', cpf = '' } = req.query;
    const dwellers = await Dweller.findAll({
      attributes: [
        'id',
        'name',
        'email',
        'birthday',
        'cpf',
        'phone',
        'responsible',
      ],
      include: [
        {
          model: Apartment,
          as: 'apartment',
          attributes: ['id', 'identifier'],
        },
      ],
      limit: 20,
      offset: (page - 1) * 20,
      where: {
        name: { [Op.like]: `%${name}%` },
        cpf: { [Op.like]: `%${cpf}%` },
      },
    });

    return res.json(dwellers);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      birthday: Yup.date().required(),
      cpf: Yup.string().required(),
      phone: Yup.string().required(),
      email: Yup.string().email().required(),
      apartment_id: Yup.number().required(),
      responsible: Yup.bool(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Verifique os campos' });
    }

    const emailExists = await Dweller.findOne({
      where: { email: req.body.email },
    });

    if (emailExists) {
      return res.status(400).json({ error: 'Email já esta em uso.' });
    }

    const responsibleExist = await Dweller.findOne({
      where: { responsible: true, apartment_id: req.body.apartment_id },
    });

    let firstResponsible = true;
    if (responsibleExist) {
      firstResponsible = false;
    }

    const {
      id,
      name,
      birthday,
      email,
      cpf,
      phone,
      reponsible,
      apartment_id,
    } = await Dweller.create({
      ...req.body,
      responsible: firstResponsible || req.body.responsible,
    });

    return res.json({
      id,
      name,
      birthday,
      email,
      cpf,
      phone,
      reponsible,
      apartment_id,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      birthday: Yup.date(),
      cpf: Yup.string(),
      phone: Yup.string(),
      email: Yup.string(),
      apartment_id: Yup.number(),
      responsible: Yup.bool(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Verifique os campos' });
    }

    if (req.body.responsible === false) {
      return res
        .status(400)
        .json({ error: 'Necessário indicar um novo responsável' });
    }

    if (req.body.email) {
      const emailExists = await Dweller.findOne({
        where: { email: req.body.email },
      });
      if (emailExists) {
        return res.status(400).json({ error: 'Email já esta em uso.' });
      }
    }

    const { id } = req.params;

    const dweller = await Dweller.findByPk(id);
    await dweller.update(req.body);

    return res.json(dweller);
  }

  async delete(req, res) {
    const { id } = req.params;
    const dweller = await Dweller.findByPk(id);
    if (dweller.responsible) {
      return res
        .status(400)
        .json({ error: 'Usuário é o responsável pelo Apartamento' });
    }
    const deleted = await Dweller.destroy({ where: { id } });

    return res.json({ deleted });
  }
}

export default new DwellerController();
