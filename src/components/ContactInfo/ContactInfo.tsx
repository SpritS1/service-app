import React from 'react';
import './ContactInfo.scss';

type Props = {};

const ContactInfo = (props: Props) => {
    return (
        <div className="contact-info">
            <h3 className="contact-info__title">Company information</h3>
            <div className="contact-info__item">
                <i className="contact-info__icon fas fa-location-dot" />
                92 4th St. Hollis, NY 11423
            </div>
            <div className="contact-info__item">
                <i className="contact-info__icon fas fa-envelope" />
                servicex@xmail.com
            </div>
            <div className="contact-info__item">
                <i className="contact-info__icon fas fa-phone" />
                617-543-5912
            </div>
        </div>
    );
};

export default ContactInfo;
