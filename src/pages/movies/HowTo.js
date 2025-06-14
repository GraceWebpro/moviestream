import React from 'react'
import { TbLetterI, TbLetterISmall } from 'react-icons/tb';
import Search from '../../components/search/Search'
import Image from '../../assets/Dramakey-ad.jpeg';
import { Helmet } from 'react-helmet';

const HowTo = () => {
    return (
        <>
            <Helmet>
                <title>How to Download Movies and Music - Step-by-Step Guide | PlayBox</title>
                <meta
                name="description"
                content="Learn how to download movies and music easily from PlayBox. Follow this simple step-by-step guide to get started with your favorite movies and music today."
                />
                <meta
                name="keywords"
                content="how to download movies, PlayBox guide, movie download help, step by step movie download"
                />
            </Helmet>

                    <div className='hero' style={{ padding: '0 15px' }}>

            <div className='hero-sec'>
                <div className="another-image">
                <img src={Image} alt="ano" className="image" />
                <p style={{ color: "black", opacity: '0%'}}>...</p>
                </div>
            </div>

            <div style={{ color: '#000', marginTop: '30px' }}>
                <h4>Step One</h4>
                <p>Visit PlayBox.COM (Since you are here I guess you made it through step one )</p>
            </div>

            <div style={{ color: '#000', marginTop: '30px' }}>
                <h4>Step Two</h4>
                <p>Click on the movie/music you want to download and close the pop ad when it appears (sorry about that btw)</p>
            </div>

            <div style={{ color: '#000', marginTop: '30px' }}>
                <h4>Step Three</h4>
                <p>Click on the green button that says "Download Episode" or "Download Muic". The button should look like this one bellow</p>
                <button className='card-btn' style={{ marginTop: '20px'}}>Download Episode</button>
            </div>

            <div style={{ color: '#000', marginTop: '30px' }}>
                <h4>Step Four</h4>
                <p style={{ marginBottom: '40px' }}>When you click on the Download button like the one shown above you will be redirected to another page where the file is located. All you have to do is click the button that says "Create download link" and your download will automatically start after a few seconds.</p>
            </div>
            
            <Search />

           <div className="disclaimer-section">
                <p style={{ display: 'flex', color: 'var(--first-color)', fontWeight: 'bold' }}><TbLetterI style={{ color: 'var(--first-color)'}}/> Disclaimer</p>
                <p style={{ color: '#000', fontSize: '15px', marginLeft: '10px' }}>PlayBox.com does not claim ownership of any movie on this site. If your copyrighted material has been uploaded or links to your copyrighted material has been uploaded, kindly click here to file a take down notice.</p>
            </div>
            
            <div style={{ marginTop: '60px', height: '100px', backgroundColor: 'black', opacity: '80%' }}>

            </div>
        </div>
        </>
    )
};

export default HowTo;
