import { useEffect, useState } from 'react';
import { urls, apiKeys } from '../../constants/api-routes';
import { useFetchGetData } from '../use-fetch';
import useToken from '../use-token';
import informationBlockMapping from '../../data/mappings/information-box-mapping';
import { useRouter } from 'next/dist/client/router';

const getInformationURL = (tokenKey) => {
  switch (tokenKey) {
    case 'Account & Billing':
      return urls.BILLING;
    case 'Plans & Pricing':
      return urls.PRICING;
    case 'Supported Devices':
      return urls.DEVICES;
    case 'Accessibility':
      return urls.ACCESSIBILITY;
    case 'Closed Captioning':
      return urls.CAPTIONING;
    case 'Contact Us':
      return urls.CONTACT;
    case 'Visitor Agreement':
      return urls.AGREEMENT;
    case 'Privacy Policy':
      return urls.POLICY;
    case 'CCPA':
      return urls.CCPA;
    case 'Do Not Sell My Information':
      return urls.INFORMATION;
  }
};

const getInformationKey = (tokenKey) => {
  switch (tokenKey) {
    case 'Account & Billing':
      return apiKeys.BILLING;
    case 'Plans & Pricing':
      return apiKeys.PRICING;
    case 'Supported Devices':
      return apiKeys.DEVICES;
    case 'Accessibility':
      return apiKeys.ACCESSIBILITY;
    case 'Closed Captioning':
      return apiKeys.CAPTIONING;
    case 'Contact Us':
      return apiKeys.CONTACT;
    case 'Visitor Agreement':
      return apiKeys.CONTACT;
    case 'Privacy Policy':
      return apiKeys.POLICY;
    case 'CCPA':
      return apiKeys.CCPA;
    case 'Do Not Sell My Information':
      return apiKeys.INFORMATION;
  }
};

const getInformationBlock = (queryKey) => {
  const token = useToken();
  const route = useRouter();
  const isMockup = route.query.mockup === 'true' ? route.query.mockup : false;

  const [componentData, setComponentData] = useState();
  const [isLoadingComp, setIsLoadingComp] = useState(true);

  const url = process.env.DOT_STUDIO_URL + getInformationURL(queryKey);
  const key = getInformationKey(queryKey);

  const { data, error } = useFetchGetData(key, url, { 'x-access-token': token });

  useEffect(() => {
    setIsLoadingComp(true);
  }, [queryKey]);

  useEffect(() => {
    if (data) {
      setComponentData(informationBlockMapping(data, isMockup));
      setIsLoadingComp(false);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setIsLoadingComp(false);
    }
  }, [error]);

  return { data: componentData, isloading: isLoadingComp, error: error };
};
export default getInformationBlock;
