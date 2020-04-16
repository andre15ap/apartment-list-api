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
  return !!exists;
};

const firstResponsible = async (req) => {
  const responsibleExist = await Dweller.findOne({
    where: { responsible: true, apartment_id: req.body.apartment_id },
  });

  return !responsibleExist;
};

export default { filters, emailExists, firstResponsible };
