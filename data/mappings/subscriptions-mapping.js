const subscriptionsMapping = (data) => {
  let mappedData = [];
  try {
    mappedData = data.data.map((products) => {
      return {
        name: products.name === 'TWC299Monthly' ? 'Monthly' : 'Annual',
        id: products.chargify_id
      };
    });
    return mappedData;
  } catch {
    return mappedData;
  }
};

export default subscriptionsMapping;
