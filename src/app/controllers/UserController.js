import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      birthday: Yup.date().required(),
      cpf: Yup.string().required(),
      phone: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(5),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Verifique os campos' });
    }

    // TODO validar cpf tambem
    const emailExists = await User.findOne({
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
    } = await User.create(req.body);

    return res.json({ id, name, birthday, email, cpf, phone, reponsable });
  }
}

export default new UserController();
