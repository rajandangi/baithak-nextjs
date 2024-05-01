import React from 'react'

const Footer = () => {
    return (
        <footer className='w-full text-center px-4 py-5 text-xs text-neutral-400 font-semibold'>
            &copy;<span id="get-current-year">{new Date().getFullYear()}</span>
            <a href="https://sathisoft.com" className="hover:text-blue-1" target="_blank" rel="noreferrer"> SathiSoft Pvt.Ltd.</a>
        </footer>
    )
}

export default Footer