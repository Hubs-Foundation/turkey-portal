import { useContext } from 'react';
import Head from 'next/head';
import Card from '@Shared/Card/Card';
import { Button, Select } from '@mozilla/lilypad-ui';
import { submitPlam } from 'services/qa.service';
import { selectAccount } from 'store/accountSlice';
import { useSelector } from 'react-redux';
import { PlansE } from 'types/General';
import { useFormik } from 'formik';
import { StoreContext } from 'contexts/StoreProvider';

type QaPropsT = {};

export interface FormValues {
  plan: PlansE;
}

const Page = ({}: QaPropsT) => {
  const storeContext = useContext(StoreContext);
  const account = useSelector(selectAccount);
  const accountDisplayData: { key: string; value: string | null }[] = [
    {
      key: 'Display Name',
      value: account.displayName,
    },
    {
      key: 'Email',
      value: account.email,
    },
    {
      key: 'Profile Pic',
      value: account.profilePic,
    },
    {
      key: 'Is Logged In',
      value: String(account.isLoggedIn),
    },
    {
      key: 'Has Subscription',
      value: String(account.hasSubscription),
    },
    {
      key: 'Has Creating Hubs',
      value: String(account.hasCreatingHubs),
    },
    {
      key: 'Has Plan',
      value: String(account.hasPlan),
    },
    {
      key: 'Plan Name',
      value: account.planName,
    },
  ];

  const planOptions = () => {
    let options = [];
    for (const plan of Object.values(PlansE)) {
      if (account.planName !== plan) {
        options.push({ value: plan, title: plan });
      }
    }
    return options;
  };

  const submit = async (data: FormValues) => {
    try {
      // Work with Bryan on this API
      // const resp = await submitPlam(data.plan);
      storeContext.handleDispatchNotification({
        title: 'Success',
        description: 'Your plan has been successfully updated.',
        duration: 8000,
        category: 'toast',
        type: 'success',
        location: 'top_center',
        pauseOnHover: true,
        autoClose: true,
        hasIcon: true,
      });
    } catch (error) {
      storeContext.handleDispatchNotification({
        title: 'Error',
        description: `Your plan failed to updated. Error: ${error}`,
        duration: 8000,
        category: 'toast',
        type: 'error',
        location: 'top_center',
        pauseOnHover: true,
        autoClose: true,
        hasIcon: true,
      });
      console.error(error);
    }
  };

  /**
   * Init Formik
   */
  const formik = useFormik({
    initialValues: {
      plan: planOptions()[0].value,
    },
    onSubmit: submit,
  });

  return (
    <div className="page_wrapper">
      <Head>
        <title>QA Pannel</title>
      </Head>
      <main className="p-80 flex-justify-center">
        <section className="container-max-width">
          <div className="flex gap-12">
            <Card size="large">
              <form onSubmit={formik.handleSubmit}>
                <h2 className="mb-12">Change Plan</h2>
                <p className="mb-12">
                  Select plan in drop down to change your current plan.
                </p>

                <Select
                  id="plan"
                  name="plan"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.plan}
                  label="Select Plan"
                  classProp="mb-16"
                  required={true}
                  options={planOptions()}
                />
                <Button text="Submit" label="submit" type="submit" />
              </form>
            </Card>

            <Card size="large">
              <h2>Account Data</h2>
              <ul className="pl-15">
                {accountDisplayData.map(({ key, value }, i) => {
                  return (
                    <li className="mb-8" key={i}>
                      {key}: <b>{value}</b>
                    </li>
                  );
                })}
              </ul>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Page;

export async function getStaticProps() {
  if (process.env.ENABLE_QA_ROUTE !== 'true') {
    return { notFound: true };
  }

  return {
    props: {},
  };
}
