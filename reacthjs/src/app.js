/**
 * Created by benben on 17/2/6.
 */
import React from 'react'
require('./style.css')
class MyApp extends React.Component {
    render() {
        return <h1>Wonderful App</h1>
    }
}
React.render(<MyApp />,
    document.body)