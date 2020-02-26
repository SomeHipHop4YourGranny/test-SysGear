import data from './converter.json';

function Converter(val, unit, unitTo) {
  if (unit in data && unitTo in data) {
    if (unit === unitTo) {
      return { Value: val, unti: unitTo };
    }

    const result = val * data[unit].ratio[unitTo];

    const response = {
      Value: result,
      Unit: unitTo,
    };

    return response;
  }
  return 'Invalid data';
}

export default Converter;
