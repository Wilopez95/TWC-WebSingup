const formatImages = (images) => {
  const listOfImages = images.slice(1, -2).split(',');
  const web = listOfImages[0].split(': ');
  const mobile = listOfImages[1].split(': ');
  const imagesArray = { web: web[1].replaceAll('"', ''), mobile: mobile[1].replaceAll('"', '') };
  return imagesArray;
};

const Home = (blocks) => {
  const homeBlock = {
    code_block: formatImages(blocks[0].detail.code_block),
    headline: blocks[0].detail.headline,
    body: blocks[0].detail.body[0],
    ctas: [
      {
        cta: blocks[1].detail.call_to_action,
        headline: blocks[1].detail.headline,
        body: blocks[1].detail.body[0]
      },
      {
        cta: blocks[2].detail.call_to_action,
        headline: blocks[2].detail.headline,
        body: blocks[2].detail.body[0]
      }
    ]
  };
  return homeBlock;
};

const ChoosePlan = (blocks) => {
  const ChoosePlanBlock = {
    headline: blocks[2].detail.headline,
    body: blocks[2].detail.body[0],
    plans: [
      {
        headline: blocks[0].detail.headline,
        body: blocks[0].detail.body[0],
        underline: blocks[0].detail.code_block
      },
      {
        headline: blocks[1].detail.headline,
        body: blocks[1].detail.body[0],
        underline: blocks[1].detail.code_block
      }
    ]
  };
  return ChoosePlanBlock;
};

const GenericBlock = (blocks) => {
  const block = {
    code_block: formatImages(blocks.detail.code_block),
    headline: blocks.detail.headline,
    body: blocks.detail.body[0]
  };
  return block;
};

const onboardMapping = (data) => {
  let mappedData = {};
  try {
    const storyBlocks = data.channels[0].story_blocks;
    const home = Home(storyBlocks.slice(0, 3));
    const stormCoverage = GenericBlock(storyBlocks[3]);
    const streamDevices = GenericBlock(storyBlocks[4]);
    const choosePlan = ChoosePlan([storyBlocks[12], storyBlocks[13], storyBlocks[5]]);
    const severeWeatherAlerts = GenericBlock(storyBlocks[6]);
    const currentConditions = GenericBlock(storyBlocks[7]);
    const activeMapsAndRadar = GenericBlock(storyBlocks[8]);
    const originalShows = GenericBlock(storyBlocks[9]);
    const breakingWeather = GenericBlock(storyBlocks[10]);
    mappedData = {
      home,
      stormCoverage,
      streamDevices,
      choosePlan,
      severeWeatherAlerts,
      currentConditions,
      activeMapsAndRadar,
      originalShows,
      breakingWeather
    };
    return mappedData;
  } catch {
    return mappedData;
  }
};

export default onboardMapping;
