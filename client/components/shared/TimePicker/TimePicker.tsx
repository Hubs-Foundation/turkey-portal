import { Input, InputT } from '@mozilla/lilypad';
import { useState } from 'react';

type TimePickerPropsT = {};

const TimePicker = ({}: TimePickerPropsT) => {
  const [value, setValue] = useState(0);
  const onChange = (value: any) => {
    console.log('value', value);
    setValue(value);
  };

  return (
    <div>
      <Input
        label="Time"
        placeholder="time"
        type="time"
        name="time"
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default TimePicker;
