export default {
  transform: {
    '^.+\\.(ts|tsx)$': 'esbuild-jest',
  },
  testEnvironment: 'miniflare',
}
