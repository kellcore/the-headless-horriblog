import React from 'react';
import Layout from '../components/layout';
import Nav from '../components/nav';
import SEO from '../components/seo';
import './contact.css';

const ContactPage = () => (
    <Layout>
        <SEO title="Contact" description="Contact us" />
        <Nav />
        <div className="contact_header"></div>
        <div className="contact_section">
            <div className="contact_form">
                <h1>
                    Contact
                </h1>
                <div className="inner">
                    <form method="post" name="contact" action="/thanks"
                        // action sends someone somewhere after completing your form - success page!
                        data-netlify="true" netlify-honeypot="bot">
                        {/* honeypot is a field only visible to bots that marks the request as spam if filled out */}
                        <input type="hidden" name="form-name" value="contact" />
                        {/* this allows you to submit the form without JS */}
                        <div className="field_hidden">
                            <label>
                                Don't fill this out, human!
                            </label>
                            <input name="bot" />
                        </div>
                        {/* this div is our honeypot! */}
                        <div className="field">
                            <label> Name </label>
                            <input type="text" name="name" />
                        </div>
                        <div className="field">
                            <label> Email </label>
                            <input type="text" name="email" />
                        </div>
                        <div className="field">
                            <label> Message </label>
                            <textarea name="message" rows="6">
                            </textarea>
                        </div>
                        <div className="submit">
                            <button type="submit" className="btn_med"> Send </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </Layout>
)

export default ContactPage;