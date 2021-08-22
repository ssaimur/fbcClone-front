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
    height={180}
    viewBox='0 0 480 180'
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

export const LoaderAllUsers = (props) => (
  <ContentLoader
    speed={1}
    width={210}
    height={290}
    viewBox='0 0 210 290'
    backgroundColor='#161b22'
    foregroundColor='#13233a'
    {...props}
  >
    <circle cx='31' cy='31' r='18' />
    <rect x='58' y='10' rx='2' ry='2' width='140' height='13' />
    <rect x='58' y='30' rx='2' ry='2' width='90' height='10' />

    <circle cx='31' cy='89' r='18' />
    <rect x='58' y='68' rx='2' ry='2' width='140' height='13' />
    <rect x='58' y='88' rx='2' ry='2' width='90' height='10' />

    <circle cx='31' cy='147' r='18' />
    <rect x='58' y='126' rx='2' ry='2' width='140' height='13' />
    <rect x='58' y='146' rx='2' ry='2' width='90' height='10' />

    <circle cx='31' cy='205' r='18' />
    <rect x='58' y='184' rx='2' ry='2' width='140' height='13' />
    <rect x='58' y='204' rx='2' ry='2' width='90' height='10' />

    <circle cx='31' cy='258' r='18' />
    <rect x='58' y='242' rx='2' ry='2' width='140' height='13' />
    <rect x='58' y='262' rx='2' ry='2' width='90' height='10' />
  </ContentLoader>
);

export const LoaderAllUsersSmall = (props) => (
  <ContentLoader
    speed={1}
    width={210}
    height={150}
    viewBox='0 0 210 150'
    backgroundColor='#161b22'
    foregroundColor='#13233a'
    {...props}
  >
    <circle cx='31' cy='25' r='19' />
    <rect x='58' y='10' rx='2' ry='2' width='140' height='10' />
    <rect x='58' y='27' rx='2' ry='2' width='90' height='7' />

    <circle cx='31' cy='75' r='19' />
    <rect x='58' y='60' rx='2' ry='2' width='140' height='10' />
    <rect x='58' y='77' rx='2' ry='2' width='90' height='7' />

    <circle cx='31' cy='125' r='19' />
    <rect x='58' y='110' rx='2' ry='2' width='140' height='10' />
    <rect x='58' y='127' rx='2' ry='2' width='90' height='7' />
  </ContentLoader>
);

export default Loader;
