import * as Yup from 'yup';
import Block from '../models/Block';
import Apartment from '../models/Apartment';

import utils from '../../utils/block';

class BlockController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const bocks = await Block.findAll({
      attributes: ['id', 'identifier'],
      limit: 20,
      offset: (page - 1) * 20,
    });
    return res.json(bocks);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      identifier: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Verifique os campos' });
    }

    if (await utils.blockExists(req)) {
      return res.status(400).json({ error: 'Bloco já existe.' });
    }
    const { id, identifier } = await Block.create(req.body);

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

    const blockExist = await Block.findOne({ where: { identifier } });

    if (blockExist && blockExist.id !== Number(id)) {
      return res.status(400).json({ error: 'Identificador já esta em uso.' });
    }

    const block = await Block.findByPk(id);
    if (!block) {
      return res.status(400).json({ error: 'Bloco não encontrado' });
    }
    await block.update(req.body);
    return res.json(block);
  }

  async delete(req, res) {
    const { id } = req.params;
    const apartments = await Apartment.findAll({ where: { block_id: id } });

    if (apartments.length > 0) {
      return res
        .status(400)
        .json({ error: 'Existem apartamentos cadastrados neste bloco' });
    }
    const deleted = await Block.destroy({ where: { id } });
    return res.json({ deleted });
  }
}

export default new BlockController();
