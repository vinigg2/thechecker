import css from './Home.scss';
import components from '../../styles/global.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Images } from '../../utils/Images';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
library.add(faFacebook, faInstagram, faTwitter);

import {
    Media,
    Container,
    Row,
    Col,
    Carousel,
    CarouselItem,
    CarouselControl
} from 'reactstrap';

class Home extends Component {
    constructor(props) {
        super(props);

        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);


        this.state = {
            activeIndex: 0,
            socials: [
                {
                    label: faFacebook,
                    link: '#'
                },
                {
                    label: faInstagram,
                    link: '#'
                },
                {
                    label: faTwitter,
                    link: '#'
                }
            ],
            menu: [
                {
                    label: 'Home',
                    link: '#'
                },
                {
                    label: 'Features',
                    link: '#'
                },
                {
                    label: 'Screenshots',
                    link: '#'
                },
                {
                    label: 'Login',
                    link: '#'
                }
            ],
            features: [
                {
                    title: 'Usability',
                    text: 'Sometimes the simplest things are the hardest to find. So we created a new line for everyday life',
                    icon: Images.ICON_DIAMOND
                },
                {
                    title: 'Parallax Effect',
                    text: 'Sometimes the simplest things are the hardest to find. So we created a new line for everyday life',
                    icon: Images.ICON_PARALLAX
                },
                {
                    title: 'Unlimites Colors',
                    text: 'Sometimes the simplest things are the hardest to find. So we created a new line for everyday life',
                    icon: Images.ICON_DROP
                },
            ],

            screenshots: [
                {
                    phone: Images.PHONE1,
                    content: {
                        icon: Images.ICON_RAIN_SUN,
                        title: 'When the clouds',
                        text: `Variable information on the air humidity, the feeling of the weather, and the ability to share this with your friends`,
                        statistics: {
                            porcent: '95%',
                            graus: '9º',
                            type: 'Rainy'
                        }
                    }
                },
                {
                    phone: Images.PHONE2,
                    content: {
                        icon: Images.ICON_SUN,
                        title: 'When the sun',
                        text: 'Sometimes the simplest things are the hardest to find. So we created a new line for everyday life. Sometimes the simplest.',
                        statistics: {
                            porcent: '95%',
                            graus: '9º',
                            type: 'Rainy'
                        }
                    }
                },
                {
                    phone: Images.PHONE3,
                    content: {
                        icon: Images.ICON_RAIN,
                        title: 'When the rain',
                        text: 'Sometimes the simplest things are the hardest to find. So we created a new line for everyday life. Sometimes the simplest.',
                        statistics: {
                            porcent: '95%',
                            graus: '9º',
                            type: 'Rainy'
                        }
                    }
                }
            ],
            saying: [
                {
                    text: 'What art offers is space - a certain breathing room for the spirit.',
                    author: 'John Updike'
                },
                {
                    text: 'What art offers is space - a certain breathing room for the spirit.',
                    author: 'John Updike'
                },
                {
                    text: 'What art offers is space - a certain breathing room for the spirit.',
                    author: 'John Updike'
                },
                {
                    text: 'What art offers is space - a certain breathing room for the spirit.',
                    author: 'John Updike'
                }
            ],
            widgets: [
                {
                    src: Images.WIDGETS,
                },
                {
                    src: Images.WIDGETS,
                },
                {
                    src: Images.WIDGETS
                }
            ]
        };
    }


    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next(items) {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous(items) {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    _renderFeatures(array) {
        let items = [];

        for (let i = 0; i < array.length; i++) {
            const { title, text, icon } = array[i];
            items.push(
                <Col key={i}>
                    <Media tag="li">
                        <Media left href="#">
                            <Media object src={icon} alt="Generic placeholder image" />
                        </Media>
                        <Media body className={css.mediaBody}>
                            <Media heading className={css.mediaHeading}>
                                {title}
                            </Media>
                            <p className={css.paragraph}>{text}</p>
                        </Media>
                    </Media>
                </Col>
            )
        }

        return items;
    }

    _renderWidgets(array) {
        let slides = [];

        for (let i = 0; i < array.length; i++) {
            const { src } = array[i];
            slides.push(
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={i}
                >
                    <img src={src} />
                </CarouselItem>
            )
        }

        return slides;
    }

    _renderScreenShots(array) {
        let items = [];

        for (let i = 0; i < array.length; i++) {
            const { phone, content } = array[i];

            if (this.isOdd(i) === 1) {
                items.push(
                    <Fade>
                        <Row key={i}>
                            <Col lg={8} md={6} xs={12} className="text-right">
                                <div className={css.icon}>
                                    <img src={content.icon} />
                                </div>
                                <h4>{content.title}</h4>
                                <p className={css.right}>{content.text}</p>
                                <ul className={css.right}>
                                    <li>{content.statistics.porcent}</li>
                                    <li>{content.statistics.graus}</li>
                                    <li>{content.statistics.type}</li>
                                </ul>
                            </Col>
                            <Col lg={4} md={6} xs={12} className="text-center">
                                <img src={phone} className={css.phone} />
                            </Col>
                        </Row>
                    </Fade>
                );
            } else {
                items.push(
                    <Fade>
                        <Row key={i}>
                            <Col lg={4} md={6} xs={12} className="text-center">
                                <img src={phone} className={css.phone} />
                            </Col>
                            <Col lg={8} md={6} xs={12} className="text-left">
                                <div className={css.icon}>
                                    <img src={content.icon} />
                                </div>
                                <h4>{content.title}</h4>
                                <p>{content.text}</p>
                                <ul className={css.list}>
                                    <li>{content.statistics.porcent}</li>
                                    <li>{content.statistics.graus}</li>
                                    <li>{content.statistics.type}</li>
                                </ul>
                            </Col>
                        </Row>
                    </Fade>
                );
            }
        }

        return items;
    }

    _renderSaying(array) {
        let items = [];

        for (let i = 0; i < array.length; i++) {
            const { text, author } = array[i];

            items.push(
                <Col key={i} sm={6} xs={12}>
                    <Fade>
                        <div className={css.blockSaying}>
                            <div className={css.quotation}>“</div>
                            <p>{text}</p>
                            <div className={css.author}>{author}</div>
                            <div className={`${css.quotation} ${css.last} text-left`}>“</div>
                        </div>
                    </Fade>
                </Col>
            )
        }

        return items;
    }


    isOdd(num) {
        return num % 2;
    }

    render() {

        const { widgets, features, activeIndex, screenshots, saying, menu, socials } = this.state;

        return (
            <div id="home">
                <Header menu={menu} socials={socials} />

                <div id={css.bodyMain}>
                    <div id="features" className={components.sections}>
                        <header className="text-center">
                            <h2>Perfect Features</h2>
                            <h5>Only necessary</h5>
                        </header>
                        <section className={css.listGroup}>
                            <Container>
                                <Fade bottom>
                                    <Row>
                                        {this._renderFeatures(features)}
                                    </Row>
                                </Fade>
                            </Container>
                        </section>
                    </div>


                    <div id="widgets" className={components.sections}>
                        <header className="text-center">
                            <h2>Simples Widgets</h2>
                            <h5>Drag and drop</h5>
                        </header>
                        <Fade>
                            <Container>
                                <Carousel
                                    activeIndex={activeIndex}
                                    next={this.next}
                                    previous={this.previous}
                                    className="text-center"
                                >
                                    {this._renderWidgets(widgets)}
                                    <CarouselControl className={[css.customControlLeft, css.customControl]} direction="prev" directionText="Previous" onClickHandler={() => this.previous(widgets)} />
                                    <CarouselControl className={[css.customControlRight, css.customControl]} direction="next" directionText="Next" onClickHandler={() => this.next(widgets)} />
                                </Carousel>
                            </Container>
                        </Fade>
                    </div>


                    <div id={css.screenShoots} className={components.sections}>
                        <header className="text-center">
                            <h2>Screenshoots</h2>
                            <h5>The brightest images</h5>
                        </header>
                        <Container>
                            {this._renderScreenShots(screenshots)}
                        </Container>
                    </div>


                    <div id={css.saying} className={components.sections}>
                        <header className="text-center">
                            <h2>What people are saying</h2>
                            <h5>Reviews</h5>
                        </header>
                        <Container>
                            <Row>
                                {this._renderSaying(saying)}
                            </Row>
                        </Container>
                    </div>
                </div>

                <Footer menu={menu} socials={socials} />
            </div>
        );
    }
};

export default Home;

Home.propTypes = {};