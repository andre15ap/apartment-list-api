import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(5),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Verifique os campos' });
    }

    const emailExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (emailExists) {
      return res.status(400).json({ error: 'Email já esta em uso.' });
    }
    const { id, name, email } = await User.create(req.body);

    return res.json({ id, name, email });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(5),
      password: Yup.string()
        .min(5)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Vefique os campos' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email && email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'Email ja estão em uso.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Senha Incorreta' });
    }

    await user.update(req.body);

    return res.json({ id: user.id, name: user.name, email: user.email });
  }
}

export default new UserController();
