import React from 'react'
import ReactLoading from 'react-loading';

const Loading = ({ spin, blue }) => (
    <ReactLoading type={spin} color={blue} height={667} width={375} />
);
 
export default Loading;