/**
 * Created by benben on 17/2/6.
 */
let React = require('react');
let ProductBox;
ProductBox = React.createClass({
    render: function () {
        return (
            <div className="productBox">
                hello react&es2015&webpack!
            </div>
        );
    }
});

module.exports = ProductBox;