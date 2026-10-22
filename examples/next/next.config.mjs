/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.DOCS_BASE_PATH || '',
};
export default config;
