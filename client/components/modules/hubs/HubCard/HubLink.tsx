import { CopyButton } from '@mozilla/lilypad-ui';
import ExternalLink from '@Shared/ExternalLink/ExternalLink';

type HubLinkPropsT = {
  url: string;
  classProp?: string;
};

const HubLink = ({ url, classProp = '' }: HubLinkPropsT) => {
  return (
    <div className={`flex ${classProp}`}>
      <ExternalLink target="_blank" href={url} classProp="mr-20">
        {url}
      </ExternalLink>

      <CopyButton value={url} />
    </div>
  );
};

export default HubLink;
