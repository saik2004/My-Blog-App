
import Footer from "./common/Footer";

function ContactForm() {
  const WEB3_FORM_ACCESSKEY = process.env.REACT_APP_WEB3FORMS_ACCESS_KEY;

  const inputClass =
    "mt-2 w-full min-w-0 border-2 border-black bg-white px-3 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:bg-[#F9FCEB] focus:ring-2 focus:ring-[#D9F36A] sm:px-4 sm:py-3.5 sm:text-base";

  return (
    <>
    <main className="min-h-screen w-full overflow-x-hidden bg-white px-4 py-10 text-[#111111] sm:px-6 sm:py-14 lg:px-8 lg:py-20">
      <section className="mx-auto w-full max-w-3xl">
        {/* Heading */}
        <div className="mb-8 sm:mb-10">
          <p className="mb-4 inline-flex items-center gap-2 border-2 border-black bg-[#D9F36A] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] sm:text-xs">
            <span className="h-2 w-2 rounded-full bg-black" />
            Contact / Collaboration
          </p>

          <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Let's talk
            <br />
            <span className="text-[#8BAA24]">about your idea.</span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
            Have a job opportunity, freelance project, or collaboration in mind?
            Share a few details below.
          </p>
        </div>

        {/* Contact Form */}
        <div className="border-2 border-black bg-[#F5F5F0] p-4 shadow-[4px_4px_0px_#111111] sm:p-7 sm:shadow-[7px_7px_0px_#111111] md:p-8">
          <form
            action="https://api.web3forms.com/submit"
            method="POST"
            className="flex flex-col gap-5"
          >
            {/* Web3Forms Access Key */}
            <input
              type="hidden"
              name="access_key"
              value={WEB3_FORM_ACCESSKEY || ""}
            />

            {/* Email Subject */}
            <input
              type="hidden"
              name="subject"
              value="New Portfolio Contact Form Submission"
            />

            {/* Sender Name */}
            <input type="hidden" name="from_name" value="Sai Kumar Portfolio" />

            {/* Redirect After Submission */}
            <input
              type="hidden"
              name="redirect"
              value="https://web3forms.com/success"
            />

            {/* Honeypot Spam Protection */}
            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              tabIndex="-1"
              autoComplete="off"
            />

            {/* Name */}
            <div>
              <label htmlFor="contact-name" className="text-sm font-black">
                Your name
              </label>

              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="What should I call you?"
                className={inputClass}
                maxLength={100}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="contact-email" className="text-sm font-black">
                Email address
              </label>

              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className={inputClass}
                maxLength={254}
                required
              />
            </div>

            {/* Inquiry Type */}
            <div>
              <label htmlFor="contact-subject" className="text-sm font-black">
                What is this about?
              </label>

              <select
                id="contact-subject"
                name="Inquiry Type"
                className={`${inputClass} cursor-pointer`}
                required
                defaultValue="Job Opportunity"
              >
                <option value="Job Opportunity">Job Opportunity</option>

                <option value="Freelance Project">Freelance Project</option>

                <option value="Collaboration">Collaboration</option>

                <option value="General Inquiry">General Inquiry</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="contact-message" className="text-sm font-black">
                Your message
              </label>

              <textarea
                id="contact-message"
                name="message"
                placeholder="Tell me a little about the opportunity..."
                className={`${inputClass} min-h-36 resize-y leading-7`}
                rows={5}
                maxLength={5000}
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="inline-flex min-h-12 w-full items-center justify-center gap-3 border-2 border-black bg-[#D9F36A] px-5 py-3 text-sm font-black uppercase tracking-wide shadow-[3px_3px_0px_#111111] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#111111] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none sm:w-fit sm:px-7"
            >
              Send Message
              <span aria-hidden="true">↗</span>
            </button>

            <p className="text-xs leading-5 text-gray-500">
              Your details should only be used to respond to your inquiry. Avoid
              including passwords, OTPs, or sensitive personal information.
            </p>
          </form>
        </div>
      </section>
    </main>
    <Footer/>
    </>
  );
}

export default ContactForm;
