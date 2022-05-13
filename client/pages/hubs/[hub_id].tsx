import { useCallback, useState} from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import PageHeading from '../../components/shared/PageHeading/PageHeading'
import Form from '../../components/shared/Form/Form'
import Input from '../../components/shared/Input/Input'
import HubOptionGroup from '../../components/shared/HubOptionGroup/HubOptionGroup'
import styles from './[hub_id].module.scss'
import { HubGroupOptionT } from '../../types/Form'
import Badge from '../../components/shared/Badge/Badge'

type HubDetailsViewPropsT = {}

const HubDetailsView = ({ }: HubDetailsViewPropsT) => {
  const router = useRouter()
  const [addressPreview, setAddressPreview] = useState('12345')

  const handleFormSubmit = (data: any) => {
    console.log('data', data)
  }

  const handleCancelClick = () => {
    router.push({
      pathname: '/dashboard',
    })
  }

  const handleAddresschange = useCallback((address:string) => {
    console.log('address:',address)
    setAddressPreview(address)
    },[],
  )

  const initialValues = {
    name: '',
    address: addressPreview,
    tier: 'free'
  }

  const radioFormOptions: HubGroupOptionT[] = [
    {
      label: 'Free',
      labelType: 'primary',
      value: 'free',
      size: '250MB',
      users: 5,
      groupName: 'tier',
      id: 'freeOption',
    },
    {
      label: 'MVP 2',
      labelType: 'secondary',
      value: 'mvp',
      size: '2GB',
      users: 25,
      groupName: 'tier',
      id: 'mvpOption',
    }
  ]

  return (
    <div className="page_wrapper">
      <Head>
        <title>Hub Details View</title>
        <meta name="description" content="detailed information about a Hub" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageHeading
        title="Hub Settings"
      />

      <main className='flex-justify-center margin-10'>
        <div className={styles.settings_grid_wrapper}>
          <div className={styles.settings_form_wrapper}>
            <Form
              initialValues={initialValues}
              submit={handleFormSubmit}
              cancelClick={handleCancelClick}>
              <>
                <Input
                  label="Hub Name"
                  name="name"
                />

                <HubOptionGroup
                  name="tier"
                  options={radioFormOptions}
                />

                <div className={styles.address_wrapper}>

                  <Input
                    onChange={handleAddresschange}
                    classProp='margin-bottom-10'
                    label="Web Address (URL)"
                    name="address"
                    info="Supports letters (a to z), digits (0 to 9), and hyphens (-)"
                  />

                  {/* TODO: Replace the hardcoded ".myhubs.net" to an environment variable */}
                  <div className={styles.address_preview}><b>{addressPreview}</b>.myhubs.net</div>

                </div>

              </>
            </Form>

          </div>
          <div className={styles.summary_wrapper}>
            <h3 className={styles.summary_title}>Summary</h3>

            <ul className={styles.summary_attributes}>
              <li>Tier: <Badge name='MVP' type='secondary'/></li>
              <li>People: 25</li>
              <li>Capacity: 2GB</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HubDetailsView
