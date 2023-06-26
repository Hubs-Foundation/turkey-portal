import Head from 'next/head';
import { useRef } from 'react';

type SandboxPropsT = {};

/**
 * This modal is used to sandbox code. feel free to play, this will
 * not show up on prod
 */
const Sandbox = ({}: SandboxPropsT) => {
  const diRef = useRef<HTMLDialogElement>(null);
  return (
    <div className="page_wrapper">
      <Head>
        <title>Sandbox</title>
      </Head>
      <main>
        <h1>Sandbox</h1>
        <div className="p-80"></div>
        <dialog ref={diRef}>
          <form method="dialog">
            hi~!!
            <button>close</button>
          </form>
        </dialog>
        <button onClick={() => diRef.current?.showModal()}>show modal</button>
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
