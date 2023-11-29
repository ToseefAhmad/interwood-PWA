import React, { Component } from 'react';
import { shape, string } from 'prop-types';
import defaultClasses from './rewardsPage.css';
import classify from '../../classify';

export class Rewards extends Component {
    static propTypes = {
        classes: shape({
            root: string,
            authorizeDealer: string
        })
    };
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <section className="reward">
                    <div className="main-container">
                        <div className="main-title">
                            Rewards
                        </div>
                        <div className="sub-title">
                            Furniture shopping has never been so rewarding!
                        </div>
                        <p className="para-style"> 
                            Become an Interwood rewards member and earn rewards every time you shop that you can redeem for FREE furniture!
                        </p>
                        <p className="para-style">
                            The more you shop, the more you earn, the more you get for FREE!
                        </p>
                        <div className="sub-title inner-title">
                            How it works:
                        </div>
                        <strong>Register</strong>
                        <p className="para-style">
                            Spend Rs.25,000/- or more &amp; become an Interwood Rewards member for life!
                        </p>
                        <strong>Shop</strong>
                        <p className="para-style">
                            Shop at our showroom to earn rewards.
                        </p>
                        <strong>Redeem</strong>
                        <p className="para-style">
                            Redeem your rewards at any time for unlimited free furniture<br/> Whether you spend little or a lot, Interwood rewards ensure you get maximum value every time you shop.
                        </p>
                        <table className="rewards-table">
                            <tr>
                                <th>Tier</th>
                                <th>Spend From</th>
                                <th>Spend To</th>
                                <th>Rewards</th>
                                <th>Promotional Rewards</th>
                            </tr>
                            <tr className="backgray">
                                <td>Silver</td>
                                <td>25,000</td>
                                <td>500,000</td>
                                <td>5%</td>
                                <td>2.5%</td>
                            </tr>
                            <tr>
                                <td>Gold</td>
                                <td>500,000</td>
                                <td>2,000,000</td>
                                <td>7.5%</td>
                                <td>5%</td>
                            </tr>
                            <tr className="backgray">
                                <td>Platinum</td>
                                <td>2,000,000</td>
                                <td>Unlimited</td>
                                <td>10%</td>
                                <td>7.5%</td>
                            </tr>
                        </table>
                        <p className="para-style">
                            Plus, enjoy more exclusive perks that make shopping with us even more rewarding
                        </p>
                        <ul className="ul-dot">
                            <li className="li-style">
                                Double rewards on Birthdays.
                            </li>
                            <li className="li-style">
                                Bonus reward days.
                            </li>
                            <li className="li-style">
                                VIP access to In-store Sales.
                            </li>
                            <li className="li-style">
                                First access to exclusive product launches.
                            </li>
                            <li className="li-style">
                                Invitation to exclusive In-store events.
                            </li>
                        </ul>
                        <div className="sub-title">
                            Terms &amp; Conditions
                        </div>
                        <ul className="ul-dot">
                            <li className="li-style">
                                To qualify for the program, the customer must spend 25,000/- &amp; more one-time.
                            </li>
                            <li className="li-style">
                                At the time of joining, you‘ll be placed in tier 1 &amp; will be eligible for 5% of the reward.
                            </li>
                            <li className="li-style">
                                As you progress through tier by making eligible purchases, rewards applicable to that tier will be applied.
                            </li>
                            <li className="li-style">
                                Customer will be required to provide mobile # &amp; email address at the time of enrollment.
                            </li>
                            <li className="li-style">
                                Your Mobile # will be your unique reward ID.
                            </li>
                            <li className="li-style">
                                Rewards earned will be credited into the member’s account after 100% payment is made.
                            </li>
                            <li className="li-style">
                                Corporate clients are not eligible for the program.
                            </li>
                            <li className="li-style">
                                Rewards cannot be redeemed in conjunction with any other offer/Sale..
                            </li>
                            <li className="li-style">
                                Rewards are applicable on In-store purchases only.
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        );
    }
}

export default classify(defaultClasses)(Rewards);
