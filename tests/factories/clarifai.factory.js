import faker from 'faker';

export const predictFactory = ({ name = faker.internet.userName() } = {}) => ({
  outputs: [
    {
      data: {
        concepts: [
          { name },
        ],
      },
    },
  ],
});
