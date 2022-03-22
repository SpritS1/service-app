import ContactForm from 'components/ContactForm/ContactForm';
import ContactInfo from 'components/ContactInfo/ContactInfo';
import HeaderDesktop from 'components/HeaderDesktop/HeaderDesktop';
import React from 'react';
import './ContactPage.scss';

type Props = {};

const ContactPage = (props: Props) => {
    return (
        <div className="contact-page">
            <HeaderDesktop title={'Contact'} />
            <main className="contact-page__main">
                <ContactInfo />
                <iframe
                    title="location-map"
                    className="contact-page__map"
                    id="gmap_canvas"
                    src="https://maps.google.com/maps?q=400-410%20N%20Crest%20Dr%20Los%20Angeles&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    frameBorder="0"
                    scrolling="no"
                ></iframe>
                <ContactForm />
            </main>
        </div>
    );
};

export default ContactPage;
