import Head from 'next/head';
import styles from './analytics.module.scss';
import Card from '@Shared/Card/Card';
import { getAnalytics, HubStat } from 'services/analytics.service';
import { Button, Input, Pill } from '@mozilla/lilypad-ui';
import { useState, ChangeEvent } from 'react';
import { analyticsRG } from 'services/routeGuard.service';
import type { GetServerSidePropsContext } from 'next';

type SandboxPropsT = {
  analytics: {};
};

type TierStatsT = {
  p0: string[];
  p1: string[];
  b0: string[];
};

type TierStatsDisplayT = {
  p0: number;
  p1: number;
  b0: number;
};

const initTiers = {
  p0: 0,
  p1: 0,
  b0: 0,
};

const Analytics = ({ analytics }: SandboxPropsT) => {
  // Fromat Date Util
  const getFormattedDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const date = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${date}`;
  };

  const [showReadout, setShowReadout] = useState(false);

  // Form Date Data
  const [firstStartDate, setFirstStartDate] = useState(getFormattedDate());
  const [firstEndDate, setFirstEndDate] = useState(getFormattedDate());
  const [secondStartDate, setSecondStartDate] = useState(getFormattedDate());
  const [secondEndDate, setSecondEndDate] = useState(getFormattedDate());

  // Hubs Compare Data
  const [tiers, setTiers] = useState<TierStatsDisplayT>(initTiers);
  const [compareTiers, setCompareTiers] =
    useState<TierStatsDisplayT>(initTiers);
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
      data[hub.tier].push(String(hub.hubId));
    });

    console.log('data', data);

    return data;
  };

  type SetsT = {
    compareHubsP0Set: Set<string>;
    compareHubsP1Set: Set<string>;
    compareHubsB0Set: Set<string>;
    hubsP0Set: Set<string>;
    hubsP1Set: Set<string>;
    hubsB0Set: Set<string>;
  };

  const analyzeData = ({
    compareHubsP0Set,
    compareHubsP1Set,
    compareHubsB0Set,
    hubsP0Set,
    hubsP1Set,
    hubsB0Set,
  }: SetsT) => {
    const p0Persistant = Array.from(hubsP0Set).filter((id) =>
      compareHubsP0Set.has(id)
    );

    const p0Gained = Array.from(compareHubsP0Set).filter(
      (id) => !hubsP0Set.has(id)
    );

    const p1Persistant = Array.from(hubsP1Set).filter((id) =>
      compareHubsP1Set.has(id)
    );
    const p1Gained = Array.from(compareHubsP1Set).filter(
      (id) => !hubsP1Set.has(id)
    );

    const b0Persistant = Array.from(hubsB0Set).filter((id) =>
      compareHubsB0Set.has(id)
    );
    const b0Gained = Array.from(compareHubsB0Set).filter(
      (id) => !hubsB0Set.has(id)
    );

    const data = {
      p0: {
        persistent: p0Persistant.length,
        dropped: hubsP0Set.size - p0Persistant.length,
        gained: p0Gained.length,
      },
      p1: {
        persistent: p1Persistant.length,
        dropped: hubsP1Set.size - p1Persistant.length,
        gained: p1Gained.length,
      },
      b0: {
        persistent: b0Persistant.length,
        dropped: hubsB0Set.size - b0Persistant.length,
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

      const data = {
        hubsP0Set: new Set(filteredHub.p0),
        hubsP1Set: new Set(filteredHub.p1),
        hubsB0Set: new Set(filteredHub.b0),
        compareHubsP0Set: new Set(compareFilteredHub.p0),
        compareHubsP1Set: new Set(compareFilteredHub.p1),
        compareHubsB0Set: new Set(compareFilteredHub.b0),
      };

      console.log('data', data);

      analyzeData(data);

      setTiers({
        p0: data.hubsP0Set.size,
        p1: data.hubsP1Set.size,
        b0: data.hubsB0Set.size,
      });
      setCompareTiers({
        p0: data.compareHubsP0Set.size,
        p1: data.compareHubsP1Set.size,
        b0: data.compareHubsB0Set.size,
      });
      setShowReadout(true);
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

            {showReadout && (
              <>
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
                        title={`P0: ${tiers.p0}`}
                        category="cool"
                      />
                      <Pill
                        classProp="mr-12"
                        title={`P1: ${tiers.p1}`}
                        category="cool"
                      />
                      <Pill
                        classProp="mr-12"
                        title={`B0: ${tiers.b0}`}
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
                        title={`P0: ${compareTiers.p0}`}
                        category="cool"
                      />
                      <Pill
                        classProp="mr-12"
                        title={`P1: ${compareTiers.p1}`}
                        category="cool"
                      />
                      <Pill
                        classProp="mr-12"
                        title={`B0: ${compareTiers.b0}`}
                        category="cool"
                      />
                    </div>
                  </div>
                  <h3 className="mb-12">Hub Behaviour</h3>
                  <p className="paragraph mb-24">
                    The follow data comes form the HubStat table and the Hubs
                    table. If a hub is active it is logged to the HubStat table.
                    This query leverages the HubStat table to see what hubs are
                    active on specific dates. <b>Persistent</b> is how many hubs
                    remained in the two date ranges, <b>Dropped</b> is how many
                    hub id&apos;s where in the first date range but not in the
                    second.
                    <b> Gained</b> are active Hubs in the second date range but
                    not in the first.
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
              </>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Analytics;

export const getServerSideProps = analyticsRG(
  (context: GetServerSidePropsContext) => {
    // Your normal `getServerSideProps` code here
    return {
      props: {},
    };
  }
);
