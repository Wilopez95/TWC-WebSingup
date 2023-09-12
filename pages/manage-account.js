import WeatherImage from '../components/weather-image';
import YourAccountCard from '../components/dashboard/your-account-card';
import PlanCard from '../components/dashboard/plan-card';
import DeviceCard from '../components/dashboard/device-card';
import BillingCard from '../components/dashboard/billing-card';
import getActiveSubscription from '../hooks/components/get-active-subscription';
import Button from '../components/button';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import useUser from '../hooks/use-user';
import getConfiguration from '../hooks/components/get-configuration';
import ManageAccountSkeleton from '../components/skeletons/manage-account-skeleton';
import getSubscriptions from '../hooks/components/get-subscriptions';

const ManageAccount = () => {
  const route = useRouter();
  const { logout } = useUser();
  const [accountData, setAccountData] = useState(null);
  const [configData, setConfigData] = useState(null);
  const { data, isLoading, error } = getActiveSubscription();
  const { configurationData } = getConfiguration();
  const { data: subscriptionsData } = getSubscriptions();

  useEffect(() => {
    if (data) {
      setAccountData(data);
    }
  }, [data]);

  useEffect(() => {
    if (configurationData) {
      setConfigData(configurationData.dsp.web);
    }
  }, [configurationData]);

  if (isLoading || error) {
    return <ManageAccountSkeleton />;
  }

  const isRoku = route.query.roku === 'true' ? route.query.roku : false;

  return (
    <div className="manage-account">
      <div className="manage-account__header-container">
        <div className="manage-account__header-container__logo">
          <WeatherImage />
          <Button
            modifier="manage-account__header-container__logo--button"
            color="none"
            text="SIGN OUT"
            clickEvent={() => logout()}
          />
        </div>
        <div className="manage-account__header-container__title">
          <h1 className="manage-account__title">Manage Your Account</h1>
        </div>
      </div>

      <div className={`manage-account__container-card ${isRoku && 'roku'}`}>
        <div className="manage-account__cards">
          {accountData && <YourAccountCard emailAccount={accountData.account.email} />}
          {accountData &&
            configData &&
            (isRoku ? (
              <DeviceCard type={'Roku'} />
            ) : (
              <PlanCard
                data={accountData}
                setSubscriptionData={setAccountData}
                configData={configData}
                subscriptionsData={subscriptionsData}
              />
            ))}
        </div>

        <div className="manage-account__billing-card">
          {accountData && !isRoku && (
            <BillingCard
              subscriptionData={accountData}
              setSubscriptionData={setAccountData}
              configData={configData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageAccount;
