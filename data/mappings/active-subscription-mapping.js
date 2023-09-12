const activeSubscriptionMapping = (data) => {
  let mappedData = {};
  try {
    mappedData.platform = data.subscriptions[0].subscription.platform;
    if (mappedData.platform === 'web') {
      mappedData.account = { email: data.subscriptions[0].subscription.customer.email };
      mappedData.plan = {
        type:
          data.subscriptions[0].subscription.product.name === 'TWC2999Yearly'
            ? 'Annual'
            : 'Monthly',
        price: (data.subscriptions[0].subscription.product_price_in_cents / 100).toFixed(2),
        cancelSubscription: data.subscriptions[0].subscription.cancel_at_end_of_period,
        state: data.subscriptions[0].subscription.state
      };
      mappedData.billing = {
        nextPayment: new Date(
          data.subscriptions[0].subscription.current_period_ends_at
        ).toLocaleDateString('en-US'),
        lastPayment: new Date(
          data.subscriptions[0].subscription.current_period_started_at
        ).toLocaleDateString('en-US')
      };
      mappedData.paymentDetail = {
        cardNumber: data.subscriptions[0].subscription.credit_card.masked_card_number
          .replaceAll('X', '•')
          .replaceAll('-', ' '),
        cardType: data.subscriptions[0].subscription.credit_card.card_type,
        customerNames: {
          first_name: data.subscriptions[0].subscription.credit_card.first_name,
          last_name: data.subscriptions[0].subscription.credit_card.last_name
        },
        customerAddress: {
          billing_address: data.subscriptions[0].subscription.credit_card.billing_address,
          billing_address_2: data.subscriptions[0].subscription.credit_card.billing_address_2,
          billing_city: data.subscriptions[0].subscription.credit_card.billing_city,
          billing_zip: data.subscriptions[0].subscription.credit_card.billing_zip
        }
      };
    }
    return mappedData;
  } catch {
    return mappedData;
  }
};

export default activeSubscriptionMapping;
