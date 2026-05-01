import fs from 'fs';

const a = fs.readFileSync('data.json', 'utf8');

const b = JSON.parse(a);

const c = b.map(({definitions, ...rest}) => {
  return {
    ...rest,
    translations: definitions.map(({definition, ...rest}) => {
      return {
        ...rest,
        translation: definition,
      };
    }),
  };
});

fs.writeFileSync('data-clean.json', JSON.stringify(c));