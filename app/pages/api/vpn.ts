import {NextApiRequest, NextApiResponse} from 'next';
import {exec} from 'child_process';

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    exec('nordvpn connect', error => {
      if (error !== null) {
        res.status(400);
      } else {
        res.status(200);
      }
    });
  }
};
