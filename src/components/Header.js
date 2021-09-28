import React from 'react'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import Button from './Button'

//impt - to import propTypes

// const Header = (props) => {
//     return (
//         <header>
//             <h1> {props.title}</h1>
//         </header>
//     )
// }

const Header = ({title, onAdd, showAdd}) => {
    // const onClick = () => {
    //     console.log('click')
    // }

    const location = useLocation()

    return (
        <header className='header'>
            {/* <h1 style={{headingStyle}}> {title}</h1> */}
            <h1> {title} </h1>
            {location.pathname ==='/' && ( 
            <Button color= {showAdd ? 'red' : 'green'}
            text = {showAdd ? 'Close' : 'Add'} 
            onClick = {onAdd} 
            />
            )}
            {/* <Button color='blue' text='Hello 1' />
            <Button color='red' text='Hello 3' /> */}
        </header>
    )
}

//we can pass directly here by defaut

Header.defaultProps = {
    title: 'Task Tracker',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}


// CSS in JS
// const headingStyle = {
//     color:'red',
//     backgroundColor:'black'
// }

export default Header
