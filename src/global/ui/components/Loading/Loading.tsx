import { Spinner } from '@nextui-org/react';
import { Page } from '../Page/Page';

const Loading = () => {
  return (
    <Spinner className="h-full w-full bg-primario" size="lg" color="default" />
    // <Page className="items-center justify-center bg-blanco">
    //   <div className="pinwheel">
    //     <span className="pl"></span>
    //     <span className="pl"></span>
    //     <span className="pl"></span>
    //     <span className="pl"></span>
    //     <span className="pl"></span>
    //     <span className="pl"></span>
    //   </div>
    // </Page>
  );
};
export default Loading;
