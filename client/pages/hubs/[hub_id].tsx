import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { HubT, UpdateHubT } from 'types/General';
import { getHub, updateHub } from 'services/hub.service';
import { requireAuthentication } from 'services/routeGuard.service';
import Head from 'next/head';
import PageHeading from '@Shared/PageHeading/PageHeading';
import Badge from '@Shared/Badge/Badge';
import SkeletonCard from '@Cards/SkeletonCard/SkeletonCard';
import { ToastContainer, toast } from 'react-toastify';
import HubForm, { HubFormT } from '@Forms/HubForm/HubForm';
import type { GetServerSidePropsContext } from 'next';
import 'react-toastify/dist/ReactToastify.css';
import styles from './[hub_id].module.scss';

type HubDetailsViewPropsT = {};

const HubDetailsView = ({}: HubDetailsViewPropsT) => {
  const router = useRouter();
  const [hub, setHub] = useState<HubT | null>(null);
  const [loading, setLoading] = useState(true);
  const { hub_id } = router.query;

  /**
   * Get Hub By ID
   */
  useEffect(() => {
    getHub(`${hub_id}`).then((hub: HubT) => {
      setLoading(false);
      setHub(hub);
    });
  }, [hub_id]);

  const launchToastError = () => {
    // TODO: set up error logger
    toast.error('Sorry, there was an error locating this Hub.', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
    });
    setLoading(false);
  };

  const handleFormSubmit = ({ name, tier, subdomain }: HubFormT) => {
    setLoading(true);
    if (!hub) {
      launchToastError();
      return;
    }

    /**
     * Update Date from from
     * keep all other data as is
     */
    const { ccuLimit, status, storageLimitMb, hubId } = hub;
    const updatedHub: UpdateHubT = {
      name,
      ccuLimit,
      status,
      storageLimitMb,
      subdomain,
      tier,
    };

    updateHub(`${hubId}`, updatedHub).then((resp) => {
      resp?.status === 200
        ? toast.success(`Hub: ${name} has been updated!`)
        : toast.error('Sorry, there was an error updating this Hub.');

      setLoading(false);
    });
  };

  return (
    <div className="page_wrapper">
      <Head>
        <title>Hub Details View</title>
        <meta name="description" content="detailed information about a Hub" />
      </Head>

      <PageHeading title="Hub Settings" />

      {!loading && hub !== null ? (
        <main className="flex-justify-center margin-10">
          <div className={styles.settings_grid_wrapper}>
            <div className={styles.settings_form_wrapper}>
              <HubForm hub={hub} onSubmit={handleFormSubmit} />
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
                  {/* TODO: what do we do with no storage here  */}
                  Capacity:{' '}
                  {hub.currentStorageMb ? hub.currentStorageMb : 'Creating'}
                </li>{' '}
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
