import { plansMockup } from './mockdata';

const getSubscriptionData = (block, type) => {
  const plan = {};
  if (block) {
    plan.price = block.detail.headline;
    plan.info = block.detail.body[0];
    plan.id = block._id;
    plan.type = type;
  }

  return plan;
};

const getSubscriptionHeadLine = (block) => {
  const headline = {};
  if (block) {
    headline.title = block.detail.headline;
    headline.info = block.detail.body;
  }
  return headline;
};

const plansMapping = (data, flag) => {
  if (flag) {
    return plansMockup();
  } else {
    // const storyBlocks = data.data.channels[0].story_blocks.sort((a, b) => a.order - b.order); //sorting funct;
    const mappedData = {};
    try {
      const storyBlocks = data.channels[0].story_blocks;

      mappedData.headLine = getSubscriptionHeadLine(
        storyBlocks.find((block) => block.name === 'Headline')
      );
      mappedData.monthSubscription = getSubscriptionData(
        storyBlocks.find((block) => block.name === 'MonthlyButton'),
        'Monthly'
      );
      mappedData.yearSubscription = getSubscriptionData(
        storyBlocks.find((block) => block.name === 'YearlyButton'),
        'Annual'
      );
      return mappedData;
    } catch {
      return mappedData;
    }
  }
};

export default plansMapping;
