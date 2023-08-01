import type { NextApiRequest, NextApiResponse } from 'next';
import { AcceptedRegionCodeT, ACCEPTED_REGION_CODES } from 'types/Countries';
import { PLAN_ID_MAP } from './plan.cont';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Default United States
  let regionCode: AcceptedRegionCodeT = 'US';

  if (!('region' in req.query) || req.query.region === '') {
    res.status(404).json({ error: 'Region query param not found.' });
  }
  if (
    !ACCEPTED_REGION_CODES.includes(req.query.region as AcceptedRegionCodeT)
  ) {
    res.status(404).json({ error: 'Region not found' });
  }

  regionCode = req.query.region as AcceptedRegionCodeT;
  res.status(200).json(PLAN_ID_MAP[regionCode]);
}
