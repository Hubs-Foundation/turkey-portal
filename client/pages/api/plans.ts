import type { NextApiRequest, NextApiResponse } from 'next';
import { AcceptedRegionCodeT, ACCEPTED_REGION_CODES } from 'types/Countries';
import { PLAN_ID_MAP } from './plan.cont';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!('region' in req.query) || req.query.region === '') {
    res.status(404).json({ error: 'Region query param not found.' });
  }

  const regionQuery = (
    req.query.region as string
  ).toUpperCase() as AcceptedRegionCodeT;

  if (!ACCEPTED_REGION_CODES.includes(regionQuery)) {
    res.status(404).json({ error: 'Region not found' });
  }

  res.status(200).json(PLAN_ID_MAP[regionQuery]);
}
