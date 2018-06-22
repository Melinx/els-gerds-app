import React from 'react'
import './index.css'

function follow() {
    return (
        <section className="section section-follow #ef5350 red lighten-2 white-text center">
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <h4>Follow Us!</h4>
                        <p>Follow us on social media for special events</p>
                        <a href="https://www.facebook.com/elsgerds.menjars" target="_blank" className="white-text">
                            <i className="fab fa-facebook fa-4x" />
                        </a>
                        <a className="white-text">
                            <i className="fab fa-twitter fa-4x" />
                        </a>
                        <a className="white-text">
                            <i className="fab fa-linkedin fa-4x" />
                        </a>
                        <a className="white-text">
                            <i className="fab fa-google-plus fa-4x" />
                        </a>
                        <a className="white-text">
                            <i className="fab fa-pinterest fa-4x" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default follow