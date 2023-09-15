import styles from './CustomizeHub.module.scss';
import { useRouter } from 'next/router';
import { Button } from '@mozilla/lilypad-ui';
import Card from '@Shared/Card/Card';
import { HubT } from 'types/General';

type CustomizeHubPropsT = {
  hub: HubT;
};
export const CustomizeHub = ({ hub }: CustomizeHubPropsT) => {
  const router = useRouter();

  return (
    <section className={styles.wrapper}>
      <Card classProp={`${styles.card}`}>
        <h3 className="body-md-bold mb-12">Customize your web address</h3>
        <p className="paragraph-sm mb-12">
          Connect a custom domain to your Hub
        </p>
        <Button
          icon="arrow-right"
          iconPlacedRight={true}
          text="Edit Domain"
          label="edit domain"
          category="secondary_solid"
          onClick={() => {
            router.push({
              pathname: '/hubs/[hub_id]',
              query: { hub_id: hub.hubId },
            });
          }}
        />
      </Card>

      <Card classProp={`${styles.card}`}>
        <h3 className="body-md-bold mb-12">Upload a custom client</h3>
        <p className="paragraph-sm mb-12">Customize your Hub&apos;s code</p>
        <Button
          icon="arrow-right"
          iconPlacedRight={true}
          text="Upload Client"
          label="Upload Client"
          category="secondary_solid"
          onClick={() => {
            router.push({
              pathname: '/custom-client',
            });
          }}
        />
      </Card>
    </section>
  );
};
