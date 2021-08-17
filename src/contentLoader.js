import React from 'react';
import ContentLoader from 'react-content-loader';

const Loader = (props) => (
  <ContentLoader
    speed={1.2}
    width={480}
    height={460}
    viewBox='0 0 480 460'
    backgroundColor='#161b22'
    foregroundColor='#13233a'
    {...props}
  >
    <circle cx='31' cy='31' r='20' />
    <rect x='58' y='18' rx='2' ry='2' width='140' height='10' />
    <rect x='58' y='34' rx='2' ry='2' width='90' height='7' />
    <rect x='0' y='60' rx='2' ry='2' width='480' height='400' />
  </ContentLoader>
);

export const LoaderHeader = (props) => (
  <ContentLoader
    speed={1}
    width={480}
    height={58}
    viewBox='0 0 480 58'
    backgroundColor='#161b22'
    foregroundColor='#13233a'
    {...props}
  >
    <circle cx='31' cy='31' r='20' />
    <rect x='58' y='18' rx='2' ry='2' width='140' height='10' />
    <rect x='58' y='34' rx='2' ry='2' width='90' height='7' />
    {/* <rect x='0' y='60' rx='2' ry='2' width='500' height='400' /> */}
  </ContentLoader>
);

export const LoaderPeople = (props) => (
  <ContentLoader
    speed={1}
    width={200}
    height={43}
    viewBox='0 0 200 43'
    backgroundColor='#7ca5e2'
    foregroundColor='#a6bee4'
    {...props}
  >
    <circle cx='20' cy='21' r='20' />
    <rect x='45' y='5' rx='2' ry='2' width='140' height='10' />
    <rect x='45' y='21' rx='2' ry='2' width='90' height='7' />
    {/* <rect x='0' y='60' rx='2' ry='2' width='500' height='400' /> */}
  </ContentLoader>
);

export const LoaderProfile = (props) => (
  <ContentLoader
    speed={1.2}
    width={480}
    height={250}
    viewBox='0 0 480 250'
    backgroundColor='#161b22'
    foregroundColor='#13233a'
    {...props}
  >
    <circle cx='55' cy='55' r='50' />
    <rect x='120' y='13' rx='2' ry='2' width='200' height='20' />
    <rect x='120' y='40' rx='2' ry='2' width='150' height='15' />
    <rect x='120' y='65' rx='2' ry='2' width='90' height='30' />
    <rect x='0' y='130' rx='2' ry='2' width='300' height='15' />
    <rect x='0' y='155' rx='2' ry='2' width='300' height='15' />
    <rect x='0' y='180' rx='2' ry='2' width='300' height='15' />
    <rect x='0' y='205' rx='2' ry='2' width='300' height='15' />
    <rect x='0' y='230' rx='2' ry='2' width='300' height='15' />
  </ContentLoader>
);

export default Loader;
