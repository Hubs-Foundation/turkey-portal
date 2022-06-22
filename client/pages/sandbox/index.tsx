import Head from 'next/head';
import { useState, useRef } from 'react';
import RadioGroup from '@Shared/RadioGroup/RadioGroup';
import Form from '@Shared/Form/Form';
import Input, { InputInterfaceT } from '@Shared/Input/Input';
import Button from '@Shared/Button/Button';
import { ButtonCategoriesE, ButtonSizesE } from 'types/Form';
import styles from './sandbox.module.scss';

/**
 * NOTE: this page is for testing and showing.. Storybook will mostly take
 * this pages purpose over..Will delete before production code...
 */

export default function Sandbox() {
  const radioFormOptions = [
    {
      label: 'Label 1',
      value: 'label_1',
      groupName: 'test',
      id: 'label_1',
    },
    {
      label: 'Label 2',
      value: 'label_2',
      groupName: 'test',
      id: 'label_2',
    },
  ];

  const [radioForm, setRadioForm] = useState('label_1');
  const passwordInput = useRef<InputInterfaceT>(null);

  const testing = () => {
    console.log('diry:', passwordInput.current?.isDirty());
  };

  const handleFormChange = (event: Event) => {
    const { value }: HTMLInputElement = event.target as HTMLInputElement;
    setRadioForm(value);
  };

  const initialValues = {
    email: 'nick',
    password: '1234',
    test: 'label_1',
    name: '',
  };

  const submit = (form: any) => {
    console.log('form', form);
  };

  return (
    <div className={styles.page}>
      <Head>
        <title>Sandbox Page</title>
        <meta name="description" content="general profle page" />
      </Head>

      <main>
        <h1>Sandbox Welcome</h1>
        <section>
          <div>
            <Button
              category={ButtonCategoriesE.PRIMARY_SOLID}
              text={ButtonCategoriesE.PRIMARY_SOLID}
              size={ButtonSizesE.SMALL}
            />
            <div className="margin-10"></div>

            <Button
              category={ButtonCategoriesE.PRIMARY_SOLID}
              text={ButtonCategoriesE.PRIMARY_SOLID}
              icon="arrow-left"
            />
            <div className="margin-10"></div>
            <Button
              category={ButtonCategoriesE.PRIMARY_SOLID}
              text={ButtonCategoriesE.PRIMARY_SOLID}
              size={ButtonSizesE.LARGE}
              icon="arrow-right"
            />
            <div className="margin-10"></div>

            <Button
              category={ButtonCategoriesE.PRIMARY_OUTLINE}
              text={ButtonCategoriesE.PRIMARY_OUTLINE}
              size={ButtonSizesE.LARGE}
              iconPlacedRight={true}
              icon="arrow-right"
            />
            <div className="margin-10"></div>

            <Button
              category={ButtonCategoriesE.PRIMARY_OUTLINE}
              text={ButtonCategoriesE.PRIMARY_OUTLINE}
              size={ButtonSizesE.SMALL}
            />
            {/* <Button
              category={ButtonCategoriesE.PRIMARY_OUTLINE}
              text={ButtonCategoriesE.PRIMARY_OUTLINE}
            />
            <Button
              category={ButtonCategoriesE.PRIMARY_CLEAR}
              text={ButtonCategoriesE.PRIMARY_CLEAR}
            />

            <Button
              category={ButtonCategoriesE.SECONDARY_SOLID}
              text={ButtonCategoriesE.SECONDARY_SOLID}
            />
            <Button
              category={ButtonCategoriesE.SECONDARY_OUTLINE}
              text={ButtonCategoriesE.SECONDARY_OUTLINE}
            />
            <Button
              category={ButtonCategoriesE.SECONDARY_CLEAR}
              text={ButtonCategoriesE.SECONDARY_CLEAR}
            /> */}

            {/* <Button
              active={true}
              text='Active Button' /> */}

            {/* <Button
              icon='settings'
              text='Icon Button' 
              onClick={testing}/>

            <Button
              disabled={true}
              text='Disabled' /> */}
          </div>

          <h3>Forms</h3>
          {/* <form > 
            <RadioGroup
              onChange={handleFormChange}
              value={radioForm}
              options={radioFormOptions}
            />
          </form> */}

          <h2>form 2</h2>

          <Form submit={submit} initialValues={initialValues}>
            <>
              <Input
                required={true}
                label="Email"
                type="email"
                name="email"
                customErrorMessage="you broke it"
              />
              <Input
                required={true}
                label="Testing"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                name="password"
                info="this is great"
                ref={passwordInput}
              />
              <Input required={true} label="Name" name="name" />
              <RadioGroup name="test" options={radioFormOptions} />
            </>
          </Form>
        </section>
      </main>
    </div>
  );
}
