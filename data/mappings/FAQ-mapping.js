import { FAQMockup } from './mockdata';

const faqMapping = (data, flag) => {
  if (flag) {
    return FAQMockup();
  } else {
    let mappedData = [];
    try {
      const storyBlocks = data.channels[0].story_blocks;
      storyBlocks.map((item) => {
        mappedData.push(item.detail);
      });
      return mappedData;
    } catch {
      return mappedData;
    }
  }
};

export default faqMapping;
