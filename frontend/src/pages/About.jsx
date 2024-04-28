import React from 'react'

export const About = () => {
  return (
    <div className="flex justify-center min-h-screen items-start relative pt-10">
      <div className=" ml-5 mr-5 text-white ">
        <h1 className=' text-xl'>ABOUT US</h1>
        <hr className="my-2 border-t-2 border-b-1 border-white w-full" />
        <p className=' font-thin'>
          Welcome to ConGraduation, the premier destination for photographers, graduates,
          and administrators seeking to seamlessly connect, showcase, and monetize their
          photography talents. At ConGraduation, we believe in the power of images to inspire,
          connect, and capture moments that last a lifetime. Our platform is dedicated to empowering
          photographers and graduates, while providing administrators with the tools they need to
          manage and facilitate this vibrant community.
        </p>
        <h2 className=' mt-5 '>OUR VISON</h2>
        <p className=' font-thin'>
          At ConGraduation, we envision a world where photography becomes more than just a hobby
          or a profession—it becomes a means of expression, a bridge between people, and a source
          of inspiration. We aim to make the process of uploading, managing, and sharing
          photographs as effortless and rewarding as possible for all our users.
        </p>
        <h2 className='mt-5 uppercase'>Delivery & RETURN POLICY</h2>
        <p className='font-thin'>
          We offer a 30-day return policy on all purchases made through our platform. If you
          are unsatisfied with your purchase for any reason, please contact us at 
          <span className='font-bold'> support@congraduation.com</span> within 30 days of
          receiving your order. To be eligible for a return, your item must be unused and in
          the same condition that you received it. It must also be in the original packaging.
        </p>
        
        <h2 className=' mt-5 uppercase'>What We Offer</h2>
        <ul className='list-disc list-inside font-thin ml-3'>
          <li className='mb-2'>User-Focused Portals: We provide customized portals for three distinct user groups: Photographers, Graduates, and Administrators. Each portal is tailored to meet the unique needs and expectations of its users, ensuring a personalized experience.</li>
          <li className='mb-2'>Seamless Image Management: ConGraduation offers robust tools for uploading, organizing, and showcasing your photography. Photographers can effortlessly upload and manage their work, graduates can easily find and interact with their photos, and administrators can efficiently oversee user profiles and products.</li>
          <li className='mb-2'>User Interaction and Engagement: Our platform fosters meaningful interactions and engagement among our users. Whether it's photographers receiving feedback from their audience, graduates connecting with their special moments, or administrators facilitating a thriving community, ConGraduation is all about engagement.</li>
          <li className='mb-2'>Secure and Ethical: We take the privacy and security of your data seriously. ConGraduation is committed to upholding the highest ethical standards, ensuring the safety and well-being of all users.</li>
        </ul>


        <h2 className='mt-5 uppercase'>Our Team</h2>
        <p className='font-thin'>
          ConGraduation is brought to you by a passionate and dedicated team of individuals who share a love for photography and a commitment to delivering a top-notch user experience. Our team is comprised of web developers, designers, photographers, and administrators, all working together to make ConGraduation a reality.
        </p>

        <h2 className='mt-5 uppercase'>Join Our Community</h2>
        <p className='font-thin'>
          We invite you to join our vibrant ConGraduation community of photographers, graduates, and administrators. Whether you're a seasoned photographer looking for a platform to showcase your work, a graduate seeking to relive and cherish your special moments, or an administrator interested in managing this dynamic ecosystem, ConGraduation is the place to be.
        </p>
      </div>

    </div>
  )
}
export default About

