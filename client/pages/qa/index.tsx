import Head from 'next/head';
import Card from '@Shared/Card/Card';
import { Button, Input } from '@mozilla/lilypad-ui';
import { doCallOrWhatever } from 'services/qa.service';

type QaPropsT = {};

const Page = ({}: QaPropsT) => {
  const submit = async () => {
    try {
      const resp = await doCallOrWhatever();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="page_wrapper">
      <Head>
        <title>QA Pannel</title>
      </Head>
      <main className="p-80">
        <h1 className="mb-20">QA Pannel</h1>
        <Card>
          <form onSubmit={submit}>
            <h2>Some Form Here</h2>
            <Input
              name="example"
              label="example"
              placeholder="example"
              value="example"
            />
            <Button text="Submit" label="submit" />
          </form>
        </Card>
      </main>
    </div>
  );
};

export default Page;

export async function getStaticProps() {
  if (process.env.ENABLE_QA_ROUTE !== 'true') {
    return { notFound: true };
  }

  return {
    props: {},
  };
}
