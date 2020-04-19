import { Op } from 'sequelize';
import Dweller from '../app/models/Dweller';

const filters = (req) => {
  const { name = '', cpf = '', apartment_id = null } = req.query;
  const filter = [
    { name: { [Op.like]: `%${name}%` } },
    { cpf: { [Op.like]: `%${cpf}%` } },
  ];
  if (apartment_id) {
    filter.push({ apartment_id });
  }
  return { [Op.and]: filter };
};

const emailExists = async (req) => {
  const exists = await Dweller.findOne({
    where: { email: req.body.email },
  });

  const { id } = req.params;
  if (id && Number(id) === exists.id) {
    return false;
  }
  return !!exists;
};

const firstResponsible = async (req) => {
  if (!req.body.apartment_id) {
    return false;
  }
  const responsibleExist = await Dweller.findOne({
    where: { responsible: true, apartment_id: req.body.apartment_id },
  });

  return !responsibleExist;
};

export default { filters, emailExists, firstResponsible };
