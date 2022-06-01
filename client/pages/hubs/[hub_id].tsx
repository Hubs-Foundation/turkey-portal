import { useCallback, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import PageHeading from '../../components/shared/PageHeading/PageHeading'
import Form from '../../components/shared/Form/Form'
import Input from '../../components/shared/Input/Input'
import HubOptionGroup from '../../components/shared/HubOptionGroup/HubOptionGroup'
import styles from './[hub_id].module.scss'
import Badge from '../../components/shared/Badge/Badge'
import type { GetServerSidePropsContext } from 'next'
import { AccountT, HubT } from '../../types/General'
import { HubGroupOptionT } from '../../components/shared/HubOptionGroup/HubOptionGroup'// just used for mock data for now.
import { getHub, updateHub } from '../../services/hub.service'
import { requireAuthentication } from '../../services/routeGuard.service'
import { HUB_ROOT_DOMAIN } from 'config'

type HubDetailsViewPropsT = {}

const HubDetailsView = ({ }: HubDetailsViewPropsT) => {
  const router = useRouter()
  const [addressPreview, setAddressPreview] = useState('mockurl')
  const [hub, setHub] = useState<HubT>()
  const [loading, setLoading] = useState(true)
  const [initialFormValues, setInitialFormValues] = useState({
    name: '',
    address: '',
    tier: '',
  })

  /**
   * Get Hub By ID
   */
  useEffect(() => {
    const { hub_id } = router.query
    getHub(`${hub_id}`).then((hub) => {
      setLoading(false)
      setHub(hub)
      setInitialFormValues({
        name: hub.name,
        address: hub.subdomain,
        tier: hub.tier
      })

    })
  }, [])


  const handleFormSubmit = (data: any) => {
    // TODO : submit form to DB
    const { hub_id } = router.query
    updateHub(`${hub_id}`).then(() => { })
  }

  const handleCancelClick = () => {
    router.push({
      pathname: '/dashboard',
    })
  }

  const handleAddresschange = useCallback((address: string) => {
    setAddressPreview(address)
  }, [],
  )


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
    }
  ]

  return (
    <div className="page_wrapper">
      <Head>
        <title>Hub Details View</title>
        <meta name="description" content="detailed information about a Hub" />
      </Head>

      <PageHeading
        title="Hub Settings"
      />

      {
        !loading && hub != undefined ? (
          <main className='flex-justify-center margin-10'>
            <div className={styles.settings_grid_wrapper}>
              <div className={styles.settings_form_wrapper}>

                <Form
                  initialValues={initialFormValues}
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
                      <div className={styles.address_preview}><b>{addressPreview}</b>.{HUB_ROOT_DOMAIN}</div>
                    </div>
                  </>
                </Form>

              </div>
              <div className={styles.summary_wrapper}>
                <h3 className={styles.summary_title}>Summary</h3>
                <ul className={styles.summary_attributes}>
                  <li>Tier: <Badge name={hub.tier} category={hub.tier === 'free' ? 'primary' : 'secondary'} /></li>
                  <li>People: 25</li> {/* TODO: we need this info still  */}
                  <li>Capacity: {hub.currentStorage}</li>
                </ul>
              </div>
            </div>
          </main>
        ) : <div>TODO :: Put loading skeleton here</div>
      }
    </div>
  )
}

export default HubDetailsView

export const getServerSideProps = requireAuthentication((context: GetServerSidePropsContext, account: AccountT) => {
  // Your normal `getServerSideProps` code here
  return { props: {} }
})