import styles from './CustomizeHub.module.scss';
import { useRouter } from 'next/router';
import { Button, ButtonCategoriesE } from '@mozilla/lilypad-ui';
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
          (PLACEHOLDER) Boost SEO, Ditch generic URLs, Future-proof your
          presence on the immersive web
        </p>
        <Button
          text="Edit Domain"
          label="edit domain"
          category={ButtonCategoriesE.SECONDARY_SOLID}
          onClick={() => {
            router.push({
              pathname: '/custom-client',
            });
          }}
        />
      </Card>
      <Card classProp={`${styles.card}`}>
        <h3 className="body-md-bold mb-12">Customize your web address</h3>
        <p className="paragraph-sm mb-12">
          (PLACEHOLDER) Boost SEO, Ditch generic URLs, Future-proof your
          presence on the immersive web
        </p>
        <Button
          text="Upload Client"
          label="Upload Client"
          category={ButtonCategoriesE.SECONDARY_SOLID}
          onClick={() => {
            router.push({
              pathname: '/hubs/[hub_id]',
              query: { hub_id: hub.hubId },
            });
          }}
        />
      </Card>
    </section>
  );
};
