
import { CreditCardIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

function Cancel() {
  return (
    <div className="min-h-screen flex flex-col mt-10 text-white">
      <h1 className=" text-7xl font-bold mb-4">Oops!</h1>
      <p className="text-xl ">We've got some bad news. Your order has been cancelled. We couldn't process your payment. Please try again or contact us if you need help.</p>
      <div className="mt-10 w-full rounded-3xl">
        <ExclamationTriangleIcon className=" md:h-96 white" />
      </div>
    </div>
  );
}

export default Cancel;
