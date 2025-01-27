import PropTypes from 'prop-types';

function CategoryHeading({ title }) {
  return <h2>{title}</h2>;
}

CategoryHeading.propTypes = {
  category: PropTypes.string.isRequired,
};

export default CategoryHeading;