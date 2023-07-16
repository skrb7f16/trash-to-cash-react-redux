import React from 'react'

export default function ProductFirstImage(props) {
    return (
        <div style={ProductPictureStyle.main}>
            <div className='card' style={{ width: '18rem' }}>
                <img src={props.pics[0]} className='card-top-img' alt='...' />
            </div>
            <div className='card text-center' style={ProductPictureStyle.viewMore}>
                <h2>View More</h2>
            </div>
        </div>
    )
}
const ProductPictureStyle = {
    main: {
        display: 'flex',
        width:"50%" ,
        justifyContent:'center',
        padding:'2vh'
    },
    viewMore: { width: '18rem', background: 'grey', justifyContent: 'center', cursor: 'pointer' }

}