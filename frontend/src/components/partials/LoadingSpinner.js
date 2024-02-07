import React from 'react';
// import Loader from 'react-loader-spinner'
import { LineWave } from 'react-loader-spinner';
import '../../../node_modules/react-loader-spinner/dist'

const LoadingSpinner = () => {
  return (
    <LineWave
  height="100"
  width="100"
  color="#4fa94d"
  ariaLabel="line-wave"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  firstLineColor=""
  middleLineColor=""
  lastLineColor=""
/>
  )
}

export default LoadingSpinner