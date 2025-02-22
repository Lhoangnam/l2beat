import { LogLevel, UnixTime } from '@l2beat/common'
import { tokenList } from '@l2beat/config'

import { Config } from './Config'
import { getEnv } from './getEnv'

export function getProductionConfig(): Config {
  return {
    name: 'Backend/Production',
    logger: {
      logLevel: LogLevel.INFO,
      format: 'json',
    },
    port: getEnv.integer('PORT'),
    alchemyApiKey: getEnv('ALCHEMY_API_KEY'),
    etherscanApiKey: getEnv('ETHERSCAN_API_KEY'),
    databaseUrl: getEnv('DATABASE_URL'),
    core: {
      // TODO: set minimum timestamp from when to fetch prices
      //right now it is the earliest fetched date from previous backend
      minBlockTimestamp: UnixTime.fromDate(new Date('2019-11-14T00:00:00Z')),
      safeBlockRefreshIntervalMs: 5 * 60 * 1000,
      safeBlockBlockOffset: 100n,
    },
    // TODO: import from @l2beat/config
    tokens: tokenList.map((token) => ({
      ...token,
      priceStrategy: { type: 'market' },
    })),
  }
}
