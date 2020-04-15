import * as Yup from 'yup';
import Block from '../models/Block';

class BlockController {
  async store(req, res) {
    const schema = Yup.object().shape({
      identifier: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Verifique os campos' });
    }

    const exists = await Block.findOne({
      where: { identifier: req.body.identifier },
    });

    if (exists) {
      return res.status(400).json({ error: 'Bloco já esta existe.' });
    }
    const { id, identifier } = await Block.create(req.body);

    return res.json({ id, identifier });
  }
}

export default new BlockController();
