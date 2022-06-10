import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './[hub_id].module.scss';
import type { GetServerSidePropsContext } from 'next';
import { HubT, UpdateHubT } from 'types/General';
import { HubGroupOptionT } from '@Shared/HubOptionGroup/HubOptionGroup'; // just used for mock data for now.
import { getHub, updateHub } from 'services/hub.service';
import { requireAuthentication } from 'services/routeGuard.service';
import { HUB_ROOT_DOMAIN } from 'config';
import Head from 'next/head';
import PageHeading from '@Shared/PageHeading/PageHeading';
import Form from '@Shared/Form/Form';
import Input from '@Shared/Input/Input';
import Badge from '@Shared/Badge/Badge';
import HubOptionGroup from '@Shared/HubOptionGroup/HubOptionGroup';
import SkeletonCard from '@Cards/SkeletonCard/SkeletonCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type HubDetailsViewPropsT = {};

const HubDetailsView = ({}: HubDetailsViewPropsT) => {
  const router = useRouter();
  const [addressPreview, setAddressPreview] = useState('mockurl');
  const [hub, setHub] = useState<HubT>();
  const [loading, setLoading] = useState(true);
  const [initialFormValues, setInitialFormValues] = useState({
    name: '',
    address: '',
    tier: '',
  });
  const { hub_id } = router.query;

  /**
   * Get Hub By ID
   */
  useEffect(() => {
    getHub(`${hub_id}`).then((hub) => {
      console.log('hub', hub);
      setLoading(false);
      setHub(hub);
      setAddressPreview(hub.subdomain);
      setInitialFormValues({
        name: hub.name,
        address: hub.subdomain,
        tier: hub.tier,
      });
    });
  }, [hub_id]);

  const handleFormSubmit = ({ name, tier, subdomain }: HubT) => {
    if (!hub) return;

    const {
      ccuLimit,
      status,
      storageLimitMb,
    } = hub;
    const { hub_id } = router.query;

    /**
     * Update Date from from
     * keep all other data as is
     */
    const updatedHub: UpdateHubT = {
      name,
      ccuLimit,
      status,
      storageLimitMb,
      subdomain,
      tier,
    };

    updateHub(`${hub_id}`, updatedHub).then((resp) => {
      console.log('resp',resp)
      toast.success(`Hub: ${name} has been updated!`);
    });
  };

  const handleCancelClick = () => {
    router.push({
      pathname: '/dashboard',
    });
  };

  const handleAddresschange = useCallback((address: string) => {
    setAddressPreview(address);
  }, []);

  // Mock Data
  const radioFormOptions: HubGroupOptionT[] = [
    {
      label: 'Free',
      labelCategory: 'primary',
      value: 'free',
      size: '250MB',
      users: 5,
      groupName: 'tier',
      id: 'freeOption',
    },
    {
      label: 'MVP 2',
      labelCategory: 'secondary',
      value: 'mvp',
      size: '2GB',
      users: 25,
      groupName: 'tier',
      id: 'mvpOption',
    },
  ];

  return (
    <div className="page_wrapper">
      <Head>
        <title>Hub Details View</title>
        <meta name="description" content="detailed information about a Hub" />
      </Head>

      <PageHeading title="Hub Settings" />

      {!loading && hub !== undefined ? (
        <main className="flex-justify-center margin-10">
          <div className={styles.settings_grid_wrapper}>
            <div className={styles.settings_form_wrapper}>
              <Form
                initialValues={initialFormValues}
                submit={handleFormSubmit}
                cancelClick={handleCancelClick}
              >
                <>
                  <Input label="Hub Name" name="name" required={true} />

                  <HubOptionGroup name="tier" options={radioFormOptions} />

                  <div className={styles.address_wrapper}>
                    <Input
                      onChange={handleAddresschange}
                      classProp="margin-bottom-10"
                      label="Web Address (URL)"
                      name="address"
                      info="Supports letters (a to z), digits (0 to 9), and hyphens (-)"
                      required={true}
                    />
                    <div className={styles.address_preview}>
                      <b>{addressPreview}</b>.{HUB_ROOT_DOMAIN}
                    </div>
                  </div>
                </>
              </Form>
            </div>
            <div className={styles.summary_wrapper}>
              <h3 className={styles.summary_title}>Summary</h3>
              <ul className={styles.summary_attributes}>
                <li>
                  Tier:{' '}
                  <Badge
                    name={hub.tier}
                    category={hub.tier === 'free' ? 'primary' : 'secondary'}
                  />
                </li>
                <li>People: {hub.ccuLimit}</li>
                <li>
                  Capacity:{' '}
                  {hub.currentStorageMb ? hub.currentStorageMb : 'Creating'}
                </li>{' '}
                {/* TODO: what do we do with no storage here  */}
              </ul>
            </div>
          </div>
        </main>
      ) : (
        <div className="flex-justify-center">
          <div className={styles.skeleton_container}>
            <SkeletonCard qty={3} category="square" />
            <SkeletonCard qty={3} category="square" />
            <SkeletonCard qty={3} category="square" />
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default HubDetailsView;

export const getServerSideProps = requireAuthentication(
  (context: GetServerSidePropsContext) => {
    // Your normal `getServerSideProps` code here
    return { props: {} };
  }
);
