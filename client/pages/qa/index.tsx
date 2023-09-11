import Head from 'next/head';
import Card from '@Shared/Card/Card';
import { Button, Select } from '@mozilla/lilypad-ui';
import { doCallOrWhatever } from 'services/qa.service';
import { selectAccount } from 'store/accountSlice';
import { useSelector } from 'react-redux';
import { PlansE } from 'types/General';

type QaPropsT = {};

const Page = ({}: QaPropsT) => {
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

  const submit = async () => {
    try {
      const resp = await doCallOrWhatever();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="page_wrapper">
      <Head>
        <title>QA Pannel</title>
      </Head>
      <main className="p-80 flex-justify-center">
        <section className="container-max-width">
          <div className="flex gap-12">
            <Card size="large">
              <form onSubmit={submit}>
                <h2 className="mb-12">Change Plan</h2>
                <p className="mb-12">
                  Select plan in drop down to change your current plan.
                </p>
                {/* onChange={formik.handleChange}
                   onBlur={formik.handleBlur}
                   value={formik.values.country} */}
                <Select
                  id="country"
                  name="country"
                  onChange={() => {}}
                  onBlur={() => {}}
                  value={'plan'}
                  label="Select Plan"
                  classProp="mb-16"
                  required={true}
                  options={planOptions()}
                />
                <Button text="Submit" label="submit" />
              </form>
            </Card>

            <Card size="large">
              <h2>Account Data</h2>
              <ul className="pl-15">
                {accountDisplayData.map(({ key, value }) => {
                  return (
                    <li className="mb-8">
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
