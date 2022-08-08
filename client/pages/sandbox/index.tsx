import Head from 'next/head';
import { useState, useRef } from 'react';
import Input, { InputInterfaceT, InputIconColorE } from '@Shared/Input/Input';
import Button from '@Shared/Button/Button';
import { ButtonCategoriesE, ButtonSizesE } from 'types/Form';
import styles from './sandbox.module.scss';
import { IconT } from 'types/General'


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
  const [testInput, setTestInput] = useState('');
  const passwordInput = useRef<InputInterfaceT>(null);



  const [testInputIcon, setTestInputIcon] = useState<IconT>('check-circle');
  const [testInputIconStatus, setTestInputIconStatus] = useState<InputIconColorE>(InputIconColorE.SUCCESS);

  const toggleInput = () => {
    if(testInputIconStatus === InputIconColorE.SUCCESS){
      // setTestInputIcon("trash")
      // setTestInputIconStatus(InputIconColorE.ERROR)
      setTestInputIconStatus(InputIconColorE.DEFAULT)
      setTestInputIcon("user")

    } else {
      setTestInputIcon("check-circle")
      setTestInputIconStatus(InputIconColorE.SUCCESS)
    }
  }

  const testing = () => {
    console.log('dirty:', passwordInput.current?.isDirty());
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
              icon="arrow-down"
              size={ButtonSizesE.SMALL}
            />

            <Button
              category={ButtonCategoriesE.PRIMARY_SOLID}
              icon="arrow-left"
              size={ButtonSizesE.MEDIUM}
            />

            <Button
              category={ButtonCategoriesE.PRIMARY_SOLID}
              icon="arrow-left"
              size={ButtonSizesE.LARGE}
            />

            <Button
              category={ButtonCategoriesE.PRIMARY_OUTLINE}
              icon="arrow-left"
              size={ButtonSizesE.SMALL}
            />

            <Button
              category={ButtonCategoriesE.PRIMARY_OUTLINE}
              icon="arrow-left"
              size={ButtonSizesE.MEDIUM}
            />

            <Button
              category={ButtonCategoriesE.PRIMARY_OUTLINE}
              icon="arrow-left"
              size={ButtonSizesE.LARGE}
            />

            <Button
              category={ButtonCategoriesE.PRIMARY_SOLID}
              text={ButtonCategoriesE.PRIMARY_SOLID}
              active={true}
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
              active={true}
            />
            <div className="margin-10"></div>

            <Button
              category={ButtonCategoriesE.PRIMARY_OUTLINE}
              text={ButtonCategoriesE.PRIMARY_OUTLINE}
              size={ButtonSizesE.SMALL}
            />

            <Input
              label="Name"
              name="nick"
              value={testInput}
              placeholder="Put your name here"
              onChange={(value: any) => {
                setTestInput(value);
              }}
              icon={testInputIcon}
              iconColor={testInputIconStatus}
            />

            <Button
              category={ButtonCategoriesE.PRIMARY_OUTLINE}
              text="change input"
              onClick={toggleInput}
            />

            {/* 
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
        </section>
      </main>
    </div>
  );
}
