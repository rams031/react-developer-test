// jest.config.ts
import type { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./src/setup-jest.ts'],
  transformIgnorePatterns: [
    "/node_modules/(?!(axios)/)"
  ]
}

export default config