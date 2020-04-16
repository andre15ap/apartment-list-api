import Block from '../app/models/Block';

const blockExists = async (req) => {
  const exists = await Block.findOne({
    where: { identifier: req.body.identifier },
  });
  return !!exists;
};

export default { blockExists };
