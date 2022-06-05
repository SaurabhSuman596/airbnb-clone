import React from 'react';
import { urlFor } from '../sanity';

const Image = ({ identifier, image }) => {
  return (
    <div className={identifier === 'main-image ?main-image :image'}>
      <img src={urlFor(image)} alt="" />
    </div>
  );
};

export default Image;
