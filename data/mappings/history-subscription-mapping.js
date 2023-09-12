const historySubscriptionMapping = (data) => {
  let mappedData = {};
  try {
    let history = [
      {
        date: new Date(
          data.current_subscription.subscription_info.next_assessment_at
        ).toLocaleDateString('en-US'),
        plan: data.current_subscription.subscription_info.cancel_at_end_of_period
          ? 'Cancel'
          : getPlan(data.current_subscription.product.name),
        status: data.current_subscription.subscription_info.cancel_at_end_of_period
          ? 'credit'
          : 'Upcoming Payment',
        amount:
          '$' +
          (data.current_subscription.subscription_info.product_price_in_cents / 100).toFixed(2)
      }
    ];
    data.history.map((item) => {
      history.push({
        date: new Date(item.created_at).toLocaleDateString('en-US'),
        plan: getPlan(item.product_name),
        status: item.type,
        amount: getAmount(item.type, item)
      });
      mappedData.history = history;
    });

    return history;
  } catch {
    return mappedData;
  }
};

const getAmount = (type, item) => {
  if (type) {
    if (type === 'credit') {
      return item.credit_amount;
    } else {
      return item.payment_amount;
    }
  }
};

const getPlan = (plan) => {
  if (plan) {
    if (plan === 'TWC2999Yearly') {
      return 'Annual';
    } else {
      return 'Monthly';
    }
  }
};

export default historySubscriptionMapping;
