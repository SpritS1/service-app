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
                <ContactForm />
            </main>
        </div>
    );
};

export default ContactPage;
