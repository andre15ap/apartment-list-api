import * as Yup from 'yup';
import Apartment from '../models/Apartment';

class ApartmentController {
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
      return res.status(400).json({ error: 'Apartamento já esta existe.' });
    }
    const { id, identifier } = await Apartment.create(req.body);

    return res.json({ id, identifier });
  }
}

export default new ApartmentController();
