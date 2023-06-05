import React from 'react';
import Footer from "../../components/content/footer"
import Navbar from "../../components/Navs/navbar"

function ContactPage() {
  return (
    <div>
      <Navbar />
      <div className='contenidoGeneral'>
      <div className="main">
        <div className="shop_top">
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <div className="map">
                  {/* Mapa de Google */}
                </div>
              </div>
              <div className="col-md-5">
                <p className="m_8">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                  Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                  Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat
                </p>
                <div className="address">
                  <p>500 Lorem Ipsum Dolor Sit,</p>
                  <p>22-56-2-9 Sit Amet, Lorem,</p>
                  <p>USA</p>
                  <p>Phone:(00) 222 666 444</p>
                  <p>Fax: (000) 000 00 00 0</p>
                  <p>Email: <span>support[at]snow.com</span></p>
                  <p>Follow on: <span>Facebook</span>, <span>Twitter</span></p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 contact">
                <form method="post" action="contact-post.html">
                  <div className="to">
                    <input type="text" className="text" defaultValue="Name" onFocus={(e) => e.target.value = ''} onBlur={(e) => { if (!e.target.value) e.target.value = 'Name' }} />
                    <input type="text" className="text" defaultValue="Email" onFocus={(e) => e.target.value = ''} onBlur={(e) => { if (!e.target.value) e.target.value = 'Email' }} />
                    <input type="text" className="text" defaultValue="Subject" onFocus={(e) => e.target.value = ''} onBlur={(e) => { if (!e.target.value) e.target.value = 'Subject' }} />
                  </div>
                  <div className="text">
                    <textarea placeholder="Message:" onFocus={(e) => e.target.value = ''} onBlur={(e) => { if (!e.target.value) e.target.value = 'Message' }}>Message:</textarea>
                    <div className="form-submit">
                      <input name="submit" type="submit" id="submitContact" value="Submit" /><br />
                    </div>
                  </div>
                  <div className="clear"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactPage;