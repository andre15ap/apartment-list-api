import * as Yup from 'yup';
import Dweller from '../models/Dweller';

class DwellerController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      birthday: Yup.date().required(),
      cpf: Yup.string().required(),
      phone: Yup.string().required(),
      email: Yup.string().email().required(),
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
    const {
      id,
      name,
      birthday,
      email,
      cpf,
      phone,
      reponsable,
    } = await Dweller.create(req.body);

    return res.json({ id, name, birthday, email, cpf, phone, reponsable });
  }
}

export default new DwellerController();
