import getInformationBlock from '../hooks/components/get-information-block';
import InformationBoxSkeleton from './skeletons/information-box-skeleton';
import { isEmpty } from '../helpers/data-handler';

const InformationBox = ({ queryKey, isStatic, isLegal = false }) => {
  const { data, isloading, error } = getInformationBlock(queryKey, isStatic);

  if (isloading || error) {
    return <InformationBoxSkeleton />;
  }

  if (isEmpty(data)) {
    return <InformationBoxSkeleton />;
  }

  return (
    <>
      <div className="information-box" tabIndex={0} aria-label={data.label}>
        <div
          className="information-box__content"
          dangerouslySetInnerHTML={{
            __html: !isLegal ? `<h2>${data.title}</h2> <br/><br/>` + data.body : '' + data.body
          }}
        />
      </div>
    </>
  );
};
export default InformationBox;
