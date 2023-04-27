import { useEffect } from 'react';
import { HubStoreT, RoomT } from 'types';
import { createRoom } from 'services/room.service';

type GetStaticPropsT = {
  params: {
    room_id: string;
  };
};

type RoomPropsT = {
  room: RoomT;
  error: string;
};

const Room = ({ room, error }: RoomPropsT) => {
  const HUBS_STORE = '___hubs_store';

  /**
   * Get local store if there is one and set
   * the new room values.
   */
  useEffect(() => {
    if (error) return;

    // Get Store Data
    const hubsStoreString = localStorage.getItem(HUBS_STORE);
    const {
      creator_assignment_token: _creator,
      embed_token: _embed,
      url,
    } = room;

    let store: HubStoreT;

    // If no hubs store create new store object
    if (!hubsStoreString) {
      store = {
        creatorAssignmentTokens: [_creator],
        embedTokens: [_embed],
      };
    } else {
      store = JSON.parse(hubsStoreString) as HubStoreT;
      const { creatorAssignmentTokens: creator, embedTokens: embed } = store;

      if (!creator.includes(_creator)) creator.push(_creator);
      if (!embed.includes(_embed)) embed.push(_embed);
    }

    localStorage.setItem(HUBS_STORE, JSON.stringify(store));

    // Route user immediately to their new room
    window.location.href = url;
  }, []);

  return (
    <div className="page_wrapper">
      {/* Note: user should never see the UI, this is here just incase...  */}
      {Boolean(error) ? (
        <div className="p-40">
          <p>
            There was an error creating your room, please return to the home
            page and try again
          </p>
          <a href="/" className="primary-link">
            Return to home page.
          </a>
        </div>
      ) : (
        <h1>Creating your room!</h1>
      )}
    </div>
  );
};

export default Room;

export async function getServerSideProps({ params }: GetStaticPropsT) {
  try {
    const room = await createRoom(params.room_id);

    return {
      props: {
        room: room,
        error: room.status !== 'ok' ? room.status : '',
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        room: '',
        error: 'There was an issue creating your room.',
      },
    };
  }
}
