import PropTypes from 'prop-types';

function NavItem({ category }) {
    return (
        <li>
            <a href="#">{category}</a>
        </li>
    );
}
NavItem.propTypes = {
    category: PropTypes.string.isRequired,
};

export default NavItem;