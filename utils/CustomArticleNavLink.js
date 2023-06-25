import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';

export { CustomArticleNavLink };

CustomArticleNavLink.propTypes = {
    href: PropTypes.string.isRequired,
    exact: PropTypes.bool
};

CustomArticleNavLink.defaultProps = {
    exact: false
};

function CustomArticleNavLink({ href, exact, children, activeClassName ,id, ...props }) {

    const { query } = useRouter();
    const isActive = parseInt(query.slug[0]) === id;

    return (
        <Link href={href} id={id} {...props} className={isActive ? `${activeClassName} px-2` : "px-2"} >
            {children}
        </Link>
    );
}