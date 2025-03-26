import React from 'react'


const AboutUs = () => {

    const containerStyle = {
        overflow: 'hidden',
    };

    return (
        <div className="container mx-auto p-8 font-Madimi">
            <div className="text-center">
                <h1 className="text-3xl font-semibold mb-4">About Me</h1>
            </div>
            <div className="text-lg leading-relaxed p-4">
                <div className='flex flex-col gap-2'>
                    <p>
                        Hello! 👋 I'm <span className="text-blue-500  font-bold text-3xl">Vibhav Sachan</span>,  a final year student deeply passionate about web development. My journey is about merging the dynamic MERN stack with a solid foundation in data structures and algorithms.
                    </p>

                    <p className='mt-2'>
                        Currently, I'm immersed in real-world projects using the MERN (MongoDB, Express.js, React, Node.js) stack. My focus is on crafting responsive, user-friendly web applications that transform ideas into impactful solutions.
                    </p>

                    <p>
                        Alongside, I'm dedicated to honing my problem-solving skills through continuous learning and practice in data structures and algorithms. I strongly believe that mastering these fundamentals is key to building robust and efficient software.
                    </p>
                </div>

                <h2 className="text-2xl font-semibold mt-8">Education 🎓</h2>
                <p>
                    - <span className="text-blue-500 font-bold">Bachelor of Engineering</span> in <span className="text-blue-500 font-bold">Computer Science</span> from <span className="text-blue-500 font-bold">Chandigarh Univeristy</span>
                </p>

                {/* Add sections for Skills, Projects, Work Experience, Learning Journey, Coding Philosophy, Interests, and Contact Information */}

                <h2 className="text-2xl font-semibold mt-8">Contact Information 📧</h2>
                <p>
                    Feel free to connect with me on:
                    <br />
                    <a href="https://www.linkedin.com/in/vibhav-sachan-9b8867214/" target="_blank" className="text-blue-500 font-bold">- LinkedIn: </a>
                    <br />
                    <a href="https://github.com/VibhavSachan46" target="_blank" className="text-blue-500 font-bold">- GitHub:</a>
                    <br />
                    <a href="https://twitter.com/sachan_vibhav" target="_blank" className="text-blue-500 font-bold">- Twitter:</a>
                    <br />
                    <a href="https://www.instagram.com/vibhav__sachan/" target="_blank" className="text-blue-500 font-bold">- Instagram:</a>
                    <br />
                    - Email: <span className="text-blue-500 font-bold">vibhavsachan743@gmail.com</span>
                    <br />
                    - Contact Number: <span className="text-blue-500 font-bold">+91 83608 69311</span>
                </p>
            </div>

            <div name="contact" className="w-full h-full p-4 text-black" style={containerStyle}>
                <div className="flex flex-col p-4 mx-auto h-full">
                    <div className="flex pb-8 justify-center text-3xl">
                        <p>Submit the form below to get in touch with me</p>
                    </div>

                    <div className=" flex justify-center items-center">
                        <form
                            action="https://getform.io/f/bcbb9138-9afc-4306-a8eb-3e0741f38f3f"
                            method="POST"
                            className=" flex flex-col w-full md:w-1/2"
                        >
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                className="p-4 bg-transparent border-2 border-richblack-200 rounded-md text-black focus:outline-none tracking-widest"
                            />
                            <input
                                type="text"
                                name="email"
                                placeholder="Enter your email"
                                className="my-4 p-4 bg-transparent border-2 border-richblack-200 rounded-md text-black focus:outline-none tracking-widest"
                            />
                            <textarea
                                name="message"
                                placeholder="Enter your message ...."
                                rows="10"
                                className="p-4 bg-transparent border-2 border-richblack-200 rounded-md text-black focus:outline-none tracking-widest	"
                            ></textarea>

                            <button className="text-white bg-gradient-to-b from-richblue-200 to-richblue-500 px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300">
                                Submit Response
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs