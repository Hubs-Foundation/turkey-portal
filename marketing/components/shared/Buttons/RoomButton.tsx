import { Button } from '@mozilla/lilypad-ui';

type RoomButtonPropsT = {
  text: string;
  href: string;
  label: string;
};

const RoomButton = (props: RoomButtonPropsT) => {
  const { href, label, text } = props;

  const isRoomButton = (href: string): boolean => {
    return href.startsWith('hubs://createRoom');
  };

  return isRoomButton(href) ? (
    <Button label={label} text={text} />
  ) : (
    <Button {...props} />
  );
};

export default RoomButton;
