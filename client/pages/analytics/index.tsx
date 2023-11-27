import Head from 'next/head';
import styles from './analytics.module.scss';
import Card from '@Shared/Card/Card';
import { getAnalytics, HubStat } from 'services/analytics.service';
import { Button, Input, Pill } from '@mozilla/lilypad-ui';
import { useState, ChangeEvent } from 'react';

type SandboxPropsT = {
  analytics: {};
};

/**
 * This modal is used to sandbox code. feel free to play, this will
 * not show up on prod
 */
const Sandbox = ({ analytics }: SandboxPropsT) => {
  const getFormattedDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const date = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${date}`;
  };

  const [firstStartDate, setFirstStartDate] = useState(getFormattedDate());
  const [firstEndDate, setFirstEndDate] = useState(getFormattedDate());

  const [secondStartDate, setSecondStartDate] = useState(getFormattedDate());
  const [secondEndDate, setSecondEndDate] = useState(getFormattedDate());

  type TierStatsT = {
    p0: number[];
    p1: number[];
    b0: number[];
  };

  const initTiers = {
    p0: [],
    p1: [],
    b0: [],
  };

  const [tiers, setTiers] = useState<TierStatsT>(initTiers);

  const [compareTiers, setCompareTiers] = useState<TierStatsT>(initTiers);

  const [analyzedData, setAnalyzedData] = useState({
    p0: {
      persistent: 0,
      dropped: 0,
      gained: 0,
    },
    p1: {
      persistent: 0,
      dropped: 0,
      gained: 0,
    },
    b0: {
      persistent: 0,
      dropped: 0,
      gained: 0,
    },
  });

  const filterHubs = (hubs: HubStat[]): TierStatsT => {
    const data: TierStatsT = {
      p0: [],
      p1: [],
      b0: [],
    };

    hubs.forEach((hub) => {
      data[hub.tier].push(hub.hub_id);
    });

    return data;
  };

  const analyzeData = (hubs: TierStatsT, compareHubs: TierStatsT) => {
    const hubsP0Set = new Set(hubs.p0);
    const hubsP1Set = new Set(hubs.p1);
    const hubsB0Set = new Set(hubs.b0);

    const compareHubsP0Set = new Set(compareHubs.p0);
    const compareHubsP1Set = new Set(compareHubs.p1);
    const compareHubsB0Set = new Set(compareHubs.b0);

    const p0Persistant = hubs.p0.filter((id) => compareHubsP0Set.has(id));
    const p0Gained = compareHubs.p0.filter((id) => !hubsP0Set.has(id));

    const p1Persistant = hubs.p1.filter((id) => compareHubsP1Set.has(id));
    const p1Gained = compareHubs.p1.filter((id) => !hubsP1Set.has(id));

    const b0Persistant = hubs.b0.filter((id) => compareHubsB0Set.has(id));
    const b0Gained = compareHubs.b0.filter((id) => !hubsB0Set.has(id));

    const data = {
      p0: {
        persistent: p0Persistant.length,
        dropped: hubs.p0.length - p0Persistant.length,
        gained: p0Gained.length,
      },
      p1: {
        persistent: p1Persistant.length,
        dropped: hubs.p1.length - p1Persistant.length,
        gained: p1Gained.length,
      },
      b0: {
        persistent: b0Persistant.length,
        dropped: hubs.b0.length - b0Persistant.length,
        gained: b0Gained.length,
      },
    };

    setAnalyzedData(data);
  };

  const onCompare = async () => {
    try {
      const hubs = await getAnalytics(firstStartDate, firstEndDate);
      const compareHubs = await getAnalytics(secondStartDate, secondEndDate);
      const filteredHub = filterHubs(hubs);
      const compareFilteredHub = filterHubs(compareHubs);

      analyzeData(filteredHub, compareFilteredHub);
      setTiers(filteredHub);
      setCompareTiers(compareFilteredHub);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page_wrapper">
      <Head>
        <title>Sandbox</title>
      </Head>
      <main>
        <div className="p-80 ">
          <Card size="large">
            <h1 className="mb-20">Analytics</h1>

            <section>
              <p className="mb-20">
                Selected a start and end date to see how many active hubs.
              </p>
              <div className="flex gap-12 mb-12">
                <Input
                  type="date"
                  value={firstStartDate}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFirstStartDate(e.target.value)
                  }
                  label="Start Date"
                  placeholder="date"
                  name="start_date"
                />

                <Input
                  type="date"
                  value={firstEndDate}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFirstEndDate(e.target.value)
                  }
                  label="End Date"
                  placeholder="date"
                  name="end_date"
                />
              </div>
            </section>

            <section>
              <p className="mb-20">
                Selected a start and end date to compare to previously selected
                point in time.
              </p>
              <div className="flex gap-12 mb-12">
                <Input
                  type="date"
                  value={secondStartDate}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSecondStartDate(e.target.value)
                  }
                  label="Start Date"
                  placeholder="date"
                  name="start_date"
                />

                <Input
                  type="date"
                  value={secondEndDate}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSecondEndDate(e.target.value)
                  }
                  label="End Date"
                  placeholder="date"
                  name="end_date"
                />
              </div>
              <div className="flex-justify-end">
                <Button
                  text="compare"
                  onClick={() => {
                    onCompare();
                  }}
                />
              </div>
            </section>

            <hr className="my-20" />
            <section>
              <h3 className="mb-12">Active Hubs</h3>
              <div className="mb-20">
                <p className="mb-20">
                  From: <b>{firstStartDate}</b> to <b>{firstEndDate}</b>
                </p>
                <div className="flex">
                  <Pill
                    classProp="mr-12"
                    title={`P0: ${tiers.p0.length}`}
                    category="cool"
                  />
                  <Pill
                    classProp="mr-12"
                    title={`P1: ${tiers.p1.length}`}
                    category="cool"
                  />
                  <Pill
                    classProp="mr-12"
                    title={`B0: ${tiers.b0.length}`}
                    category="cool"
                  />
                </div>
              </div>
              <div className="mb-40">
                <p className="mb-20">
                  From: <b>{secondStartDate}</b> to <b>{secondEndDate}</b>
                </p>
                <div className="flex">
                  <Pill
                    classProp="mr-12"
                    title={`P0: ${compareTiers.p0.length}`}
                    category="cool"
                  />
                  <Pill
                    classProp="mr-12"
                    title={`P1: ${compareTiers.p1.length}`}
                    category="cool"
                  />
                  <Pill
                    classProp="mr-12"
                    title={`B0: ${compareTiers.b0.length}`}
                    category="cool"
                  />
                </div>
              </div>
              <h3 className="mb-12">Hub Behaviour</h3>
              <p className="paragraph mb-24">
                The follow data comes form the HubStat table and the Hubs table.
                If a hub is active it is logged to the HubStat table. This query
                leverages the HubStat table to see what hubs are active on
                specific dates. <b>Persistent</b> is how many hubs remained in
                the two date ranges, <b>Dropped</b> is how many hub id&apos;s
                where in the first date range but not in the second.
                <b> Gained</b> are active Hubs in the second date range but not
                in the first.
              </p>

              <table className={styles.data_table}>
                <thead>
                  <tr>
                    <th>Tier</th>
                    <th>Persistent</th>
                    <th>Dropped</th>
                    <th>Gained</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Pill title="P0" category="rainbow" />
                    </td>
                    <td>{analyzedData.p0.persistent}</td>
                    <td>{analyzedData.p0.dropped}</td>
                    <td>{analyzedData.p0.gained}</td>
                  </tr>
                  <tr>
                    <td>
                      <Pill title="P1" category="rainbow" />
                    </td>
                    <td>{analyzedData.p1.persistent}</td>
                    <td>{analyzedData.p1.dropped}</td>
                    <td>{analyzedData.p1.gained}</td>
                  </tr>
                  <tr>
                    <td>
                      <Pill title="B0" category="rainbow" />
                    </td>
                    <td>{analyzedData.b0.persistent}</td>
                    <td>{analyzedData.b0.dropped}</td>
                    <td>{analyzedData.b0.gained}</td>
                  </tr>
                </tbody>
              </table>
            </section>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Sandbox;

export async function getStaticProps() {
  if (process.env.ENV === 'prod') {
    return { notFound: true };
  }

  return {
    props: {},
  };
}
