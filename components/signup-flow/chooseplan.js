import { useEffect, useState } from 'react';
import SelectPlan from '../select-plan';
import AvailableDevices from '../available-devices';
import Button from '../button';
import getPlans from '../../hooks/components/get-plans';
import ChoosePlanSkeleton from '../skeletons/choose-plan-skeleton';
import { isEmpty } from '../../helpers/data-handler';

const Chooseplan = ({ setSubscriptionData, changeStep }) => {
  const [plansData, setPlansData] = useState('');
  const { data, isloading, error } = getPlans();
  const [planSelected, setPlanSelected] = useState('');
  const [messageError, setMessageError] = useState(false);

  const handleSubmit = () => {
    if (planSelected) {
      setSubscriptionData(planSelected);
      changeStep();
    } else {
      setMessageError(true);
    }
  };

  useEffect(() => {
    if (data && !isEmpty(data)) {
      setPlansData(data);
    }
  }, [data]);

  useEffect(() => {
    if (planSelected) {
      setMessageError(false);
    }
  }, [planSelected]);

  if (isloading || !plansData) {
    return <ChoosePlanSkeleton />;
  }

  if (error) {
    return <h2>Failed to fetch data Error:{error}</h2>;
  }

  return (
    <div>
      <div className="chooseplan">
        <p className="chooseplan__title">{plansData.headLine.title}</p>
        <p className="chooseplan__subtitle">{plansData.headLine.info}</p>
        <div className="chooseplan__plan">
          <SelectPlan
            plans={plansData}
            planSelected={planSelected}
            setPlanSelected={setPlanSelected}
          />
        </div>
        {messageError && <span className="chooseplan__error">Please select a plan </span>}
        <Button
          text="Continue"
          clickEvent={() => {
            handleSubmit();
          }} //Modify to call to action
          modifier="chooseplan--button"
          disabled={planSelected ? false : true}
        />
        <p className="chooseplan--text">7-Day free trial available only to new users.</p>
        <p className="chooseplan--text">
          If you already get access to The Weather Channel through your cable or satellite provider
          you may be able to sign-in to the app on your television using your provider information.
        </p>
      </div>
      <AvailableDevices />
    </div>
  );
};

export default Chooseplan;
