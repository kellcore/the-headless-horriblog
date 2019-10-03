import React from 'react';
import Layout from '../components/layout';
import Nav from '../components/nav';
import './contact.css';

const ThanksPage = () => (
    <Layout>
        <Nav />
        <div className="contact_header"></div>
        <div className="contact_thanks">
            <h1> Thank you! We'll be in touch soon... </h1>
        </div>
    </Layout>
);

export default ThanksPage;
