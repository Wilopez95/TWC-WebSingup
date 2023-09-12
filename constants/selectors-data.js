const SelectorData = () => {
  const months = [
    { id: 1, value: 'Choose' },
    { id: 2, value: '01' },
    { id: 3, value: '02' },
    { id: 4, value: '03' },
    { id: 5, value: '04' },
    { id: 6, value: '05' },
    { id: 7, value: '06' },
    { id: 8, value: '07' },
    { id: 9, value: '08' },
    { id: 10, value: '09' },
    { id: 11, value: '10' },
    { id: 12, value: '11' },
    { id: 13, value: '12' }
  ];

  const states = [
    { id: 'none', value: 'Choose' },
    { id: 'Alabama', value: 'AL' },
    {
      id: 'Alaska',
      value: 'AK'
    },
    {
      id: 'American Samoa',
      value: 'AS'
    },
    {
      id: 'Arizona',
      value: 'AZ'
    },
    {
      id: 'Arkansas',
      value: 'AR'
    },
    {
      id: 'California',
      value: 'CA'
    },
    {
      id: 'Colorado',
      value: 'CO'
    },
    {
      id: 'Connecticut',
      value: 'CT'
    },
    {
      id: 'Delaware',
      value: 'DE'
    },
    {
      id: 'District Of Columbia',
      value: 'DC'
    },
    {
      id: 'Federated States Of Micronesia',
      value: 'FM'
    },
    {
      id: 'Florida',
      value: 'FL'
    },
    {
      id: 'Georgia',
      value: 'GA'
    },
    {
      id: 'Guam',
      value: 'GU'
    },
    {
      id: 'Hawaii',
      value: 'HI'
    },
    {
      id: 'Idaho',
      value: 'ID'
    },
    {
      id: 'Illinois',
      value: 'IL'
    },
    {
      id: 'Indiana',
      value: 'IN'
    },
    {
      id: 'Iowa',
      value: 'IA'
    },
    {
      id: 'Kansas',
      value: 'KS'
    },
    {
      id: 'Kentucky',
      value: 'KY'
    },
    {
      id: 'Louisiana',
      value: 'LA'
    },
    {
      id: 'Maine',
      value: 'ME'
    },
    {
      id: 'Marshall Islands',
      value: 'MH'
    },
    {
      id: 'Maryland',
      value: 'MD'
    },
    {
      id: 'Massachusetts',
      value: 'MA'
    },
    {
      id: 'Michigan',
      value: 'MI'
    },
    {
      id: 'Minnesota',
      value: 'MN'
    },
    {
      id: 'Mississippi',
      value: 'MS'
    },
    {
      id: 'Missouri',
      value: 'MO'
    },
    {
      id: 'Montana',
      value: 'MT'
    },
    {
      id: 'Nebraska',
      value: 'NE'
    },
    {
      id: 'Nevada',
      value: 'NV'
    },
    {
      id: 'New Hampshire',
      value: 'NH'
    },
    {
      id: 'New Jersey',
      value: 'NJ'
    },
    {
      id: 'New Mexico',
      value: 'NM'
    },
    {
      id: 'New York',
      value: 'NY'
    },
    {
      id: 'North Carolina',
      value: 'NC'
    },
    {
      id: 'North Dakota',
      value: 'ND'
    },
    {
      id: 'Northern Mariana Islands',
      value: 'MP'
    },
    {
      id: 'Ohio',
      value: 'OH'
    },
    {
      id: 'Oklahoma',
      value: 'OK'
    },
    {
      id: 'Oregon',
      value: 'OR'
    },
    {
      id: 'Palau',
      value: 'PW'
    },
    {
      id: 'Pennsylvania',
      value: 'PA'
    },
    {
      id: 'Puerto Rico',
      value: 'PR'
    },
    {
      id: 'Rhode Island',
      value: 'RI'
    },
    {
      id: 'South Carolina',
      value: 'SC'
    },
    {
      id: 'South Dakota',
      value: 'SD'
    },
    {
      id: 'Tennessee',
      value: 'TN'
    },
    {
      id: 'Texas',
      value: 'TX'
    },
    {
      id: 'Utah',
      value: 'UT'
    },
    {
      id: 'Vermont',
      value: 'VT'
    },
    {
      id: 'Virgin Islands',
      value: 'VI'
    },
    {
      id: 'Virginia',
      value: 'VA'
    },
    {
      id: 'Washington',
      value: 'WA'
    },
    {
      id: 'West Virginia',
      value: 'WV'
    },
    {
      id: 'Wisconsin',
      value: 'WI'
    },
    {
      id: 'Wyoming',
      value: 'WY'
    }
  ];

  const years = () => {
    const d = new Date();
    const year = d.getFullYear().toString();
    let years = [{ id: 1, value: 'Choose' }];
    for (let i = 0; i < 10; i++) {
      const newYear = { id: i + 2, value: Number(year) + Number(i) };
      years = [...years, newYear];
    }
    return years;
  };

  const help = [
    { id: 1, value: 'FAQ' },
    { id: 2, value: 'Account & Billing' },
    { id: 3, value: 'Plans & Pricing' },
    { id: 4, value: 'Supported Devices' },
    { id: 5, value: 'Accessibility' },
    { id: 6, value: 'Closed Captioning' },
    { id: 7, value: 'Contact Us' }
  ];

  const legal = [
    { id: 1, value: 'Visitor Agreement' },
    { id: 2, value: 'Privacy Policy' },
    { id: 3, value: 'CCPA' },
    { id: 4, value: 'Do Not Sell My Information' }
  ];

  return { months: months, years: years(), states: states, help: help, legal: legal };
};
export default SelectorData;
