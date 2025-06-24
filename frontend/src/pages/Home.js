import React, { useState, useEffect } from "react";

const slides = [
  {
    title: "We're excited to be at Hashtag#Q2Connect25.",
    description:
      " Come visit us at Booth #607 to say hi and learn more about how our Automated Banking solution can streamline your operations and boost customer satisfaction.",
    image:
      "https://media.licdn.com/dms/image/v2/D5622AQFNV7kPOU1FhQ/feedshare-shrink_800/feedshare-shrink_800/0/1688791495320?e=2147483647&v=beta&t=pjES_Rygvv1XmDYqolT7EoD0pmlNl6rwZ1OfxMgdT1Q",
  logo:"https://nuevesolutions.com/wp-content/uploads/2019/09/nuevesolutions_logo.png",
  },
  {
    title: "Self-Service CDs Now on Q2 Marketplace.",
    description:
      "We're thrilled to announce our integration with Apple Bank, introducing our Self-Service CDs app now available on the Q2 Marketplace. It's a new chapter in convenience-driven banking, and we're just getting started.",
    image:
      "https://www.mastercard.com/news/media/e5ga2253/fintech_banner.png?v=1db2d05170547b0",
      logo:"https://nuevesolutions.com/wp-content/uploads/2019/09/nuevesolutions_logo.png",
  },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f5f8fa" }}>
    
      
      <section
  id="home"
  style={{
    position: "relative",
    height: "90vh",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    textAlign: "left",
    overflow: "hidden",
  }}
>
 
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: `url('${slides[currentSlide].image}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: "blur(2px)",
      zIndex: 0,
      transform: "scale(1.05)", 
    }}
  />

  
  <div
    style={{
      position: "relative",
      zIndex: 1,
      maxWidth: "900px",
      backgroundColor: "rgba(13, 23, 63, 0.8)",
      padding: "40px",
      borderRadius: "10px",
    }}
  >
    {slides[currentSlide].logo && (
      <img
        src={slides[currentSlide].logo}
        alt="logo"
        style={{ maxWidth: "180px", marginBottom: "20px" }}
      />
    )}
    <h1 style={{ fontSize: "38px", fontWeight: "bold", marginBottom: "20px" }}>
      {slides[currentSlide].title}
    </h1>
    <p style={{ fontSize: "18px", lineHeight: "1.6" }}>{slides[currentSlide].description}</p>
  </div>

  
  <div
    style={{
      position: "absolute",
      bottom: "30px",
      display: "flex",
      gap: "10px",
      zIndex: 1,
    }}
  >
    {slides.map((_, index) => (
      <span
        key={index}
        onClick={() => goToSlide(index)}
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          backgroundColor: currentSlide === index ? "#fff" : "#999",
          cursor: "pointer",
        }}
      />
    ))}
  </div>
</section>


      
      <section id="about" style={{ padding: "60px 40px", backgroundColor: "#fff", color: "#333" }}>
  <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "30px" }}>About Us</h2>
  <p style={{ fontSize: "18px", lineHeight: "1.7", marginBottom: "30px" }}>
    <strong>Nueve Solutions</strong> isn't just building technology — we're architecting the digital backbone of tomorrow's financial landscape. With a sharp focus on agility, security, and user-centric design, we help leading institutions reimagine their operations in an age where innovation moves at the speed of trust.
  </p>

  <h3 style={{ fontSize: "24px", color: "#0d47a1", marginBottom: "10px" }}>Banking IT Solutions</h3>
  <p style={{ fontSize: "17px", lineHeight: "1.6", marginBottom: "25px" }}>
    We bring together skilled minds, smart frameworks, and scalable strategies to deliver cost-effective banking solutions. Whether it's modernizing core systems or integrating next-gen tools, we’re here to accelerate transformation — securely and seamlessly.
  </p>

  <h3 style={{ fontSize: "24px", color: "#0d47a1", marginBottom: "10px" }}>Q2 Platform Integration</h3>
  <p style={{ fontSize: "17px", lineHeight: "1.6" }}>
    As a trusted Q2 integration partner, we craft digital experiences that don’t just perform — they delight. From onboarding to omnichannel banking, our work ensures every click counts and every interaction drives business growth.
  </p>
</section>

      
      <section id="careers" style={{ padding: "60px 40px", backgroundColor: "#f1f1f1" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px" }}>Careers</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#1565c0", color: "white" }}>
              <th style={thStyle}>Job Type</th>
              <th style={thStyle}>Experience</th>
              <th style={thStyle}>Location</th>
            </tr>
          </thead>
          <tbody>
            {[
              { type: "React Developer", experience: "2+ Years", location: "Visakhapatnam" },
              { type: "Python Developer", experience: "3+ Years", location: "Austin" },
            ].map((job) => (
              <tr key={job.type}>
                <td style={tdStyle}>{job.type}</td>
                <td style={tdStyle}>{job.experience}</td>
                <td style={tdStyle}>{job.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

     
      <section
  id="contact"
  style={{
    padding: "60px 40px",
    backgroundImage:"url(https://www.shutterstock.com/image-vector/contact-us-customer-support-hotline-600nw-2402878041.jpg)",
    backgroundSize:"cover",
    textAlign: "center",
    color:"white",
  }}
>
  <h2
    style={{
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "30px",
    }}
  >
    Contact Us
  </h2>

  <div
    style={{
      display: "flex",
      justifyContent:"center",
      alignItems:"center",
      flexWrap: "wrap",
      fontSize: "18px",
      lineHeight: "1.6",
      maxWidth: "900px",
      margin: "0 auto",
      color:"white",
      
    }}
  >
    <div style={{ flex: "1", minWidth: "250px"}}>
      <strong>Nueve Solutions</strong>
      <br />
      13706 Research Blvd,
      <br />
      Suite 304, Austin, TX 78750
    </div>

    <div style={{ flex: "1", minWidth: "250px", textAlign: "center"}}>
      <strong>We Develop Secure</strong>
      <br />
      <strong>Banking Applications</strong>
      <br />
      Ph. 512-630-0635
    </div>
  </div>
</section>
    
      <footer
        style={{
          backgroundColor: "#0d1b3d",
          color: "white",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <p>&copy; 2025 NUEVE Solutions | All rights reserved.</p>
      </footer>
    </div>
  );
};


const thStyle = { padding: "12px", textAlign: "left" };
const tdStyle = { padding: "12px", backgroundColor: "#fff", borderBottom: "1px solid #ccc" };


export default Home;
