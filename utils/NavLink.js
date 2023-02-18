import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';

export { NavLink };

NavLink.propTypes = {
    href: PropTypes.string.isRequired,
    exact: PropTypes.bool
};

NavLink.defaultProps = {
    exact: false
};

function NavLink({ href, exact, children, activeClassName ,id, ...props }) {
    const { pathname } = useRouter();
    const isActive = exact ? pathname === href : pathname.startsWith(href);


    return (
        <Link href={href} id={id} {...props} className={isActive ? `${activeClassName} px-2` : "px-2"} >

            {children}

        </Link>
    );
}