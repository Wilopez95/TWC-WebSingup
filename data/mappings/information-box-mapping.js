import { helpMockup } from './mockdata';

const informationBlockMapping = (data, flag) => {
  const mappedData = {};
  if (flag) {
    return helpMockup();
  } else {
    try {
      mappedData.body = data.page.body;
      mappedData.label = data.page.page_name;
      mappedData.title = data.page.html;
      return mappedData;
    } catch {
      return mappedData;
    }
  }
};

export default informationBlockMapping;
