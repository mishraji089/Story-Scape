import signupImg from "../asset/signup.webp"
import Template from "../components/Template"

function Signup() {
  return (
    <Template
      title="Conversation is king. Content is just something to talk about."
      description1="Blogging is good for your career. A well-executed blog sets you apart as an expert in your field"
      description2="~Penelope Trunk"
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup