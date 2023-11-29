import React from "react";
import ReactStars from "react-rating-stars-component";
import defaultClass from './productFullDetail.css';

const ReviewItems = (props) => {

    let reviewRating = null;
    const rating=(props.items.average_rating)/20;
    if (props.items.average_rating > 0) {
        reviewRating = <div className={defaultClass['rating-stars-goober']}>
           {/*<span  className={defaultClass['rating-text']}> Rating </span>*/}
           <div className={defaultClass['react-stars-wrapper']}>
               <ReactStars
                   count={5}
                   value={rating}
                   size={20}
                   activeColor="#ffd700"
                   edit={false}
               />
           </div>
        </div>
    }
    const converterDate = (dateStr) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        dateStr = dateStr.replace(/-/g, '/');
        const fullDate = new Date(dateStr);
        return months[fullDate.getMonth()] + ' ' + fullDate.getDate() + ', ' + fullDate.getFullYear();
    }
    const created_at=converterDate(props.items.created_at);

    return (

        <div className={defaultClass['goober_comment']}>

            <li className="comment-container">
                <div className="comment-box">
                    <div className="ratings-container">
                        <div className="product-ratings">
                            {reviewRating}
                        </div>
                    </div>

                    <div className="comment-info mb-1">
                        <h4 className="avatar-name"> {props.items.nickname} </h4> - <span className="comment-date">{created_at}</span>
                    </div>

                    <div className="comment-text">
                        {/* <strong>{props.items.summary}</strong> */}
                        <p>
                            {props.items.text}
                        </p>
                    </div>
                </div>
            </li>


            {/* <strong>{props.items.summary}</strong>
            {reviewRating}
            <div  className={defaultClass['detail']}>
                <p>{props.items.text}</p>
                <p>Review by {props.items.nickname} &nbsp; {props.items.created_at}</p>
                <hr/>
            </div> */}

        </div>
    )
}

export default ReviewItems;
