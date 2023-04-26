import axios, { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { HubStoreT } from 'types';

type GetStaticPropsT = {
  params: {
    room_id: string;
  };
};

type RoomT = {
  creator_assignment_token: string;
  embed_token: string;
  hub_id: string;
  status: string;
  url: string;
};

type RoomPropsT = {
  room: RoomT;
};

const Room = ({ room }: RoomPropsT) => {
  const HUBS_STORE = '___hubs_store';

  /**
   * Set Hub Store Local Storage
   * @param data
   */
  const setLocalStorage = (data: HubStoreT) => {
    localStorage.setItem(HUBS_STORE, JSON.stringify(data));
  };

  /**
   * Get local store if there is one and set
   * the new room values.
   */
  useEffect(() => {
    // Get Store Data
    const hubsStoreString = localStorage.getItem(HUBS_STORE);
    const {
      creator_assignment_token: _creator,
      embed_token: _embed,
      url,
    } = room;
    let store: HubStoreT;

    if (!hubsStoreString) {
      store = {
        creatorAssignmentTokens: [_creator],
        embedTokens: [_embed],
      };
    } else {
      store = JSON.parse(hubsStoreString) as HubStoreT;
      const { creatorAssignmentTokens: creator, embedTokens: embed } = store;

      if (!creator.includes(_creator) && _creator !== null) {
        creator.push(_creator);
      }

      if (!embed.includes(_embed) && _embed !== null) {
        embed.push(_embed);
      }
    }

    setLocalStorage(store);

    // Route user immediately to their new room
    window.location.href = url;
  }, []);

  return (
    <div className="page_wrapper">
      {/* Note: user should never see the UI, this is here just incase...  */}
      <h1>Creating your room!</h1>
    </div>
  );
};

export default Room;

export async function getServerSideProps({ params }: GetStaticPropsT) {
  const URL = 'https://hubs.mozilla.com/api/v1/hubs';

  try {
    const getRoomLink = async (id: string) => {
      const data = await axios
        .post(URL, { hub: { name: 'auto-generated', scene_id: id } })
        .then(({ data }: AxiosResponse) => data);

      return data as RoomT;
    };

    const room = await getRoomLink(params.room_id);

    return {
      props: {
        room: room,
        error: room.status !== 'ok' ? room.status : '',
      },
    };
  } catch (error) {
    return {
      props: {
        room: '',
        error: 'There was an issue creating your room.',
      },
    };
  }
}
