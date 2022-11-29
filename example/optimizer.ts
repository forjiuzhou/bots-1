import { ArrayToKLine, Random, SpotSimpleTest } from 'litebot';
import { MAKD, Params } from '../makd';

const data = require('../data/ETH_USDT-30m.json');

function main() {
  const kline = ArrayToKLine(data);
  const random = new Random<Params>();
  random.Search({
    domain: {
      fast_period: [2, 100],
      slow_period: [2, 100],
      k_period: [2, 100],
      d_period: [2, 100],
    },
    target: (params) => {
      const executor = new SpotSimpleTest();
      const bot = new MAKD(executor, params);
      bot.BackTestingBatch(kline);
      return executor.ROI(kline[kline.length - 1].close);
    },
  });
}

main()
