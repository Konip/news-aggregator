import React from 'react'
import close from '../assets/close.svg'

export default function CloseIcon() {
    return (
        <div style={{
            width: '20px', height: '20px', position: 'absolute',
            top: '20px', right: '20px'
        }}>
            <img style={{ color: '#bababa' }} src={close} alt="close"/>
        </div>
    )
}
