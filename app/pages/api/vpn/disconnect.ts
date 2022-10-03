import {NextApiRequest, NextApiResponse} from 'next';
import {exec} from 'child_process';

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    exec('nordvpn disconnect', error => {
      if (error !== null) {
        res.status(400).json({status: 'error'});
      } else {
        res.status(200).json({status: 'ok'});
      }
    });
  }
};
