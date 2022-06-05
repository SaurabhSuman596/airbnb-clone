import React from 'react';
import { sanityClient } from '../../sanity';
import { isMultiple } from '../../utils';
import Image from '../../components/Image';
import Link from 'next/link';
import Review from '../../components/Review';

const Property = ({ property }) => {
  console.log(property);
  const reviewAmount = property.reviews.length;
  return (
    <div className="container">
      <h1>
        <b>{property.title}</b>
      </h1>
      <p>
        {reviewAmount} review{isMultiple(reviewAmount)}
      </p>
      <div className="images-section">
        <Image identifier="main-image" image={property.mainImage} />
        <div className="sub-images-section">
          {property.images.map(({ _key, asset }, image) => (
            <Image key={_key} identifier="image" image={asset} />
          ))}
        </div>
      </div>

      <div className="section">
        <div className="information">
          <h2>
            <b>
              {property.propertyType} hosted by {property.host?.name}
            </b>
          </h2>
          <h4>
            {property.bedrooms} bedroom{isMultiple(property.bedrooms)} *{' '}
            {property.beds} bed{isMultiple(property.beds)}
          </h4>
          <hr />
          <h4>
            <b>Enhanced Clean</b>
          </h4>
          <p>
            This host is commited to Airbnb's 5-step inhanced cleaning process
          </p>
          <h4>
            <b>Amenities for everyday living</b>
          </h4>
          <p>
            This host had equipped this place for long stays
            -kitchen,conditioner etc
          </p>
          <h4>
            <b>House Rule</b>
          </h4>
          <p>
            this place isn't sutaible for pets and forest animals . it is
            strictly prohibited
          </p>
        </div>

        <div className="price-box">
          <h2>${property.pricePerNight}</h2>
          <h4>
            {reviewAmount} review{isMultiple(property.reviewAmount)}
          </h4>
          <Link href="/">
            <div className="button" onClick={() => {}}>
              Change Dates
            </div>
          </Link>
        </div>
      </div>

      <hr />

      <h4>{property.description}</h4>

      <hr />

      <h2>
        {reviewAmount} review{isMultiple(reviewAmount)}
      </h2>

      {reviewAmount > 0 &&
        property.reviews.map((review) => (
          <Review key={review._key} review={review} />
        ))}
    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;
  const query = `*[_type=="property" && slug.current == $pageSlug][0]{
    title,
    location,
    propertyType,
    mainImage,
    images,
    pricePerNight,
    beds,
    bedrooms,
    description,
    host->{
      _id,
      name,
      slug,
      image
    },
    reviews[]{
      ...,
      traveller->{
        _id,
        name,
        slug,
        image
      }
    }
  }`;
  const property = await sanityClient.fetch(query, { pageSlug });

  if (!property) {
    return {
      props: null,
      notFound: true,
    };
  } else {
    return {
      props: {
        property,
      },
    };
  }
};

export default Property;
